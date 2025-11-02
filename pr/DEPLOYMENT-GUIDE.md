# 🚀 GitHub Pages Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Files Already Configured:
- ✅ `vite.config.ts` - Base path set for GitHub Pages
- ✅ `.github/workflows/deploy.yml` - GitHub Actions workflow created
- ✅ Build optimization enabled (code splitting, minification)

---

## 🔧 Step-by-Step Deployment Instructions

### **1. Update Base Path (IMPORTANT!)**

In `vite.config.ts`, change the base path to match your repository name:

```typescript
base: mode === "production" ? "/YOUR-REPO-NAME/" : "/",
```

**Replace `/YyJmbzf/` with your actual GitHub repository name!**

For example:
- If your repo is `github.com/username/portfolio` → use `"/portfolio/"`
- If your repo is `github.com/username/my-site` → use `"/my-site/"`

---

### **2. Fix Asset Paths**

Update any hardcoded paths in your components to use relative paths:

**Current Issue in `About.tsx`:**
```tsx
// ❌ WRONG - Will break on GitHub Pages
src="public/abdo.png"

// ✅ CORRECT - Use relative path
src="/abdo.png"
```

---

### **3. Create GitHub Repository**

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### **4. Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Save changes

---

### **5. Trigger Deployment**

The workflow will automatically run when you push to `main` branch:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push
```

Or manually trigger from GitHub:
- Go to **Actions** tab
- Click **Deploy to GitHub Pages**
- Click **Run workflow**

---

## 🔍 Required File Fixes

### **Fix 1: Update About.tsx Image Path**

File: `src/components/About.tsx`

```tsx
// Line ~126 - Change:
<img 
  src="public/abdo.png"  // ❌ WRONG
  
// To:
<img 
  src="/abdo.png"  // ✅ CORRECT
```

### **Fix 2: Update CustomStreamablePlayer.tsx Image Path**

File: `src/components/ui/CustomStreamablePlayer.tsx`

```tsx
// Update all instances of:
src="/abdo.png"  // ✅ Already correct!
```

---

## 📦 Build Optimization Features

Your `vite.config.ts` now includes:

✅ **Code Splitting:**
- `vendor` chunk: React libraries
- `animations` chunk: GSAP, Lenis
- `ui` chunk: Radix UI components

✅ **Minification:** Terser for smaller bundle size

✅ **No Source Maps:** Faster build, smaller files

✅ **Asset Organization:** All assets in `/assets` folder

---

## 🌐 Access Your Site

After deployment, your site will be available at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Example:
```
https://belal.github.io/YyJmbzf/
```

---

## 🐛 Troubleshooting

### **Issue: Blank page or 404 errors**

**Solution:** Check the base path in `vite.config.ts` matches your repo name exactly.

### **Issue: Images not loading**

**Solution:** 
1. Move images from `public/` to `pr/public/` if needed
2. Use paths like `/image.png` (not `public/image.png`)

### **Issue: Routing not working (404 on page refresh)**

**Solution:** Add a `404.html` file that redirects to `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/YOUR-REPO-NAME/'">
  </head>
</html>
```

---

## 🔒 Security Notes

✅ **API Keys:** Store in GitHub Secrets if needed
✅ **Environment Variables:** Use Vite's `import.meta.env`
✅ **HTTPS:** Automatically enabled on GitHub Pages

---

## 📊 Performance Optimizations Already Applied

✅ Image lazy loading
✅ Code splitting by route
✅ Minified CSS and JS
✅ Optimized bundle size
✅ Tree shaking enabled

---

## 🚀 Quick Deploy Commands

```bash
# 1. Update base path in vite.config.ts (see above)

# 2. Fix image paths in components

# 3. Build locally to test
npm run build
npm run preview

# 4. Deploy
git add .
git commit -m "Deploy to GitHub Pages"
git push
```

---

## 📝 Next Steps

1. ⚠️ **CRITICAL:** Update the base path in `vite.config.ts`
2. 🖼️ Fix the image path in `About.tsx` (line ~126)
3. 🔗 Create GitHub repository
4. ⚙️ Enable GitHub Pages (Actions mode)
5. 🚀 Push code to trigger deployment
6. ✅ Visit your live site!

---

## 🎉 Your Site Will Include:

✅ Custom Streamable player with personal branding
✅ GSAP scroll animations
✅ Lenis smooth scrolling
✅ Modern responsive design
✅ All 7 videos with your branding
✅ Watermark replacement script
✅ Auto-pause on scroll
✅ Professional portfolio layout

---

**Need Help?** Check the GitHub Actions tab for deployment logs if something goes wrong!
