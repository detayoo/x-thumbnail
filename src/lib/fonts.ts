export type FontCategory = "sans" | "serif" | "display" | "mono";

export type FontDef = {
  id: string;
  label: string;
  category: FontCategory;
  family: string;
  weights: readonly number[];
  italic: boolean;
  local?: boolean;
};

const range = (from: number, to: number) => Array.from({ length: (to - from) / 100 + 1 }, (_, i) => from + i * 100);

const google = (id: string, label: string, category: FontCategory, weights: readonly number[], italic = false, fallback?: string): FontDef => ({
  id,
  label,
  category,
  family: `var(--font-${id}), ${fallback ?? fallbackFor(category)}`,
  weights,
  italic,
});

function fallbackFor(category: FontCategory) {
  if (category === "serif") return "Georgia, serif";
  if (category === "mono") return "ui-monospace, Menlo, monospace";
  return "system-ui, sans-serif";
}

export const FONTS: readonly FontDef[] = [
  { id: "local-sans", label: "Sans", category: "sans", family: `"Card Sans", system-ui, sans-serif`, weights: range(100, 900), italic: false, local: true },
  { id: "local-semi-mono", label: "Semi Mono", category: "mono", family: `"Card Semi Mono", ui-monospace, monospace`, weights: [300, 400, 500, 600, 700, 900], italic: false, local: true },
  { id: "local-mono", label: "Mono", category: "mono", family: `"Card Mono", ui-monospace, monospace`, weights: range(200, 900), italic: false, local: true },

  google("plus-jakarta-sans", "Plus Jakarta Sans", "sans", range(200, 800), true),
  google("geist", "Geist", "sans", range(100, 900)),
  google("manrope", "Manrope", "sans", range(200, 800)),
  google("dm-sans", "DM Sans", "sans", range(100, 900), true),
  google("space-grotesk", "Space Grotesk", "sans", range(300, 700)),
  google("sora", "Sora", "sans", range(100, 800)),
  google("outfit", "Outfit", "sans", range(100, 900)),
  google("instrument-sans", "Instrument Sans", "sans", range(400, 700)),
  google("figtree", "Figtree", "sans", range(300, 900)),
  google("onest", "Onest", "sans", range(100, 900)),
  google("schibsted-grotesk", "Schibsted Grotesk", "sans", range(400, 900)),
  google("hanken-grotesk", "Hanken Grotesk", "sans", range(100, 900)),
  google("ibm-plex-sans", "IBM Plex Sans", "sans", range(100, 700)),
  google("archivo", "Archivo", "sans", range(100, 900)),

  google("instrument-serif", "Instrument Serif", "serif", [400], true),
  google("fraunces", "Fraunces", "serif", range(100, 900), true),
  google("playfair-display", "Playfair Display", "serif", range(400, 900), true),
  google("eb-garamond", "EB Garamond", "serif", range(400, 800), true),
  google("newsreader", "Newsreader", "serif", range(200, 800), true),
  google("dm-serif-display", "DM Serif Display", "serif", [400], true),
  google("young-serif", "Young Serif", "serif", [400]),
  google("libre-caslon-text", "Libre Caslon Text", "serif", [400, 700], true),

  google("bricolage-grotesque", "Bricolage Grotesque", "display", range(200, 800)),
  google("syne", "Syne", "display", range(400, 800)),
  google("unbounded", "Unbounded", "display", range(200, 900)),
  google("anton", "Anton", "display", [400]),
  google("archivo-black", "Archivo Black", "display", [400]),
  google("bebas-neue", "Bebas Neue", "display", [400]),
  google("caveat", "Caveat", "display", range(400, 700), false, "cursive"),

  google("geist-mono", "Geist Mono", "mono", range(100, 900)),
  google("jetbrains-mono", "JetBrains Mono", "mono", range(100, 800)),
  google("ibm-plex-mono", "IBM Plex Mono", "mono", [400, 500, 600, 700]),
  google("space-mono", "Space Mono", "mono", [400, 700]),
  google("dm-mono", "DM Mono", "mono", [400, 500]),
  google("fragment-mono", "Fragment Mono", "mono", [400]),
  google("martian-mono", "Martian Mono", "mono", range(100, 800)),
];

export const FONT_CATEGORIES: readonly { id: FontCategory; label: string }[] = [
  { id: "sans", label: "Sans" },
  { id: "serif", label: "Serif" },
  { id: "display", label: "Display" },
  { id: "mono", label: "Mono" },
];

const byId = new Map(FONTS.map((f) => [f.id, f]));
const FALLBACK_FONT = byId.get("geist")!;

export const LOCAL_FONT_FILES: Record<string, string> = {
  "local-sans": "/fonts/local/sans.ttf",
  "local-mono": "/fonts/local/mono.ttf",
  "local-semi-mono": "/fonts/local/semi-mono-400.otf",
};

export const LOCAL_FONT_SUBSTITUTES: Record<string, string> = {
  "local-sans": "geist",
  "local-mono": "geist-mono",
  "local-semi-mono": "jetbrains-mono",
};

export function getFont(id: string | undefined): FontDef {
  return (id && byId.get(id)) || FALLBACK_FONT;
}

export function resolveWeight(font: FontDef, desired: number): number {
  return font.weights.reduce((best, w) => (Math.abs(w - desired) < Math.abs(best - desired) ? w : best), font.weights[0]);
}
