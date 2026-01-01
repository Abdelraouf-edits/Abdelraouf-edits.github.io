import express from 'express';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

const WORK_FILE_PATH = path.join(__dirname, 'src', 'components', 'Work.tsx');
const WORK_RELATIVE_PATH = path.relative(__dirname, WORK_FILE_PATH).replace(/\\/g, '/');

const escapeDoubleQuotes = (value = '') =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, '\\n');

const escapeTemplateValue = (value = '') =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\r?\n/g, '\\n');

const formatGitError = (error) => {
  if (!error) {
    return 'Unknown git error';
  }

  if (error.stderr) {
    const stderr = error.stderr.toString().trim();
    if (stderr) return stderr;
  }

  if (error.stdout) {
    const stdout = error.stdout.toString().trim();
    if (stdout) return stdout;
  }

  return error.message || 'Unknown git error';
};

const runGitCommand = (args) => {
  try {
    return execFileSync('git', args, {
      cwd: __dirname,
      stdio: ['ignore', 'pipe', 'pipe'],
      encoding: 'utf8',
    });
  } catch (error) {
    // Attach stdout/stderr to error for formatGitError
    if (error.stdout) error.stdout = error.stdout.toString();
    if (error.stderr) error.stderr = error.stderr.toString();
    throw error;
  }
};

const isGitRepo = () => {
  try {
    const result = runGitCommand(['rev-parse', '--is-inside-work-tree']).trim();
    return result === 'true';
  } catch {
    return false;
  }
};

const ensureGitConfig = () => {
  try {
    const name = runGitCommand(['config', '--get', 'user.name']).trim();
    if (!name) {
      runGitCommand(['config', 'user.name', 'Portfolio Video Manager']);
    }
  } catch {
    runGitCommand(['config', 'user.name', 'Portfolio Video Manager']);
  }

  try {
    const email = runGitCommand(['config', '--get', 'user.email']).trim();
    if (!email) {
      runGitCommand(['config', 'user.email', 'video-manager@local']);
    }
  } catch {
    runGitCommand(['config', 'user.email', 'video-manager@local']);
  }
};

const stageCommitPush = (message, files = [WORK_RELATIVE_PATH]) => {
  if (!isGitRepo()) {
    return {
      success: false,
      error: 'Git repository not detected. Changes were saved locally but were not committed.',
      stage: 'repository',
    };
  }

  try {
    runGitCommand(['add', '--', ...files]);
    const stagedFiles = runGitCommand(['diff', '--cached', '--name-only']).trim();

    if (!stagedFiles) {
      runGitCommand(['reset']);
      return { success: true, skipped: true, message: 'No changes detected; skipped git commit.' };
    }

    ensureGitConfig();
    runGitCommand(['commit', '-m', message]);
  } catch (error) {
    return { success: false, error: formatGitError(error), stage: 'commit' };
  }

  try {
    runGitCommand(['push']);
  } catch (error) {
    return { success: false, error: formatGitError(error), stage: 'push', committed: true };
  }

  return { success: true };
};

const readWorkFile = () => fs.readFileSync(WORK_FILE_PATH, 'utf8');

const parseWorkArray = (workContent, arrayName) => {
  const arrayRegex = new RegExp(`const ${arrayName} = \\[([\\s\\S]*?)\\];`);
  const match = arrayRegex.exec(workContent);

  if (!match) {
    throw new Error(`Could not find ${arrayName} array in Work.tsx`);
  }

  let items;
  try {
    items = new Function(`return [${match[1]}];`)();
  } catch (error) {
    throw new Error(`Failed to parse ${arrayName} array: ${error.message}`);
  }

  return {
    items,
    fullMatch: match[0],
  };
};

const serializeItem = (arrayName, item) => {
  const cleaned = {
    title: escapeDoubleQuotes(item.title ?? ''),
    videoUrl: escapeDoubleQuotes(item.videoUrl ?? ''),
    embedId: escapeDoubleQuotes(item.embedId ?? ''),
    thumbnail: escapeTemplateValue(item.thumbnail ?? ''),
    platform: escapeDoubleQuotes(item.platform ?? 'streamable'),
    category: escapeDoubleQuotes(item.category ?? ''),
  };

  const lines = [
    '  {',
    `    title: "${cleaned.title}",`,
  ];

  if (arrayName === 'projects') {
    lines.push(`    category: "${cleaned.category}",`);
  }

  lines.push(
    `    videoUrl: "${cleaned.videoUrl}",`,
    `    embedId: "${cleaned.embedId}",`,
    `    thumbnail: \`${cleaned.thumbnail}\`,`,
    `    platform: "${cleaned.platform}",`,
    '  },'
  );

  return lines.join('\n');
};

const buildArrayString = (arrayName, items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return `const ${arrayName} = [];`;
  }

  const serialized = items.map((item) => serializeItem(arrayName, item)).join('\n\n');
  return `const ${arrayName} = [\n${serialized}\n];`;
};

const updateWorkArray = (arrayName, modifier) => {
  const workContent = readWorkFile();
  const { items, fullMatch } = parseWorkArray(workContent, arrayName);
  const itemsCopy = items.map((item) => ({ ...item }));
  const modified = modifier(itemsCopy);
  const finalItems = Array.isArray(modified) ? modified : itemsCopy;
  const updatedArray = buildArrayString(arrayName, finalItems);
  const updatedContent = workContent.replace(fullMatch, updatedArray);
  fs.writeFileSync(WORK_FILE_PATH, updatedContent, 'utf8');

  return { updatedItems: finalItems };
};

