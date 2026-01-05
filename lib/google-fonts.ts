/**
 * Google Fonts utility for dynamically loading fonts
 */

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

  // {
  //   name: "Montserrat",
  //   displayName: "Montserrat",
  //   weights: [400, 500, 600, 700, 800, 900],
  //   category: "sans-serif",
  // },
  // {
  //   name: "Open Sans",
  //   displayName: "Open Sans",
  //   weights: [400, 600, 700, 800],
  //   category: "sans-serif",
  // },

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

// Default font
export const DEFAULT_FONT = GOOGLE_FONTS[0]; // Geist Mono

/**
 * Dynamically load a Google Font
 * @param fontName - Name of the font to load
 * @param weights - Array of font weights to load
 * @returns Promise that resolves when font is loaded
 */
export function loadGoogleFont(
  fontName: string,
  weights: number[] = [400, 700]
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if it's a local font
    const font = GOOGLE_FONTS.find((f) => f.name === fontName);
    if (font?.isLocal) {
      // Local fonts are already loaded, just resolve
      resolve();
      return;
    }

    // Check if font is already loaded
    if (
      document.querySelector(`link[href*="${fontName.replace(/\s/g, "+")}"]`)
    ) {
      resolve();
      return;
    }

    // Create link element for Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      /\s/g,
      "+"
    )}:wght@${weights.join(";")}&display=swap`;

    link.onload = () => {
      // Wait a bit to ensure font is actually loaded
      setTimeout(() => resolve(), 100);
    };
    link.onerror = () => reject(new Error(`Failed to load font: ${fontName}`));

    document.head.appendChild(link);
  });
}

/**
 * Get font family CSS value
 * @param fontName - Name of the font
 * @returns CSS font-family value
 */
export function getFontFamily(fontName: string): string {
  const font = GOOGLE_FONTS.find((f) => f.name === fontName);
  if (!font) return fontName;

  // Handle Geist Mono specially
  if (fontName === "Geist Mono") {
    return "var(--font-geist-mono)";
  }

  return `"${fontName}", ${font.category}`;
}
