"use client";

import { useState, useRef, useEffect } from "react";
import { CoverGenerator } from "@/components/cover-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share08Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { FormInput } from "@/components/ui/form-input";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { Footer } from "@/components/footer";
import { SITE_DESCRIPTION } from "@/utils/constants";

// Social media image dimensions
const IMAGE_FORMATS = {
  X: { width: 1200, height: 675, ratio: "16:9" },
  "open graph": { width: 1200, height: 630, ratio: "1.91:1" },
  linkedin: { width: 1200, height: 627, ratio: "1.91:1" },
  // "instagram Square": { width: 1080, height: 1080, ratio: "1:1" },
  // "instagram Portrait": { width: 1080, height: 1350, ratio: "4:5" },
} as const;

export default function ThumbnailGeneratorPage() {
  const [title, setTitle] = useState("Your Title");
  const [fontSize, setFontSize] = useState(60);
  const [fontSizeInput, setFontSizeInput] = useState("60");
  const [selectedFormat, setSelectedFormat] =
    useState<keyof typeof IMAGE_FORMATS>("X");
  const [isGenerating, setIsGenerating] = useState(false);
  const [useFullGrid, setUseFullGrid] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareOptions(false);
      }
    };

    if (showShareOptions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showShareOptions]);

  const handleFontSizeChange = (value: string) => {
    setFontSizeInput(value);

    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 20 && numValue <= 200) {
      setFontSize(numValue);
    }
  };

  const handleFontSizeBlur = () => {
    const numValue = parseInt(fontSizeInput);
    if (isNaN(numValue) || numValue < 20) {
      setFontSizeInput("20");
      setFontSize(20);
    } else if (numValue > 200) {
      setFontSizeInput("200");
      setFontSize(200);
    }
  };

  const handleDownload = async (formatName: keyof typeof IMAGE_FORMATS) => {
    setIsGenerating(true);

    try {
      const format = IMAGE_FORMATS[formatName];
      await document.fonts.ready;

      // Create canvas
      const canvas = document.createElement("canvas");
      const scale = 2;
      canvas.width = format.width * scale;
      canvas.height = format.height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.scale(scale, scale);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, format.width, format.height);

      // Grid rendering
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.2;

      if (useFullGrid) {
        // Full grid with larger spacing
        const gridSize = 150;
        for (let x = 0; x <= format.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, format.height);
          ctx.stroke();
        }

        for (let y = 0; y <= format.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(format.width, y);
          ctx.stroke();
        }
      } else {
        // Border-only grid - lines running full length with padding from edges
        const horizontalPadding = 48;
        const verticalPadding = 32;

        // Left vertical line - full height
        ctx.beginPath();
        ctx.moveTo(horizontalPadding, 0);
        ctx.lineTo(horizontalPadding, format.height);
        ctx.stroke();

        // Right vertical line - full height
        ctx.beginPath();
        ctx.moveTo(format.width - horizontalPadding, 0);
        ctx.lineTo(format.width - horizontalPadding, format.height);
        ctx.stroke();

        // Top horizontal line - full width
        ctx.beginPath();
        ctx.moveTo(0, verticalPadding);
        ctx.lineTo(format.width, verticalPadding);
        ctx.stroke();

        // Bottom horizontal line - full width
        ctx.beginPath();
        ctx.moveTo(0, format.height - verticalPadding);
        ctx.lineTo(format.width, format.height - verticalPadding);
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;

      // Text (increase font size by 10 for download)
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.font = `bold ${fontSize + 25}px "Geist Mono", monospace`;

      const leftPadding = 100;
      const maxWidth = format.width * 0.5; // Use 50% of width for text

      // Word wrap
      const words = title.split(" ");
      const lines: string[] = [];
      let currentLine = words[0] || "";

      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + " " + words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      // Center vertically (use increased font size with more line spacing)
      const lineHeight = (fontSize + 25) * 1.15;
      const totalHeight = lines.length * lineHeight;
      const startY = (format.height - totalHeight) / 2;

      lines.forEach((line, index) => {
        ctx.fillText(line, leftPadding, startY + index * lineHeight);
      });

      // Download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}-${formatName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = (platform: 'x' | 'whatsapp') => {
    const url = window.location.href;
    const text = `Check out this thumbnail: ${title}`;
    
    let shareUrl = '';
    if (platform === 'x') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    setShowShareOptions(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            x-thumbnail
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {SITE_DESCRIPTION}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6 order-2 lg:order-1">
            <Card className="border rounded-[30px]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">
                  customize your thumbnail
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  adjust the settings to create the perfect thumbnail
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    title text
                  </Label>
                  <FormInput
                    id="title"
                    placeholder="Enter your title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontSize" className="text-base font-medium">
                    font size
                  </Label>
                  <div className="flex items-center gap-3">
                    <FormInput
                      id="fontSize"
                      type="number"
                      min="20"
                      max="200"
                      value={fontSizeInput}
                      onChange={(e) => handleFontSizeChange(e.target.value)}
                      onBlur={handleFontSizeBlur}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Choose between 20-200px
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gridType" className="text-base font-medium">
                    grid style
                  </Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant={useFullGrid ? "default" : "outline"}
                      className="flex-1 relative"
                      onClick={() => setUseFullGrid(true)}
                    >
                      {useFullGrid && (
                        <HugeiconsIcon 
                          icon={Tick02Icon} 
                          className="size-4 mr-2" 
                        />
                      )}
                      full grid
                    </Button>
                    <Button
                      type="button"
                      variant={!useFullGrid ? "default" : "outline"}
                      className="flex-1 relative"
                      onClick={() => setUseFullGrid(false)}
                    >
                      {!useFullGrid && (
                        <HugeiconsIcon 
                          icon={Tick02Icon} 
                          className="size-4 mr-2" 
                        />
                      )}
                      border only
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border rounded-[30px]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">export</CardTitle>
                <p className="text-sm text-muted-foreground">
                  select type and download
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="format" className="text-base font-medium">
                    type
                  </Label>
                  <Combobox
                    value={selectedFormat}
                    onValueChange={(value) =>
                      setSelectedFormat(value as keyof typeof IMAGE_FORMATS)
                    }
                  >
                    <ComboboxInput
                      id="format"
                      placeholder="Select format..."
                      showClear={false}
                      value={selectedFormat}
                      readOnly
                    />
                    <ComboboxContent>
                      <ComboboxList>
                        <ComboboxEmpty>Select type</ComboboxEmpty>
                        {Object.entries(IMAGE_FORMATS).map(([name, format]) => (
                          <ComboboxItem key={name} value={name}>
                            <div className="flex items-center justify-between w-full">
                              <span>{name}</span>
                              <span className="text-xs font-mono text-muted-foreground ml-4">
                                {format.width}×{format.height}
                              </span>
                            </div>
                          </ComboboxItem>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  <p className="text-xs text-muted-foreground">
                    {IMAGE_FORMATS[selectedFormat].width}×
                    {IMAGE_FORMATS[selectedFormat].height} (
                    {IMAGE_FORMATS[selectedFormat].ratio})
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleDownload(selectedFormat)}
                    disabled={isGenerating}
                    className="flex-1 h-12"
                  >
                    <HugeiconsIcon icon={Download} className="size-4 mr-2" />
                    {isGenerating ? "generating..." : "download"}
                  </Button>
                  <div className="relative" ref={shareMenuRef}>
                    <Button
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      variant="outline"
                      size="icon-lg"
                      className="h-12"
                      aria-label="Share thumbnail"
                    >
                      <HugeiconsIcon icon={Share08Icon} className="size-5" />
                    </Button>
                    
                    {showShareOptions && (
                      <div className="absolute bottom-full right-0 mb-2 w-48 bg-popover border border-border rounded-xl shadow-lg p-2 z-50 animate-fade-in">
                        <div className="text-xs font-medium text-muted-foreground px-3 py-2">
                          share on
                        </div>
                        <Button
                          onClick={() => handleShare('x')}
                          variant="ghost"
                          className="w-full justify-start h-10 rounded-lg"
                        >
                          <svg className="size-4 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          X (Twitter)
                        </Button>
                        <Button
                          onClick={() => handleShare('whatsapp')}
                          variant="ghost"
                          className="w-full justify-start h-10 rounded-lg"
                        >
                          <svg className="size-4 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          WhatsApp
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 lg:sticky lg:top-8 lg:self-start order-1 lg:order-2">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold">live preview</div>
              <div className="text-sm text-muted-foreground">16:9 Ratio</div>
            </div>
            <div
              ref={previewRef}
              className="overflow-hidden rounded-[30px]"
              style={{
                aspectRatio: "16/9",
                width: "100%",
                maxHeight: "600px",
              }}
            >
              <CoverGenerator
                title={title}
                fontSize={fontSize}
                useFullGrid={useFullGrid}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
