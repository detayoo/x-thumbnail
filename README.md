# x-thumbnail

A canvas editor for Open Graph, X, LinkedIn and YouTube share images. Pick a template, click any text on the
canvas to edit it, drag things where you want them and export a crisp PNG with every font embedded.

## What's inside

- **34 templates** in seven groups: Featured, YouTube, Announcement, Developer, Product, Editorial, Graphic and Social.
  Every template has its own sample copy, two to four palettes, an accent colour and its own options.
- **Edit on the canvas.** Click to select, click again or double-click to edit text, drag to move (Shift locks the axis),
  arrow keys nudge, Delete hides. The selection bar aligns text left, centre or right and resets positions.
  The Layers list shows and hides every text field and decorative piece.
- **Text per template, or shared.** Each template keeps its own text. Turn on *Use this text on every template*
  to carry one set of copy across all of them.
- **35+ typefaces** via `next/font/google` (sans, serif, display and mono), plus an optional local family that shows up
  as *Sans*, *Mono* and *Semi Mono* when its files are installed (see below).
- **Sizes:** Open Graph 1200 × 630, X 1200 × 675, LinkedIn 1200 × 627 and YouTube 1280 × 720, at 1× or 2×.
  Copy the image to the clipboard or copy ready-made meta tags.
- **Long titles shrink to fit**, so nothing is ever clipped. Safe-area guides (`G`) show the 60px margin and the
  square crop some apps use.
- Light and dark mode (`⇧D`), tooltips with shortcuts, undo and redo, auto-save to IndexedDB and a phone notice.

## Develop

```bash
npm install
npm run dev -- -p 3218
```

`src/toolcraft/ui` is the vendored Toolcraft component library (MIT, Pixel Point). Templates live in `src/templates`,
the card primitives (auto-fitting text, grain, scenes, selectable parts) in `src/components/card` and the editor in
`src/components/editor`.

## Local fonts

The local family is licensed separately and must not be committed to this public repository or served from a public
site. Drop the licensed files into `public/fonts/local/` using the names in `public/fonts/local/README.md`. That folder
is gitignored. When the files are missing, the picker hides those fonts and the app UI falls back to Geist Mono.

Made by [Tayo Adedigba](https://adedigba.online).
