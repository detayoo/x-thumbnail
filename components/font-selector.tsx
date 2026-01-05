"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GOOGLE_FONTS, DEFAULT_FONT, loadGoogleFont } from "@/lib/google-fonts";
import { cn } from "@/lib/utils";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loadingFont, setLoadingFont] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Preload popular fonts
  useEffect(() => {
    const popularFonts = GOOGLE_FONTS.slice(0, 5);
    popularFonts.forEach((font) => {
      if (!font.isLocal) {
        loadGoogleFont(font.name, font.weights).catch(console.error);
      }
    });
  }, []);

  // Update dropdown position
  useEffect(() => {
    const updatePosition = () => {
      if (isOpen && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setDropdownStyle({
          position: "fixed",
          top: `${rect.bottom + 4}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          zIndex: 9999,
        });
      }
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleFontChange = async (fontName: string) => {
    setLoadingFont(true);
    setSelectedFont(fontName);
    setIsOpen(false);
    setSearchQuery("");

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

  // Filter fonts based on search query
  const filteredFonts = GOOGLE_FONTS.filter((font) => {
    const query = searchQuery.toLowerCase();
    return (
      font.displayName.toLowerCase().includes(query) ||
      font.category.toLowerCase().includes(query) ||
      (font.isLocal && "local".includes(query))
    );
  });

  // Separate local and Google fonts
  const localFonts = filteredFonts.filter((f) => f.isLocal);
  const googleFonts = filteredFonts.filter((f) => !f.isLocal);

  const dropdownContent = isOpen && typeof window !== "undefined" && (
    <div
      ref={dropdownRef}
      style={dropdownStyle}
      className="rounded-md border border-border bg-popover shadow-lg"
    >
      <div className="max-h-[300px] overflow-y-auto p-1">
        {filteredFonts.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No fonts found
          </div>
        ) : (
          <>
            {localFonts?.length > 0 && (
              <div>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Local Fonts
                </div>
                {localFonts?.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => handleFontChange(font.name)}
                    className={cn(
                      "w-full text-left px-2 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none cursor-pointer transition-colors",
                      selectedFont === font.name && "bg-accent"
                    )}
                    style={{ fontFamily: `"${font.name}"` }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{font.displayName}</span>
                      <span className="text-xs text-muted-foreground">
                        local
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {googleFonts?.length > 0 && (
              <div className={localFonts?.length > 0 ? "mt-2" : ""}>
                {localFonts.length > 0 && (
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Google Fonts
                  </div>
                )}
                {googleFonts?.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => handleFontChange(font.name)}
                    className={cn(
                      "w-full text-left px-2 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none cursor-pointer transition-colors",
                      selectedFont === font.name && "bg-accent"
                    )}
                    style={{
                      fontFamily: `"${font.name}", ${font.category}`,
                    }}
                  >
                    {font.displayName}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className={className} ref={containerRef}>
      <Label htmlFor="font-selector" className="mb-2 block">
        {label}
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id="font-selector"
          type="text"
          value={isOpen ? searchQuery : selectedFont}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search fonts..."
          className="h-12"
          autoComplete="off"
        />
        {dropdownContent && createPortal(dropdownContent, document.body)}
      </div>
    </div>
  );
}
