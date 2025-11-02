# 🎬 Video Portfolio Website

A modern, responsive portfolio website featuring custom Streamable video player with personal branding, smooth animations, and professional design.

## ✨ Features

- 🎥 **Custom Streamable Player** - Personal branding overlay on all videos
- 🎨 **Modern Design** - Premium UI with floating effects and gradients
- ✨ **GSAP Animations** - Smooth scroll-triggered animations throughout
- 🌊 **Lenis Smooth Scrolling** - Buttery smooth page scrolling
- 📱 **Fully Responsive** - Optimized for all devices
- 🚀 **Fast Performance** - Code splitting and optimized builds
- 🔗 **Personal Branding** - Links to X/Twitter on all videos
- ⏸️ **Auto-Pause** - Videos pause when scrolled out of view

## 🚀 Quick Start

### Local Development

```sh
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:8080`

### Build for Production

```sh
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

## 📦 Deploy to GitHub Pages

### **⚠️ IMPORTANT: Before Deploying**

1. **Update the base path** in `vite.config.ts` (line 18):
   ```typescript
   base: mode === "production" ? "/YOUR-REPO-NAME/" : "/",
   ```
   Replace `/YyJmbzf/` with your actual GitHub repository name!

### **Deployment Steps:**

1. **Create GitHub Repository**
   ```sh
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select: **GitHub Actions**

3. **Deploy**
   - Push commits automatically trigger deployment
   - Or manually trigger from **Actions** tab

4. **Access Your Site**
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
   ```

📖 **Full deployment guide:** See `DEPLOYMENT-GUIDE.md` for detailed instructions!

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS + shadcn/ui
- **UI Components:** Radix UI
- **Animations:** GSAP 3 + Lenis
- **Routing:** React Router
- **Video Platform:** Streamable
- **Icons:** Lucide React
- **Deployment:** GitHub Pages

## 📁 Project Structure

```
pr/
├── src/
│   ├── components/          # Main React components
│   │   ├── Hero.tsx        # Landing/hero section
│   │   ├── About.tsx       # About section
│   │   ├── Work.tsx        # Featured projects & reels
│   │   ├── Process.tsx     # Process section
│   │   ├── Contact.tsx     # Contact form
│   │   └── Testimonials.tsx
│   ├── components/ui/      # Reusable UI components
│   │   ├── CustomStreamablePlayer.tsx  # Custom video player
│   │   └── CustomVideoPlayer.tsx
│   ├── lib/               # Utilities and helpers
│   ├── pages/             # Route pages
│   └── App.tsx            # Main app component
├── public/
│   ├── abdo.png           # Profile photo
│   ├── replace-watermark.js  # Watermark replacement script
│   └── 404.html           # SPA routing support
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions deployment
├── vite.config.ts         # Vite configuration
└── DEPLOYMENT-GUIDE.md    # Detailed deployment guide
```

## 🎥 Videos Included

### Featured Projects (Long-form Content):
1. **PVE for personal brand** - Spec Work
2. **First Motion Design Animation** - Motion Graphics
3. **Iman Gadzhi Editing Style Recreation** - Style Recreation
4. **The Last True Libretto** - Cinematic Edit

### Featured Reels (Short-form Content):
1. **Football Highlight Reel**
2. **Short Form Edit**
3. **Mohi Visuals Style Recreation**

All videos feature custom branding with personal photo and X/Twitter link (@abdelrauof_).

## 🎨 Customization

### Update Personal Information

**Profile Photo:** Replace `public/abdo.png` with your photo

**X/Twitter Link:** Update in:
- `src/components/ui/CustomStreamablePlayer.tsx` (lines with `https://x.com/abdelrauof_`)
- `public/replace-watermark.js` (CONFIG object)

**Colors:** Edit `src/index.css` CSS variables:
```css
--primary: #your-color;
--background: #your-background;
```

### Add More Videos

Edit `src/components/Work.tsx`:
```typescript
const projects = [
  {
    title: "Your Video Title",
    category: "Your Category",
    videoUrl: "https://streamable.com/your-id",
    embedId: "your-id",
    thumbnail: "https://cdn-cf-east.streamable.com/image/your-id.jpg",
    platform: "streamable",
  }
];
```

## 🐛 Troubleshooting

**Blank page after deployment?**
- ✅ Check base path in `vite.config.ts` matches repository name exactly
- ✅ Ensure it includes leading and trailing slashes: `/repo-name/`

**Images not loading?**
- ✅ Use paths starting with `/` (e.g., `/abdo.png` not `public/abdo.png`)
- ✅ Verify images are in `public/` folder

**Videos not playing?**
- ✅ Check Streamable video IDs are correct
- ✅ Ensure internet connection for CDN access

**Routing not working (404 on refresh)?**
- ✅ GitHub Pages SPA routing is handled by `public/404.html`
- ✅ This file is already configured

**Build errors?**
```sh
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📊 Performance Optimizations

✅ **Code Splitting:**
- Vendor chunk (React libraries)
- Animations chunk (GSAP, Lenis)
- UI chunk (Radix components)

✅ **Build Optimizations:**
- Terser minification
- Tree shaking
- No source maps in production
- Optimized asset loading

✅ **Runtime Optimizations:**
- Lazy loading images
- Auto-pause videos on scroll
- Optimized re-renders

## 🔒 Best Practices

✅ Semantic HTML
✅ Accessible components (Radix UI)
✅ Responsive design (mobile-first)
✅ SEO optimized (meta tags)
✅ Fast loading times
✅ Clean code structure

## 📄 Files Created/Modified

**New Files:**
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `DEPLOYMENT-GUIDE.md` - Comprehensive deployment guide
- `public/404.html` - SPA routing support

**Modified Files:**
- `vite.config.ts` - Added GitHub Pages configuration
- `src/components/About.tsx` - Fixed image path
- All video components - Custom Streamable integration

## 🤝 Connect

- 🐦 **X/Twitter:** [@abdelrauof_](https://x.com/abdelrauof_)
- 📧 **Contact:** Use the form on the website
- 💼 **Portfolio:** This website!

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP Documentation](https://gsap.com/docs/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)

---

**Made with ❤️ using React + Vite + Tailwind CSS**

**Deployed on:** GitHub Pages
**Build Time:** ~30 seconds
**Bundle Size:** Optimized with code splitting
