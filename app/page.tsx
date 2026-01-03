"use client";

import { useState, useRef } from "react";
import { CoverGenerator } from "@/components/cover-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import html2canvas from "html2canvas";
import { Download } from "@hugeicons/core-free-icons";
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
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (formatName: keyof typeof IMAGE_FORMATS) => {
    setIsGenerating(true);

    try {
      const format = IMAGE_FORMATS[formatName];

      // Ensure fonts are loaded
      await document.fonts.ready;

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

      // Calculate font size (roughly 8% of width)
      const fontSize = Math.floor(format.width * 0.08);
      ctx.font = `bold ${fontSize}px monospace`;

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
      const lineHeight = fontSize * 1.1;
      const totalHeight = lines.length * lineHeight;
      const startY = (format.height - totalHeight) / 2 + fontSize / 2;

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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Thumbnail Generator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Create social media thumbnails for Twitter, Open Graph, LinkedIn,
            and Instagram
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thumbnail Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title Text</Label>
                  <FormInput
                    // startIcon={}
                    id="title"
                    placeholder="Enter your title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    This text will appear on your thumbnail
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Download Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Download Formats</CardTitle>
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
                    className="w-full justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <HugeiconsIcon icon={Download} className="size-4" />
                      {name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format.width}×{format.height} ({format.ratio})
                    </span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-4">
            <div className="text-sm font-medium">Live Preview</div>
            <div
              ref={previewRef}
              className="overflow-hidden rounded-lg border shadow-lg"
              style={{
                aspectRatio: "16/9",
                width: "100%",
                maxHeight: "600px",
              }}
            >
              <CoverGenerator title={title} />
            </div>
            <p className="text-xs text-muted-foreground">
              Preview shows 16:9 aspect ratio. Downloaded images will be sized
              according to the selected format.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
