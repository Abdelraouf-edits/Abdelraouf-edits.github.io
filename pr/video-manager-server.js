import express from 'express';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve the video manager HTML - Defined BEFORE static to ensure it takes precedence over index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'video-manager.html'));
});

app.use(express.static(__dirname));

// Add video endpoint
app.post('/add-video', async (req, res) => {
  try {
    const { category, title, videoUrl, videoCategory, embedId, thumbnail } = req.body;

    console.log('📹 Received request to add video:', title);

    // Validate input
    if (!title || !videoUrl || !embedId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    if (category === 'longform' && !videoCategory) {
      return res.status(400).json({ 
        success: false, 
        error: 'Project type required for long-form content' 
      });
    }

    // Read Work.tsx
    const workFilePath = path.join(__dirname, 'src', 'components', 'Work.tsx');
    let workContent = fs.readFileSync(workFilePath, 'utf8');

    // Generate the new video object matching the current Work.tsx format
    let newVideoObject;
    const arrayName = category === 'longform' ? 'projects' : 'reels';
    
    if (category === 'longform') {
      // Long-form project format (Featured Projects - grid layout)
      newVideoObject = `  {
    title: "${title}",
    category: "${videoCategory}",
    videoUrl: "${videoUrl}",
    embedId: "${embedId}",
    thumbnail: \`${thumbnail}\`,
    platform: "streamable",
  },`;
    } else {
      // Short-form reel format (Featured Reels - carousel layout)
      // Uses the updated smaller card format: w-[260px] md:w-[320px]
      newVideoObject = `  {
    title: "${title}",
    videoUrl: "${videoUrl}",
    embedId: "${embedId}",
    platform: "streamable",
    thumbnail: \`${thumbnail}\`,
  },`;
    }

    // Find the array and add the new video
    const arrayPattern = new RegExp(
      `const ${arrayName} = \\[([\\s\\S]*?)\\];`,
      'g'
    );

    const match = arrayPattern.exec(workContent);
    if (!match) {
      return res.status(500).json({ 
        success: false, 
        error: `Could not find ${arrayName} array in Work.tsx` 
      });
    }

    // Insert the new video at the beginning of the array (after the opening bracket)
    const arrayContent = match[1];
    const updatedArrayContent = '\n' + newVideoObject + arrayContent;
    const updatedArray = `const ${arrayName} = [${updatedArrayContent}];`;

    // Replace the old array with the updated one
    workContent = workContent.replace(match[0], updatedArray);

    // Write the updated content back to Work.tsx
    fs.writeFileSync(workFilePath, workContent, 'utf8');
    
    const categoryLabel = category === 'longform' ? 'Featured Projects' : 'Featured Reels (Carousel)';
    console.log(`✅ Updated Work.tsx successfully (Video added to ${categoryLabel})`);

    // Git operations
    try {
      console.log('🔄 Committing changes...');
      execSync('git add src/components/Work.tsx', { cwd: __dirname, stdio: 'inherit' });
      
      const commitMessage = `Add ${category === 'longform' ? 'project' : 'reel'}: ${title}`;
      execSync(`git commit -m "${commitMessage}"`, { cwd: __dirname, stdio: 'inherit' });
      
      console.log('📤 Pushing to GitHub...');
      execSync('git push', { cwd: __dirname, stdio: 'inherit' });
      
      console.log('🎉 Successfully pushed to GitHub!');
    } catch (gitError) {
      console.error('Git error:', gitError.message);
      return res.status(500).json({ 
        success: false, 
        error: 'File updated but git push failed. You may need to push manually.',
        fileUpdated: true 
      });
    }

    res.json({ 
      success: true, 
      message: `Video "${title}" added successfully to ${categoryLabel} and pushed to GitHub!`,
      category: arrayName
    });

  } catch (error) {
    console.error('Error adding video:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get all videos endpoint
app.get('/videos', (req, res) => {
  try {
    const workFilePath = path.join(__dirname, 'src', 'components', 'Work.tsx');
    const workContent = fs.readFileSync(workFilePath, 'utf8');

    // Extract projects
    const projectsMatch = /const projects = \[([\s\S]*?)\];/.exec(workContent);
    const reelsMatch = /const reels = \[([\s\S]*?)\];/.exec(workContent);

    res.json({
      success: true,
      projects: projectsMatch ? projectsMatch[1] : '',
      reels: reelsMatch ? reelsMatch[1] : ''
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete video endpoint
app.post('/delete-video', async (req, res) => {
  try {
    const { category, embedId } = req.body;
    console.log('🗑️ Received request to delete video:', embedId);

    const workFilePath = path.join(__dirname, 'src', 'components', 'Work.tsx');
    let workContent = fs.readFileSync(workFilePath, 'utf8');

    const arrayName = category === 'longform' ? 'projects' : 'reels';
    const arrayPattern = new RegExp(`const ${arrayName} = \\[([\\s\\S]*?)\\];`, 'g');
    
    const match = arrayPattern.exec(workContent);
    if (!match) {
      return res.status(500).json({ success: false, error: 'Array not found' });
    }

    const arrayContent = match[1];
    
    // Parse the array content to find and remove the video
    // We'll split by objects roughly
    let newArrayContent = '';
    let currentObject = '';
    let braceCount = 0;
    let found = false;

    for (let i = 0; i < arrayContent.length; i++) {
      const char = arrayContent[i];
      currentObject += char;

      if (char === '{') braceCount++;
      if (char === '}') braceCount--;

      if (braceCount === 0 && currentObject.trim().length > 0 && currentObject.includes('}')) {
        // We have a complete object
        if (currentObject.includes(embedId)) {
          found = true;
          // Skip this object (don't add to newArrayContent)
        } else {
          newArrayContent += currentObject;
        }
        currentObject = '';
      }
    }
    
    // Add any remaining content (whitespace/commas)
    newArrayContent += currentObject;

    if (!found) {
      return res.status(404).json({ success: false, error: 'Video not found' });
    }

    const updatedArray = `const ${arrayName} = [${newArrayContent}];`;
    workContent = workContent.replace(match[0], updatedArray);

    fs.writeFileSync(workFilePath, workContent, 'utf8');
    console.log('✅ Video removed from Work.tsx');

    // Git operations
    try {
      execSync('git add src/components/Work.tsx', { cwd: __dirname, stdio: 'inherit' });
      execSync(`git commit -m "Remove ${category} video: ${embedId}"`, { cwd: __dirname, stdio: 'inherit' });
      execSync('git push', { cwd: __dirname, stdio: 'inherit' });
      console.log('🎉 Changes pushed to GitHub');
    } catch (gitError) {
      console.error('Git error:', gitError);
    }

    res.json({ success: true });

  } catch (error) {
    console.error('Error deleting video:', error);
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
