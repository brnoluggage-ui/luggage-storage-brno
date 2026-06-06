# 🚀 Deployment Guide - Brno Luggage Storage Website

## ✅ What's Been Updated

### 1. **Logo Added**
- Created professional luggage storage logo at `/public/images/logo.svg`
- Logo now appears in:
  - Navigation bar (top left)
  - Footer
  - Browser favicon (tab icon)

### 2. **Scroll to Top Feature**
- Clicking "Brno Luggage Storage" logo/text in navigation smoothly scrolls to top of page

---

## 📦 Build Your Website

Run this command in your project folder:

```bash
npm run build
```

This creates a `dist/` folder with all your website files ready for upload.

---

## 🌐 Deploy to Server

### Option A: Upload to Active24 (Your Current Hosting)

1. **Build first:**
   ```bash
   npm run build
   ```

2. **Open Monsta File Manager** (or FTP client like FileZilla)

3. **Navigate to your `www/` folder**

4. **DELETE everything** in the `www/` folder first (important!)

5. **Upload ALL contents from your `dist/` folder:**
   - `index.html`
   - `assets/` folder (with all CSS/JS files inside)
   - `images/` folder (with logo.svg)

6. **Visit**: `https://luggagestoragebrno.cz`

### ⚠️ Common Active24 Upload Issues:

**Problem: Assets not loading (404 errors)**
- **Solution**: Make sure filename in `dist/index.html` matches actual files in `dist/assets/`
- Delete old files before uploading new ones
- Upload the ENTIRE `assets/` folder, not individual files

**Problem: Blank page**
- **Solution**: Check browser console (F12) for errors
- Make sure `index.html` is in the root `www/` folder, not in a subfolder

---

### Option B: Deploy to Netlify (Recommended - Easier!)

1. **Go to**: https://app.netlify.com/drop

2. **Drag your entire `dist/` folder** into the browser

3. **Done!** Your site is live instantly

4. **Connect your domain:**
   - In Netlify dashboard → Domain settings
   - Add custom domain: `luggagestoragebrno.cz`
   - Follow DNS instructions to point your Active24 domain to Netlify

**Why Netlify?**
- ✅ Instant deployment (no file upload issues)
- ✅ Free SSL certificate
- ✅ Automatic global CDN (faster)
- ✅ No 404 asset errors
- ✅ One-click rollback if something goes wrong

---

## 🎨 Customize Your Logo

### Replace with Your Own Logo:

1. **Create/get your logo** (PNG, SVG, or JPG)

2. **Save it as**: `/public/images/logo.svg` (or logo.png)

3. **If using PNG/JPG instead of SVG:**
   - Edit `/src/app/components/Navigation.tsx` (line ~110)
   - Edit `/src/app/components/Footer.tsx` (line ~125)
   - Change `logo.svg` to `logo.png`

4. **Rebuild**:
   ```bash
   npm run build
   ```

**Logo Specs:**
- Size: 200x200px minimum (square)
- Format: SVG preferred (scales perfectly)
- Background: Transparent
- Colors: Should work on white AND dark backgrounds

---

## 🧪 Test Locally First

Before uploading to server, test locally:

1. **Open** `dist/index.html` in your browser (double-click it)
2. **Check**:
   - ✅ Logo shows up
   - ✅ Clicking logo scrolls to top
   - ✅ All content displays
   - ✅ No console errors (press F12)

If it works locally but NOT on server = upload issue
If it's blank locally = build issue (contact support)

---

## 📋 Deployment Checklist

- [ ] Run `npm run build`
- [ ] Check `dist/index.html` opens locally and works
- [ ] Logo appears in navigation and footer
- [ ] Clicking logo scrolls to top
- [ ] Delete old files from server
- [ ] Upload ALL files from `dist/` folder
- [ ] Check filename match: `dist/index.html` references should match `dist/assets/` files
- [ ] Visit website and test
- [ ] Check mobile version
- [ ] Test in different browsers

---

## 🆘 Troubleshooting

### Blank Page on Server
1. Open browser console (F12)
2. Look for red errors
3. Check if CSS/JS files are loading (Network tab)
4. Most common: filenames in HTML don't match actual files

### Logo Not Showing
1. Check if `dist/images/logo.svg` exists
2. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check browser console for 404 error on logo file

### Assets 404 Errors
1. Compare filenames in `dist/index.html` with files in `dist/assets/`
2. Rebuild: delete `dist/`, run `npm run build` again
3. Upload fresh

---

## 💡 Need Help?

**If deploying to Active24 keeps failing:**
→ Switch to Netlify (it's free and handles everything automatically)

**If build seems broken:**
→ Make sure `dist/index.html` works when opened locally first

**If you need to change the logo later:**
→ See `/public/logo-instructions.md`

---

## 🎉 Success!

Once deployed, your website should:
- ✅ Show professional logo
- ✅ Scroll to top when clicking logo
- ✅ Work in all 8 languages
- ✅ Display correctly on mobile and desktop
- ✅ Have proper SEO meta tags
- ✅ Show luggage storage booking system

**Your live site**: https://luggagestoragebrno.cz
