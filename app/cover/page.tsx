"use client";

import { useState } from "react";
import { CoverGenerator } from "@/components/cover-generator";
import { FontSelector } from "@/components/font-selector";
import { DEFAULT_FONT, getFontFamily, loadGoogleFont } from "@/lib/google-fonts";

export default function CoverPage() {
  const [selectedFont, setSelectedFont] = useState(DEFAULT_FONT.name);
  const [fontLoaded, setFontLoaded] = useState(false);

  const handleFontChange = async (fontName: string) => {
    setFontLoaded(false);
    setSelectedFont(fontName);
    
    const font = await import("@/lib/google-fonts").then(m => 
      m.GOOGLE_FONTS.find(f => f.name === fontName)
    );
    
    if (font) {
      await loadGoogleFont(font.name, font.weights);
      setFontLoaded(true);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b border-border bg-background p-4">
        <div className="mx-auto max-w-md">
          <FontSelector
            value={selectedFont}
            onValueChange={handleFontChange}
            label="Select Font for Thumbnail"
          />
        </div>
      </div>

      <div className="flex-1">
        <CoverGenerator
          title={
            <>
              avantmag <br />- information. in print. digitally.
            </>
          }
          fontFamily={getFontFamily(selectedFont)}
        />
      </div>
    </div>
  );
}