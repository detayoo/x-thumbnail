"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { GOOGLE_FONTS, DEFAULT_FONT, loadGoogleFont } from "@/lib/google-fonts";

interface FontSelectorProps {
  value?: string;
  onValueChange?: (fontName: string) => void;
  label?: string;
  className?: string;
}

export function FontSelector({
  value = DEFAULT_FONT.name,
  onValueChange,
  label = "Font",
  className,
}: FontSelectorProps) {
  const [selectedFont, setSelectedFont] = useState(value);
  const [loadingFont, setLoadingFont] = useState(false);

  // Preload popular fonts
  useEffect(() => {
    const popularFonts = GOOGLE_FONTS.slice(0, 5);
    popularFonts.forEach((font) => {
      if (!font.isLocal) {
        loadGoogleFont(font.name, font.weights).catch(console.error);
      }
    });
  }, []);

  const handleFontChange = async (fontName: string) => {
    setLoadingFont(true);
    setSelectedFont(fontName);

    const font = GOOGLE_FONTS.find((f) => f.name === fontName);
    if (font) {
      try {
        await loadGoogleFont(font.name, font.weights);
        onValueChange?.(fontName);
      } catch (error) {
        console.error("Failed to load font:", error);
      }
    }
    setLoadingFont(false);
  };

  // Separate local and Google fonts
  const localFonts = GOOGLE_FONTS.filter((f) => f.isLocal);
  const googleFonts = GOOGLE_FONTS.filter((f) => !f.isLocal);

  return (
    <div className={className}>
      <Label htmlFor="font-selector" className="mb-2 block">
        {label}
      </Label>
      <Select value={selectedFont} onValueChange={handleFontChange}>
        <SelectTrigger id="font-selector" className="min-h-12 w-full">
          <SelectValue>
            {loadingFont ? "Loading..." : selectedFont}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {localFonts.length > 0 && (
            <>
              {localFonts.map((font) => (
                <SelectItem
                  key={font.name}
                  value={font.name}
                  style={{ fontFamily: `"${font.name}"` }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{font.displayName}</span>
                    <span className="text-xs text-muted-foreground ml-2">local</span>
                  </div>
                </SelectItem>
              ))}
            </>
          )}
          {googleFonts.map((font) => (
            <SelectItem
              key={font.name}
              value={font.name}
              style={{ fontFamily: `"${font.name}", ${font.category}` }}
            >
              {font.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}