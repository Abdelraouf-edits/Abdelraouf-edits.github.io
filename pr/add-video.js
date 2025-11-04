#!/usr/bin/env node

/**
 * Interactive CLI tool to add videos to the portfolio
 * Usage: node add-video.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for better UI
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m'
};

function print(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function question(query) {
  return new Promise(resolve => rl.question(colors.cyan + query + colors.reset, resolve));
}

async function main() {
  print('\n╔══════════════════════════════════════════════════════════╗', 'bright');
  print('║         📹  Video Portfolio Manager  📹                  ║', 'bright');
  print('╚══════════════════════════════════════════════════════════╝\n', 'bright');

  // Step 1: Choose category
  print('Choose video category:', 'yellow');
  print('1. Long-form Content (Featured Projects)', 'blue');
  print('2. Short-form Content (Featured Reels)\n', 'blue');
  
  const categoryChoice = await question('Enter your choice (1 or 2): ');
  
  if (categoryChoice !== '1' && categoryChoice !== '2') {
    print('❌ Invalid choice. Please run the script again and choose 1 or 2.', 'red');
    rl.close();
    return;
  }

  const isLongForm = categoryChoice === '1';
  const categoryName = isLongForm ? 'Featured Projects (Long-form)' : 'Featured Reels (Short-form)';
  
  print(`\n✓ Selected: ${categoryName}\n`, 'green');

  // Step 2: Get video details
  print('Enter video details:', 'yellow');
  
  const title = await question('Video Title: ');
  const videoUrl = await question('Streamable URL (e.g., https://streamable.com/abc123): ');
  
  // Extract video ID from URL
  const videoIdMatch = videoUrl.match(/streamable\.com\/([a-zA-Z0-9]+)/);
  if (!videoIdMatch) {
    print('❌ Invalid Streamable URL. Please use format: https://streamable.com/xxxxx', 'red');
    rl.close();
    return;
  }
  
  const embedId = videoIdMatch[1];
  const thumbnail = `https://cdn-cf-east.streamable.com/image/${embedId}.jpg`;

  let category = '';
  if (isLongForm) {
    category = await question('Category (e.g., Spec Work, Motion Graphics, Style Recreation, Cinematic Edit): ');
  }

  // Step 3: Confirm details
  print('\n' + '─'.repeat(60), 'cyan');
  print('📋 Video Details:', 'yellow');
  print('─'.repeat(60), 'cyan');
  print(`Category: ${categoryName}`, 'blue');
  print(`Title: ${title}`, 'blue');
  if (isLongForm) {
    print(`Type: ${category}`, 'blue');
  }
  print(`Video ID: ${embedId}`, 'blue');
  print(`URL: ${videoUrl}`, 'blue');
  print(`Thumbnail: ${thumbnail}`, 'blue');
  print('─'.repeat(60) + '\n', 'cyan');

  const confirm = await question('Is this correct? (y/n): ');
  
  if (confirm.toLowerCase() !== 'y') {
    print('❌ Cancelled. Please run the script again.', 'red');
    rl.close();
    return;
  }

  // Step 4: Update Work.tsx
  try {
    const workFilePath = path.join(__dirname, 'src', 'components', 'Work.tsx');
    let workContent = fs.readFileSync(workFilePath, 'utf8');

    const newVideo = isLongForm 
      ? `  {
    title: "${title}",
    category: "${category}",
    videoUrl: "${videoUrl}",
    embedId: "${embedId}",
    thumbnail: \`${thumbnail}\`,
    platform: "streamable",
  },`
      : `  {
    title: "${title}",
    videoUrl: "${videoUrl}",
    embedId: "${embedId}",
    platform: "streamable",
    thumbnail: \`${thumbnail}\`,
  },`;

    if (isLongForm) {
      // Add to projects array
      const projectsMatch = workContent.match(/(const projects = \[)([\s\S]*?)(\];)/);
      if (projectsMatch) {
        const updatedProjects = projectsMatch[1] + projectsMatch[2] + '\n' + newVideo + projectsMatch[3];
        workContent = workContent.replace(/(const projects = \[[\s\S]*?\];)/, updatedProjects);
      }
    } else {
      // Add to reels array
      const reelsMatch = workContent.match(/(const reels = \[)([\s\S]*?)(\];)/);
      if (reelsMatch) {
        const updatedReels = reelsMatch[1] + reelsMatch[2] + '\n' + newVideo + reelsMatch[3];
        workContent = workContent.replace(/(const reels = \[[\s\S]*?\];)/, updatedReels);
      }
    }

    fs.writeFileSync(workFilePath, workContent, 'utf8');
    
    print('\n✅ Video added successfully to Work.tsx!', 'green');
    print('\n📝 Next steps:', 'yellow');
    print('1. Review the changes in Work.tsx', 'blue');
    print('2. Run: git add pr/src/components/Work.tsx', 'blue');
    print(`3. Run: git commit -m "Add ${title} to ${categoryName}"`, 'blue');
    print('4. Run: git push', 'blue');
    print('\n🎉 Done! Your video will be live after deployment.\n', 'green');

  } catch (error) {
    print(`\n❌ Error: ${error.message}`, 'red');
  }

  rl.close();
}

main().catch(error => {
  print(`\n❌ Fatal error: ${error.message}`, 'red');
  rl.close();
  process.exit(1);
});
