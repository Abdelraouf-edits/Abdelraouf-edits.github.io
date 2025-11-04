# 📹 Video Portfolio Manager

An interactive CLI tool to easily add videos to your portfolio website.

## 🚀 Quick Start

### Run the tool:

```bash
cd pr
node add-video.js
```

### Follow the prompts:

1. **Choose category:**
   - Option 1: Long-form Content (Featured Projects)
   - Option 2: Short-form Content (Featured Reels)

2. **Enter video details:**
   - Video Title
   - Streamable URL (e.g., https://streamable.com/abc123)
   - Category (for long-form only)

3. **Confirm and apply:**
   - Review the details
   - Confirm to update `Work.tsx`

4. **Commit and push:**
   ```bash
   git add pr/src/components/Work.tsx
   git commit -m "Add new video: [Title]"
   git push
   ```

## 📋 Example Usage

```bash
$ node add-video.js

╔══════════════════════════════════════════════════════════╗
║         📹  Video Portfolio Manager  📹                  ║
╚══════════════════════════════════════════════════════════╝

Choose video category:
1. Long-form Content (Featured Projects)
2. Short-form Content (Featured Reels)

Enter your choice (1 or 2): 2

✓ Selected: Featured Reels (Short-form)

Enter video details:
Video Title: My Amazing Reel
Streamable URL: https://streamable.com/xyz789

────────────────────────────────────────────────────────────
📋 Video Details:
────────────────────────────────────────────────────────────
Category: Featured Reels (Short-form)
Title: My Amazing Reel
Video ID: xyz789
URL: https://streamable.com/xyz789
Thumbnail: https://cdn-cf-east.streamable.com/image/xyz789.jpg
────────────────────────────────────────────────────────────

Is this correct? (y/n): y

✅ Video added successfully to Work.tsx!

📝 Next steps:
1. Review the changes in Work.tsx
2. Run: git add pr/src/components/Work.tsx
3. Run: git commit -m "Add My Amazing Reel to Featured Reels (Short-form)"
4. Run: git push

🎉 Done! Your video will be live after deployment.
```

## 📝 Video Categories

### Long-form Content (Featured Projects)
- Spec Work
- Motion Graphics
- Style Recreation
- Cinematic Edit
- Documentary
- Commercial
- Music Video

### Short-form Content (Featured Reels)
- No category needed (reels are simplified)

## 🔧 Technical Details

- **File Modified:** `pr/src/components/Work.tsx`
- **Arrays Updated:**
  - `projects` array for long-form
  - `reels` array for short-form
- **Platform:** Streamable only (automatic thumbnail generation)

## ⚠️ Requirements

- Node.js installed
- Streamable URL in format: `https://streamable.com/xxxxx`
- Repository must be at: `Abdelraouf-edits.github.io`

## 🎨 Features

- ✅ Interactive CLI with colors
- ✅ Input validation
- ✅ Automatic thumbnail URL generation
- ✅ Confirmation before applying changes
- ✅ Clear next steps instructions
- ✅ Error handling

## 🐛 Troubleshooting

**Error: Invalid Streamable URL**
- Make sure the URL format is: `https://streamable.com/xxxxx`

**Error: Cannot find Work.tsx**
- Make sure you're running the script from the `pr` directory

**Changes not showing?**
- Wait 2-3 minutes for GitHub Actions to deploy
- Clear browser cache (Ctrl+F5)

---

Made with ❤️ for easy portfolio management
