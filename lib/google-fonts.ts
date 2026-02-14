export interface GoogleFont {
  name: string;
  displayName: string;
  weights: number[];
  category: string;
  isLocal?: boolean;
}

export const GOOGLE_FONTS: GoogleFont[] = [
  {
    name: "Geist Mono",
    displayName: "Geist Mono",
    weights: [400, 500, 600, 700],
    category: "monospace",
  },
  {
    name: "Geist",
    displayName: "Geist",
    weights: [400, 500, 600, 700],
    category: "monospace",
  },

  {
    name: "Inter",
    displayName: "Inter",
    weights: [400, 500, 600, 700, 800, 900],
    category: "sans-serif",
  },

  {
    name: "Bricolage Grotesque",
    displayName: "Bricolage Grotesque",
    weights: [400, 500, 700, 900],
    category: "sans-serif",
  },

  {
    name: "Raleway",
    displayName: "Raleway",
    weights: [400, 500, 600, 700, 800, 900],
    category: "sans-serif",
  },

  {
    name: "Space Mono",
    displayName: "Space Mono",
    weights: [400, 700],
    category: "monospace",
  },
  {
    name: "IBM Plex Mono",
    displayName: "IBM Plex Mono",
    weights: [400, 500, 600, 700],
    category: "monospace",
  },
  {
    name: "Barlow",
    displayName: "Barlow",
    weights: [400, 500, 600, 700, 800, 900],
    category: "sans-serif",
  },
  {
    name: "Outfit",
    displayName: "Outfit",
    weights: [400, 500, 600, 700, 800, 900],
    category: "sans-serif",
  },
  {
    name: "DM Sans",
    displayName: "DM Sans",
    weights: [400, 500, 700],
    category: "sans-serif",
  },
  {
    name: "Space Grotesk",
    displayName: "Space Grotesk",
    weights: [400, 500, 600, 700],
    category: "sans-serif",
  },
];

export const DEFAULT_FONT = GOOGLE_FONTS[0];

export function loadGoogleFont(
  fontName: string,
  weights: number[] = [400, 700]
): Promise<void> {
  return new Promise((resolve) => {
    try {
      const font = GOOGLE_FONTS.find((f) => f.name === fontName);
      if (font?.isLocal) {
        resolve();
        return;
      }

      if (
        document.querySelector(`link[href*="${fontName.replace(/\s/g, "+")}"]`)
      ) {
        resolve();
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
        /\s/g,
        "+"
      )}:wght@${weights.join(";")}&display=swap`;

      link.onload = () => {
        setTimeout(() => resolve(), 100);
      };

      link.onerror = () => {
        resolve();
      };

      document.head.appendChild(link);
    } catch (error) {
      console.warn(`Error loading font ${fontName}:`, error);
      resolve();
    }
  });
}

export function getFontFamily(fontName: string): string {
  const font = GOOGLE_FONTS.find((f) => f.name === fontName);
  if (!font) return fontName;

  if (fontName === "Geist Mono") {
    return "var(--font-geist-mono)";
  }

  return `"${fontName}", ${font.category}`;
}
