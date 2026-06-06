# Logo Files for Brno Luggage Storage

## Current Logo
- **Location**: `/public/images/logo.svg`
- **Type**: SVG (Scalable Vector Graphic)
- **Design**: Blue circular logo with white luggage/suitcase icon and lock

## How to Replace with Your Own Logo

### Option 1: Replace the SVG
1. Create or get your custom logo in SVG format
2. Save it as `/public/images/logo.svg`
3. The website will automatically use your new logo

### Option 2: Use PNG/JPG
1. Save your logo as `/public/images/logo.png` (or logo.jpg)
2. Update both files:
   - `/src/app/components/Navigation.tsx` - change line with `src="/images/logo.svg"`
   - `/src/app/components/Footer.tsx` - change line with `src="/images/logo.svg"`
3. In `/index.html` update the favicon link

### Recommended Logo Specifications
- **Size**: 200x200px minimum (square format works best)
- **Format**: SVG (preferred) or PNG with transparent background
- **Colors**: Should work well on both white (navigation) and dark (footer) backgrounds
- **File size**: Keep under 50KB for fast loading

### Current Logo Colors
- Primary Blue: #2563EB
- Light Blue: #3B82F6
- Dark Blue: #1E40AF
- White: #FFFFFF

Match these colors if you want consistency with the rest of the website design.

## Upload to Server
When you run `npm run build`, the `/public/images/` folder contents will be copied to the `dist/` folder automatically.

Make sure to upload the entire `dist/images/` folder to your server in the `www/images/` directory.