const getWorkData = () => {
  const workContent = readWorkFile();
  const { items: projects } = parseWorkArray(workContent, 'projects');
  const { items: reels } = parseWorkArray(workContent, 'reels');

  return {
    projects: projects.map((item) => ({ ...item })),
    reels: reels.map((item) => ({ ...item })),
  };
};

// Middleware
app.use(express.json());

// Serve the video manager HTML before static assets
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'video-manager.html'));
});

app.use(express.static(__dirname));

// Add video endpoint
app.post('/add-video', async (req, res) => {
  try {
    const { category, title, videoUrl, videoCategory, embedId, thumbnail } = req.body;

    if (!title || !videoUrl || !embedId || !category) {
      return res.status(400).json({ success: false, error: 'Missing required fields.' });
    }

    if (category === 'longform' && !videoCategory) {
      return res.status(400).json({ success: false, error: 'Project type required for long-form content.' });
    }

    const arrayName = category === 'longform' ? 'projects' : 'reels';

    const { updatedItems } = updateWorkArray(arrayName, (items) => {
      if (items.some((item) => item.embedId === embedId)) {
        throw new Error('A video with this embedId already exists.');
      }

      const videoEntry = {
        title,
        videoUrl,
        embedId,
        thumbnail: thumbnail || `https://cdn-cf-east.streamable.com/image/${embedId}.jpg`,
        platform: 'streamable',
      };

      if (arrayName === 'projects') {
        videoEntry.category = videoCategory;
      }

      items.push(videoEntry);
      return items;
    });

    const commitLabel = arrayName === 'projects' ? 'project' : 'reel';
    const gitResult = stageCommitPush(`Add ${commitLabel}: ${title}`);

    if (!gitResult.success) {
      return res.status(500).json({
        success: false,
        error: `${gitResult.stage === 'repository' ? 'Git repository not found.' : gitResult.error}`,
        fileUpdated: true,
        git: gitResult,
      });
    }

    res.json({
      success: true,
      message: `Video "${title}" added successfully and pushed to GitHub.`,
      category: arrayName,
      totalCount: updatedItems.length,
    });
  } catch (error) {
    console.error('Error adding video:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all videos endpoint
app.get('/videos', (req, res) => {
  try {
    const data = getWorkData();
    res.json({ success: true, ...data });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete video endpoint
app.post('/delete-video', async (req, res) => {
  try {
    const { category, embedId } = req.body;

    if (!category || !embedId) {
      return res.status(400).json({ success: false, error: 'Missing category or embedId.' });
    }

    const arrayName = category === 'longform' ? 'projects' : 'reels';

    let removedVideoTitle = embedId;

    const { updatedItems } = updateWorkArray(arrayName, (items) => {
      const index = items.findIndex((item) => item.embedId === embedId);

      if (index === -1) {
        throw new Error('Video not found.');
      }

      removedVideoTitle = items[index].title || embedId;
      items.splice(index, 1);
      return items;
    });

    const commitLabel = arrayName === 'projects' ? 'project' : 'reel';
    const gitResult = stageCommitPush(`Remove ${commitLabel}: ${embedId}`);

    if (!gitResult.success) {
      return res.status(500).json({
        success: false,
        error: `${gitResult.stage === 'repository' ? 'Git repository not found.' : gitResult.error}`,
        fileUpdated: true,
        git: gitResult,
      });
    }

    res.json({ success: true, title: removedVideoTitle, remaining: updatedItems.length });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update order endpoint
app.post('/update-order', (req, res) => {
  try {
    const { category, order } = req.body;

    if (!category || !Array.isArray(order)) {
      return res.status(400).json({ success: false, error: 'Category and order array are required.' });
    }

    const arrayName = category === 'longform' ? 'projects' : category === 'shortform' ? 'reels' : null;

    if (!arrayName) {
      return res.status(400).json({ success: false, error: 'Invalid category provided.' });
    }

    const seen = new Set();
    for (const id of order) {
      if (seen.has(id)) {
        return res.status(400).json({ success: false, error: `Duplicate embedId in order payload: ${id}` });
      }
      seen.add(id);
    }

    const { updatedItems } = updateWorkArray(arrayName, (items) => {
      const idToVideo = new Map(items.map((video) => [video.embedId, video]));

      const missing = order.filter((id) => !idToVideo.has(id));
      if (missing.length) {
        throw new Error(`Embed IDs not found: ${missing.join(', ')}`);
      }

      const orderedVideos = order.map((id) => idToVideo.get(id));
      const leftovers = items.filter((video) => !seen.has(video.embedId));

      return [...orderedVideos, ...leftovers];
    });

    const sectionLabel = arrayName === 'projects' ? 'projects' : 'reels';
    const gitResult = stageCommitPush(`Reorder ${sectionLabel}`);

    if (!gitResult.success) {
      return res.status(500).json({
        success: false,
        error: `${gitResult.stage === 'repository' ? 'Git repository not found.' : gitResult.error}`,
        fileUpdated: true,
        git: gitResult,
      });
    }

    res.json({ success: true, totalCount: updatedItems.length });
  } catch (error) {
    console.error('Error updating video order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Video Manager Server is running!' });
});

app.listen(PORT, () => {
  console.log('\n🎬 ========================================');
  console.log('   Portfolio Video Manager Server');
  console.log('========================================== 🎬\n');
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📹 Open your browser and go to: http://localhost:${PORT}`);
  console.log('\n💡 Tips:');
  console.log('   - Add videos through the web interface');
  console.log('   - Changes are automatically pushed to GitHub');
  console.log('   - Press Ctrl+C to stop the server\n');
});
