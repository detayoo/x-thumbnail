"use client";

import { useState, useRef } from "react";
import { CoverGenerator } from "@/components/cover-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import html2canvas from "html2canvas";
import { Download, Image } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { FormInput } from "@/components/ui/form-input";

// Social media image dimensions
const IMAGE_FORMATS = {
  "Twitter/X": { width: 1200, height: 675, ratio: "16:9" },
  "Open Graph": { width: 1200, height: 630, ratio: "1.91:1" },
  LinkedIn: { width: 1200, height: 627, ratio: "1.91:1" },
  "Instagram Square": { width: 1080, height: 1080, ratio: "1:1" },
  "Instagram Portrait": { width: 1080, height: 1350, ratio: "4:5" },
} as const;

export default function ThumbnailGeneratorPage() {
  const [title, setTitle] = useState("Your Title Here");
  const [fontSize, setFontSize] = useState(80);
  const [fontSizeInput, setFontSizeInput] = useState("80");
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFontSizeChange = (value: string) => {
    setFontSizeInput(value);
    
    // Validate and update fontSize
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

      // Ensure fonts are loaded
      await document.fonts.ready;

      // Calculate font size based on user input and format width
      const scaledFontSize = Math.floor((fontSize / 80) * format.width * 0.08);

      // Explicitly load Geist Mono font
      try {
        await document.fonts.load(`bold ${scaledFontSize}px "Geist Mono"`);
      } catch (e) {
        console.warn("Could not load Geist Mono font, using fallback");
      }

      // Create canvas with target dimensions
      const canvas = document.createElement("canvas");
      canvas.width = format.width;
      canvas.height = format.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Fill black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, format.width, format.height);

      // Draw grid
      const gridSize = 100; // Desktop grid size
      ctx.strokeStyle = "#666666";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.2;

      // Vertical lines
      for (let x = 0; x <= format.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, format.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= format.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(format.width, y);
        ctx.stroke();
      }

      // Reset alpha for text
      ctx.globalAlpha = 1.0;

      // Draw text
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Use Geist Mono font with fallback
      ctx.font = `bold ${scaledFontSize}px "Geist Mono", monospace`;

      // Word wrap the title
      const maxWidth = format.width * 0.9;
      const words = title.split(" ");
      const lines: string[] = [];
      let currentLine = words[0];

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
      lines.push(currentLine);

      // Draw each line
      const lineHeight = scaledFontSize * 1.1;
      const totalHeight = lines.length * lineHeight;
      const startY = (format.height - totalHeight) / 2 + scaledFontSize / 2;

      lines.forEach((line, index) => {
        ctx.fillText(line, format.width / 2, startY + index * lineHeight);
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const fileName = `${title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}-${formatName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}.png`;

        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error) {
      console.error("Error generating thumbnail:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <HugeiconsIcon icon={Image} className="size-4" />
            Social Media Ready
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Thumbnail Generator
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Create stunning social media thumbnails in seconds. Perfect for Twitter, Open Graph, LinkedIn, and Instagram.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="shadow-lg border-2">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Customize Your Thumbnail</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Adjust the settings to create the perfect thumbnail
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    Title Text
                  </Label>
                  <FormInput
                    id="title"
                    placeholder="Enter your title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="font-mono text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    💡 Keep it concise for better readability
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontSize" className="text-base font-medium">
                    Font Size
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="fontSize"
                      type="number"
                      min="20"
                      max="200"
                      value={fontSizeInput}
                      onChange={(e) => handleFontSizeChange(e.target.value)}
                      onBlur={handleFontSizeBlur}
                      className="font-mono text-base"
                    />
                    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                      {fontSize}px
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    📏 Range: 20-200px (current: {fontSize}px)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Download Buttons */}
            <Card className="shadow-lg border-2">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Export Formats</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose your platform and download
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(IMAGE_FORMATS).map(([name, format]) => (
                  <Button
                    key={name}
                    onClick={() =>
                      handleDownload(name as keyof typeof IMAGE_FORMATS)
                    }
                    disabled={isGenerating}
                    variant="outline"
                    className="w-full justify-between h-auto py-3 hover:bg-primary/5 hover:border-primary/50 transition-all"
                  >
                    <span className="flex items-center gap-3">
                      <HugeiconsIcon icon={Download} className="size-5" />
                      <span className="font-medium">{name}</span>
                    </span>
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                      {format.width}×{format.height}
                    </span>
                  </Button>
                ))}
                {isGenerating && (
                  <p className="text-sm text-center text-muted-foreground animate-pulse">
                    Generating your thumbnail...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold">Live Preview</div>
              <div className="text-sm text-muted-foreground">16:9 Ratio</div>
            </div>
            <div
              ref={previewRef}
              className="overflow-hidden rounded-xl border-2 shadow-2xl ring-4 ring-primary/10"
              style={{
                aspectRatio: "16/9",
                width: "100%",
                maxHeight: "600px",
              }}
            >
              <CoverGenerator title={title} fontSize={fontSize} />
            </div>
            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <p className="text-xs text-muted-foreground">
                ℹ️ <strong>Preview Note:</strong> This shows the 16:9 aspect ratio.
              </p>
              <p className="text-xs text-muted-foreground">
                Downloaded images will be optimized for each platform's specifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
