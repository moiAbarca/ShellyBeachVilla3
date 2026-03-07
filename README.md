# Shelly Beach Villa 3.0

A premium static website for Shelly Beach Villa — a Japanese-focused share house in Auckland, NZ.
Based on Stitch design mockups, using real property photos and a scroll-driven hero video.

## How to Open

Serve locally using Python (required for video + JS components to load without CORS errors):

```bash
cd "Shelly Beach Villa 3.0"
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

## File Structure

```
Shelly Beach Villa 3.0/
├── index.html          → Home (scroll hero + manifesto + rooms preview + contact form)
├── rooms.html          → Room details (Single $350/wk, Double $480/wk)
├── facilities.html     → Shared spaces (Lounge, Kitchen, Balcony, Laundry)
├── about.html          → Concept / Philosophy / Location
├── contact.html        → FAQ accordion + Contact form
└── assets/
    ├── style.css        → Global CSS (animations, hero, FAQ, video modal)
    ├── components.js    → Shared Header + Footer injected into every page
    ├── script.js        → Scroll hero, fade-in observer, FAQ, tour modal
    ├── hero-video.mp4   → Transcoded scroll-driven hero (1-frame GOP keyframes)
    ├── tour-video.mp4   → House tour video (optimized 1280p)
    └── comunity2.jpg    → Optimized community photo (was 4.3MB PNG → JPEG)
```

Photos are referenced from `../pictures/` (the parent `pictures/` folder).

## How to Change the Hero Video

The hero uses scroll-driven scrubbing. For smooth backward/forward scrubbing in browsers, the video must have **frequent keyframes (GOP=1)**.

```bash
# Transcode your new video:
ffmpeg -i "YOUR-NEW-VIDEO.mp4" \
  -c:v libx264 -preset fast -g 1 -movflags faststart -pix_fmt yuv420p \
  "Shelly Beach Villa 3.0/assets/hero-video.mp4"
```

Replace `assets/hero-video.mp4` with the result. The scroll script automatically maps the container height to the full video duration.

## How to Change the Tour Video

```bash
ffmpeg -i "YOUR-TOUR.mp4" \
  -c:v libx264 -crf 28 -movflags faststart -vf "scale=1280:-2" -an \
  "Shelly Beach Villa 3.0/assets/tour-video.mp4"
```

## Deployment

No build step required. Upload the `Shelly Beach Villa 3.0/` folder as-is to any static host (Netlify, Vercel, GitHub Pages, S3).

> **Note:** The `../pictures/` path references only work when hosted from parent `ShellyBeach2/` directory.  
> For standalone deployment, copy the `pictures/` folder **inside** `Shelly Beach Villa 3.0/` and update the `../pictures/` paths to `./pictures/` in all HTML files.
