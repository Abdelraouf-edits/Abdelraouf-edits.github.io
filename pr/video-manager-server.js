const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Serve the video manager HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'video-manager.html'));
});

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

    // Generate the new video object
    let newVideoObject;
    const arrayName = category === 'longform' ? 'projects' : 'reels';
    
    if (category === 'longform') {
      newVideoObject = `  {
    title: "${title}",
    category: "${videoCategory}",
    videoUrl: "${videoUrl}",
    embedId: "${embedId}",
    thumbnail: \`${thumbnail}\`,
    platform: "streamable",
  },`;
    } else {
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
    console.log('✅ Updated Work.tsx successfully');

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
      message: `Video "${title}" added successfully and pushed to GitHub!`,
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
