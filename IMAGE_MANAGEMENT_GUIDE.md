# Complete Image Management Guide

This guide explains how to change every image on your website.

## Quick Overview

Your website has two types of images:
1. **Static Images** - Hardcoded in files (logo, placeholder backgrounds)
2. **Dynamic Images** - Managed through Admin Panel (property images, community images)

---

## 1. LOGO

**Current Location**: `/public/logo.png`

**How to Change**:
1. Place your new logo image in `/public/logo.png`
2. It will automatically update everywhere (header, footer)

**Recommended Size**: 200px wide × 80px tall (PNG with transparent background)

---

## 2. HERO SECTION BACKGROUND (Home Page)

**File**: `app/page.module.css`

**Current**: Solid black with gradient overlay

**How to Add a Background Image**:

Open `app/page.module.css` and find `.heroBackground` (around line 16):

```css
.heroBackground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,10,12,1));
  z-index: 1;
  animation: kenBurns 20s infinite alternate;
}
```

**Replace with**:
```css
.heroBackground {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,10,12,0.9)),
    url('/hero-background.jpg'); /* Your image path */
  background-size: cover;
  background-position: center;
  z-index: 1;
  animation: kenBurns 20s infinite alternate;
}
```

**Steps**
1. Place your image in `/public/hero-background.jpg`
2. Update the CSS as shown above
3. Save and refresh

---

## 3. ABOUT SECTION IMAGE (Home Page)

**File**: `app/page.js`

**Current Location**: Around line 48

**How to Change**:

Find this line:
```javascript
<div className={styles.aboutImage} style={{ backgroundImage: 'url(https://placehold.co/600x800/111/FFF?text=Ghulam+Abbas+Imran)' }}>
```

**Option 1 - Use Your Own Image**:
```javascript
<div className={styles.aboutImage} style={{ backgroundImage: 'url(/about-photo.jpg)' }}>
```
Then place `about-photo.jpg` in the `/public` folder.

**Option 2 - Use External URL**:
```javascript
<div className={styles.aboutImage} style={{ backgroundImage: 'url(https://your-image-url.com/photo.jpg)' }}>
```

**Recommended Size**: 600px × 800px (portrait orientation)

---

## 4. PROPERTY IMAGES

**Managed Through**: Admin Panel (`/private`)

**How to Change**:

1. Go to `http://localhost:3001/private`
2. Enter password: `Ibrahim414`
3. Click on "PROPERTIES" tab
4. When adding/editing a property, paste image URLs in the "Images" field
5. Separate multiple URLs with commas

**Example**:
```
https://example.com/image1.jpg, https://example.com/image2.jpg, https://example.com/image3.jpg
```

**Recommendations**:
- Use high-quality images (1200px × 900px minimum)
- Upload images to a service like:
  - Imgur (free, easy)
  - Cloudinary (professional)
  - Your own web hosting
- Use HTTPS URLs for security

**Where Images Are Stored**: `data/properties.json`

---

## 5. COMMUNITY IMAGES

**Managed Through**: Admin Panel (`/private`)

**How to Change**:

1. Go to `/private`
2. Click "COMMUNITIES" tab
3. When adding a community, paste the image URL

**Recommendations**:
- Use landscape images (1600px × 900px)
- Should represent the community/neighborhood

**Where Images Are Stored**: `data/communities.json`

---

## 6. PLACEHOLDER IMAGES IN DATABASE

**File**: `data/properties.json`

**How to Replace All Placeholders**:

Open `data/properties.json` and find lines like:
```json
"images": [
  "https://placehold.co/800x600/101010/FFF?text=Luxury+Villa+Exterior"
]
```

Replace with your actual image URLs:
```json
"images": [
  "https://your-hosting.com/villa1.jpg",
  "https://your-hosting.com/villa2.jpg"
]
```

---

## 7. FAVICON (Browser Tab Icon)

**Current Location**: `/public/favicon.ico`

**How to Change**:
1. Create a 32×32 or 16×16 pixel icon (.ico or .png)
2. Replace `/public/favicon.ico` with your file
3. Clear browser cache to see the change

---

## Image Upload Services (Free Options)

Since you can't directly upload images to your Next.js app, use these services:

### **Imgur** (Easiest)
1. Go to https://imgur.com
2. Click "New Post"
3. Upload your image
4. Right-click → "Copy image address"
5. Use that URL

### **Cloudinary** (Professional)
1. Sign up at https://cloudinary.com (free tier)
2. Upload images to your media library
3. Copy the URL
4. Use in your admin panel

### **imgbb** (Simple)
1. Go to https://imgbb.com
2. Upload image
3. Copy "Direct Link"

---

## Quick Reference Table

| Image Type | Location | How to Change |
|------------|----------|---------------|
| Logo | `/public/logo.png` | Replace file |
| Hero Background | `app/page.module.css` | Edit CSS |P
| About Photo | `app/page.js` line 48 | Edit code or use `/public` |
| Property Images | Admin Panel | Add URLs via `/private` |
| Community Images | Admin Panel | Add URLs via `/private` |
| Favicon | `/public/favicon.ico` | Replace file |

---

## Pro Tips

1. **Consistent Sizing**: Keep property images the same aspect ratio (4:3 or 16:9)
2. **Optimization**: Compress images before uploading (use tinypng.com)
3. **Backup**: Keep copies of your JSON files before making changes
4. **Testing**: Always test image URLs in a browser first
5. **HTTPS Only**: Use secure URLs for production sites

---

## Need Help?

If an image isn't showing:
1. Check the browser console (F12) for errors
2. Verify the URL works by pasting it in a new browser tab
3. Make sure the URL starts with `https://` or `/`
4. Check that the file exists in `/public` if using local paths
