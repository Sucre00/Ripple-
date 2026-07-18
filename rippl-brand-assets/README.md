# Rippl Brand Assets

Brand: coral #e15b3e · peach light #fcece9 · deep black #000000 · app background #edf1f5 · card base #ffffff
Typeface: Inter (weights 400, 600, 700, 800 included in /fonts)

## Logo files

| File | Use |
|---|---|
| logo-primary-horizontal.svg / .png | Main lockup — website header, email signatures, most contexts |
| logo-primary-stacked.svg / .png | Vertical space (app splash screens, social profile banners) |
| wordmark-black.svg / .png | Text-only, on light backgrounds |
| wordmark-white.svg / .png | Text-only, on dark/coral backgrounds |
| icon-coral.svg / .png | Icon mark alone, transparent background, primary color |
| icon-black.svg / .png | Icon mark alone, monochrome black (single-color print, watermarks) |
| icon-white.svg / .png | Icon mark alone, white (for dark or coral backgrounds) |
| app-icon.svg | Rounded-square app icon source (coral bg, white mark) |
| app-icon-512.png | App store / large app icon |
| app-icon-192.png | Android/PWA icon |
| app-icon-180.png | iOS home screen icon (apple-touch-icon) |
| app-icon-32.png, favicon-32.png, favicon-16.png | Browser favicon sizes |

## Usage notes

- SVGs are the source of truth — scale them for any size without quality loss. PNGs are pre-rendered convenience exports.
- The wordmark SVGs reference `font-family: Inter`. If opening in a design tool without Inter installed, install the fonts in /fonts first, or the text will fall back to a system sans-serif.
- Minimum clear space: leave padding equal to the icon's ring width on all sides — don't crop the outer ring.
- Minimum size: icon mark shouldn't render below 24px (illegibly thin rings below that); wordmark shouldn't render below 80px wide.
- Don't recolor the icon mark to anything outside the palette above, and don't separate the coral accent bar from the wordmark — it's part of the logo, not decoration.

## Not yet defined

This package covers logo, color, and typography only. Not included: semantic status colors (success/warning/danger for fraud alerts, payout states, etc.), a full spacing/elevation system, or icon set beyond the brand mark. Flag if you want these drafted next.
