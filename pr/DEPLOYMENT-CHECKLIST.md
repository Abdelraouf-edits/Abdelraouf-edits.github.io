# ✅ GitHub Pages Deployment Checklist

## 🔧 Pre-Deployment Tasks

### **Step 1: Update Base Path** ⚠️ **CRITICAL**

Open `vite.config.ts` (line 18) and change:

```typescript
base: mode === "production" ? "/YyJmbzf/" : "/",
```

**TO YOUR ACTUAL REPO NAME:**

```typescript
base: mode === "production" ? "/YOUR-REPO-NAME/" : "/",
```

**Example:**
- Repo: `github.com/username/my-portfolio` → use `"/my-portfolio/"`
- Repo: `github.com/username/website` → use `"/website/"`

---

### **Step 2: Test Build Locally**

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to verify everything works.

---

## 🚀 Deployment Steps

### **Step 3: Create GitHub Repository**

1. Go to [github.com/new](https://github.com/new)
2. Create new repository (e.g., "my-portfolio")
3. **Do NOT** initialize with README (you already have one)

### **Step 4: Push Code to GitHub**

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Video portfolio website"

# Add remote (replace YOUR-USERNAME and YOUR-REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to main branch
git branch -M main
git push -u origin main
```

### **Step 5: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under **Build and deployment**:
   - **Source:** Select `GitHub Actions`
5. That's it! No need to save, it's automatic.

### **Step 6: Wait for Deployment**

1. Go to **Actions** tab in your repository
2. You'll see "Deploy to GitHub Pages" workflow running
3. Wait 2-3 minutes for deployment to complete
4. Green checkmark = Success! ✅

### **Step 7: Access Your Site**

Your site will be available at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

**Example:**
```
https://belal.github.io/portfolio/
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Site loads without blank page
- [ ] All videos display correctly
- [ ] Images load (profile photo in About section)
- [ ] Navigation works (clicking links)
- [ ] Videos play when clicked
- [ ] Custom branding appears on hover
- [ ] Smooth scrolling works
- [ ] Animations trigger on scroll
- [ ] Contact form is visible
- [ ] Mobile responsive (check on phone)

---

## 🐛 Common Issues & Fixes

### ❌ **Issue: Blank Page**

**Cause:** Base path doesn't match repository name

**Fix:**
1. Check `vite.config.ts` base path
2. Must be exactly: `/your-repo-name/`
3. Rebuild and redeploy:
   ```bash
   npm run build
   git add .
   git commit -m "Fix base path"
   git push
   ```

---

### ❌ **Issue: Images Not Loading**

**Cause:** Incorrect image paths

**Fix:** All images should use paths starting with `/`
- ✅ Correct: `src="/abdo.png"`
- ❌ Wrong: `src="public/abdo.png"`

Already fixed in your project! ✅

---

### ❌ **Issue: 404 on Page Refresh**

**Cause:** GitHub Pages doesn't support SPA routing by default

**Fix:** Already included `public/404.html` that handles this! ✅

---

### ❌ **Issue: Videos Not Playing**

**Possible causes:**
1. Internet connection required (videos load from Streamable CDN)
2. Streamable video IDs might be incorrect
3. Browser blocking iframes

**Fix:** Check console for errors, verify video IDs in `Work.tsx`

---

## 🔄 Making Updates After Deployment

To update your deployed site:

```bash
# Make your changes to files

# Commit and push
git add .
git commit -m "Update: describe your changes"
git push

# Deployment happens automatically!
# Check Actions tab for progress
```

---

## 🎯 Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub (after initial setup)
git add .
git commit -m "Your update message"
git push
```

---

## 📊 What Gets Deployed

Your deployment includes:

✅ Optimized HTML, CSS, JS
✅ All images from `public/` folder
✅ Custom video players
✅ Watermark replacement script
✅ GSAP animations
✅ Smooth scrolling
✅ Contact form
✅ All 7 videos with custom branding

---

## 🎉 Success Indicators

You'll know deployment worked when:

1. ✅ Green checkmark in Actions tab
2. ✅ Site URL works: `https://username.github.io/repo-name/`
3. ✅ Videos load and play
4. ✅ Animations work on scroll
5. ✅ No console errors

---

## 📞 Need Help?

If deployment fails:

1. Check **Actions** tab for error messages
2. Review `DEPLOYMENT-GUIDE.md` for detailed troubleshooting
3. Verify all steps in this checklist
4. Check base path in `vite.config.ts`

---

## 🚀 You're Ready!

Follow the steps above and your portfolio will be live in minutes!

**Time to complete:** ~5-10 minutes
**Deployment time:** ~2-3 minutes
**Total:** ~15 minutes to go live! 🎉

---

**Last Updated:** November 2, 2025
