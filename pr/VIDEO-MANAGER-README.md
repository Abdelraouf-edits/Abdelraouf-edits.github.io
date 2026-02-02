# 🎬 Automated Portfolio Video Manager

A fully automated web-based system for managing your portfolio videos with automatic GitHub deployment!

## ✨ Features

- **Beautiful Web Interface**: Modern, gradient-based UI with live thumbnail previews
- **Fully Automated**: Automatically updates `Work.tsx`, commits, and pushes to GitHub
- **Smart Pagination**: Navigation arrows automatically appear when you have many videos
- **No Manual Editing**: Just paste your Streamable URL and the rest is automatic
- **Live Deployment**: Changes go live on your website in minutes

## 🚀 Quick Start

### Step 1: Start the Server

```powershell
cd pr
npm run video-manager
```

You'll see:
```
🎬 ==========================================
   Portfolio Video Manager Server
========================================== 🎬

✅ Server is running on http://localhost:3000
📹 Open your browser and go to: http://localhost:3000
```

### Step 2: Add Videos

1. **Open your browser** to `http://localhost:3000`
2. **Fill in the form:**
   - Select **Long-form** (Projects) or **Short-form** (Reels)
   - Enter video title
   - Paste your Streamable URL
   - For long-form: select a project type
3. **Click "Add Video to Portfolio"**
4. **Done!** The system will:
   - ✅ Extract video information
   - ✅ Update `Work.tsx` automatically
   - ✅ Commit changes to Git
   - ✅ Push to GitHub
   - ✅ Trigger GitHub Pages rebuild

### Step 3: Check Your Website

Wait 2-3 minutes for GitHub Pages to rebuild, then visit:
```
https://abdelraouf-edits.github.io
```

Your new video will be live! 🎉

## 📱 Navigation Arrows

When you have more than:
- **4 projects** (long-form videos)
- **6 reels** (short-form videos)

Navigation arrows will **automatically appear** to scroll through pages:
- ◀️ Left/Right arrows on the sides
- 🔵 Pagination dots at the bottom

## 🎨 How It Works

```
You paste URL → Server processes → Updates Work.tsx → Git commit → Git push → GitHub Pages rebuild → Live on website
```

1. **Web Interface**: Beautiful form captures video details
2. **Express Server**: Processes the request
3. **File Update**: Automatically modifies `Work.tsx`
4. **Git Operations**: Commits and pushes changes
5. **Deployment**: GitHub Actions builds and deploys

## 📂 Files Structure

```
pr/
├── video-manager.html          # Web interface
├── video-manager-server.js     # Express server (handles automation)
├── src/
│   └── components/
│       └── Work.tsx            # Portfolio videos (auto-updated)
└── package.json                # Contains "video-manager" script
```

## 🔧 Troubleshooting

### Server won't start
```powershell
# Make sure you're in the pr directory
cd pr

# Try installing dependencies again
npm install

# Start server
npm run video-manager
```

### Can't access the website
- Make sure the server is running (you should see the welcome message)
- Check that you're visiting `http://localhost:3000` (not https)
- Try refreshing the page

### Video not showing on website
- Wait 2-3 minutes for GitHub Pages to rebuild
- Check that git push succeeded (look at terminal output)
- Visit your GitHub repository Actions tab to see build status

### Git push failed
The server will update the file but may fail to push if:
- You're not logged into Git (run `git config --global user.email "your@email.com"`)
- You don't have push permissions
- You have unstaged changes

In this case, manually run:
```powershell
git add src/components/Work.tsx
git commit -m "Add new video"
git push
```

## 🎯 Pro Tips

1. **Keep the server running** while adding multiple videos
2. **Check the terminal** for real-time progress updates
3. **Streamable URLs** should be in format: `https://streamable.com/xxxxx`
4. **Thumbnail preview** shows automatically as you type the URL
5. **Categories for long-form**: Choose the most relevant project type

## 🛠 Advanced Usage

### Stop the Server
Press `Ctrl+C` in the terminal

### Add Multiple Videos
Just keep using the form! No need to restart the server.

### Check Server Health
Visit: `http://localhost:3000/health`

### View Terminal Logs
The server shows real-time logs of:
- Received requests
- File updates
- Git operations
- Success/Error messages

## 📊 Video Limits

The navigation system automatically handles:
- **Unlimited projects** (long-form)
- **Unlimited reels** (short-form)

Shows 4 projects and 6 reels per page with automatic pagination.

## 🎬 Video Requirements

- **Platform**: Streamable only (for now)
- **URL Format**: `https://streamable.com/xxxxx`
- **Categories** (long-form only):
  - Spec Work
  - Motion Graphics
  - Style Recreation
  - Cinematic Edit
  - Documentary
  - Commercial
  - Music Video

## 💡 Why This Is Better

### Before (Manual Process):
1. ❌ Open `Work.tsx` in VS Code
2. ❌ Find the correct array
3. ❌ Copy-paste template code
4. ❌ Fill in all the details
5. ❌ Extract video ID manually
6. ❌ Format the thumbnail URL
7. ❌ Save the file
8. ❌ Open terminal
9. ❌ Git add, commit, push
10. ❌ Wait and hope you didn't make a typo

### Now (Automated):
1. ✅ Paste Streamable URL
2. ✅ Click one button
3. ✅ Done! Everything is automatic

---

**Enjoy your automated video management system!** 🎉

For issues or questions, check the terminal output for detailed error messages.
