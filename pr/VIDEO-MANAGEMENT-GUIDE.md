# 🎬 Video Manager - Complete Guide

## 🚀 Quick Start

### Starting the Server
```powershell
cd pr
npm run video-manager
```
Or use the convenient script:
```powershell
.\pr\start-server.ps1
```

The server will start at **http://localhost:3000**

---

## 📹 Adding Videos

1. **Open** http://localhost:3000
2. **Choose** category:
   - **Long-form** (projects with categories)
   - **Short-form** (reels)
3. **Paste** your Streamable URL (e.g., `https://streamable.com/abc123`)
4. **Fill** in the title and category (for long-form)
5. **Click** "Add Video to Portfolio"

✅ The video will be:
- Added to your portfolio
- Automatically committed to git
- Pushed to GitHub
- Live on your site within minutes!

---

## 🗑️ Removing Videos

### Method 1: Web Interface (Recommended)
1. **Open** http://localhost:3000/manage-videos.html
2. **Browse** your videos in a visual grid
3. **Click** the "🗑️ Delete Video" button
4. **Confirm** the deletion

✅ The video will be:
- Removed from your portfolio
- Automatically committed to git
- Pushed to GitHub

### Method 2: Manual Editing
1. Open `pr/src/components/Work.tsx`
2. Find the video object in either:
   - `projects` array (long-form)
   - `reels` array (short-form)
3. Delete the entire video object (including the comma)
4. Save the file
5. Commit and push manually

---

## 📊 Features

### Add Video Page (/)
- ✅ Live thumbnail preview
- ✅ Automatic Streamable ID extraction
- ✅ Category selection
- ✅ Form validation
- ✅ Success/error messages
- ✅ Automatic git operations

### Manage Videos Page (/manage-videos.html)
- ✅ Visual grid of all videos
- ✅ Thumbnail previews
- ✅ Video statistics
- ✅ One-click deletion
- ✅ Confirmation dialogs
- ✅ Automatic git operations

---

## 🛠️ Server Endpoints

### GET /
Returns the add video interface

### GET /manage-videos.html
Returns the video management interface

### POST /add-video
Adds a new video to the portfolio
```json
{
  "category": "longform",
  "title": "My Video",
  "videoUrl": "https://streamable.com/abc123",
  "videoCategory": "Motion Graphics",
  "embedId": "abc123",
  "thumbnail": "https://cdn-cf-east.streamable.com/image/abc123.jpg"
}
```

### GET /videos
Returns all videos from Work.tsx

### POST /delete-video
Removes a video from the portfolio
```json
{
  "category": "longform",
  "embedId": "abc123"
}
```

### GET /health
Health check endpoint

---

## 📁 File Structure

```
pr/
├── video-manager-server.js      # Express server
├── video-manager.html            # Add video interface
├── manage-videos.html            # Manage videos interface
├── start-server.ps1              # Startup script
└── src/
    └── components/
        └── Work.tsx              # Video data storage
```

---

## 🔧 Troubleshooting

### Server won't start
```powershell
# Check if port 3000 is in use
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue

# Kill any Node processes
Get-Process node | Stop-Process -Force
```

### White page in browser
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Try incognito mode
4. Check if server is running

### Git push fails
```powershell
# Manually push changes
cd pr
git add .
git commit -m "Update videos"
git push
```

### Can't find a video to delete
1. Check the exact `embedId` in Work.tsx
2. Make sure you selected the correct category
3. Refresh the manage page

---

## 💡 Tips

1. **Keep the server running** in a separate PowerShell window
2. **Use the web interface** for easiest management
3. **Always confirm deletions** - they push to GitHub immediately
4. **Check GitHub Actions** after adding/removing videos to ensure deployment succeeds
5. **Thumbnail URLs** are automatically generated from Streamable

---

## 🎯 Common Tasks

### Add a new long-form project
1. Go to http://localhost:3000
2. Select "Long-form"
3. Paste Streamable URL
4. Enter title and select category
5. Click "Add Video"

### Remove multiple videos
1. Go to http://localhost:3000/manage-videos.html
2. Delete them one by one (each deletion auto-commits)

### Preview before deploying
```powershell
cd pr
npm run build
npm run preview
```

---

## 🚨 Important Notes

- ✅ All operations automatically commit and push to GitHub
- ✅ Changes are live on GitHub Pages within 2-5 minutes
- ✅ Always confirm deletions - they're permanent
- ✅ Keep the server PowerShell window open while working
- ✅ Close the server with `Ctrl+C` when done

---

## 📞 Need Help?

If you encounter issues:
1. Check the server terminal for error messages
2. Check browser console (F12) for JavaScript errors
3. Verify `Work.tsx` syntax is correct
4. Ensure git credentials are configured
5. Check GitHub Actions for deployment errors

---

**Happy video managing! 🎬✨**
