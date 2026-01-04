"use client";

import { useState, useRef } from "react";
import { CoverGenerator } from "@/components/cover-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "@hugeicons/core-free-icons";
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
  const previewRef = useRef<HTMLDivElement>(null);

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
          <div className="space-y-6">
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
                      className="flex-1"
                      onClick={() => setUseFullGrid(true)}
                    >
                      full grid
                    </Button>
                    <Button
                      type="button"
                      variant={!useFullGrid ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setUseFullGrid(false)}
                    >
                      border only
                    </Button>
                  </div>
                  {/* <p className="text-xs text-muted-foreground">
                    {useFullGrid ? "Full grid pattern" : "Simple border frame"}
                  </p> */}
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

                <Button
                  onClick={() => handleDownload(selectedFormat)}
                  disabled={isGenerating}
                  className="w-full h-12"
                >
                  <HugeiconsIcon icon={Download} className="size-4 mr-2" />
                  {isGenerating ? "generating..." : "download now"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
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
