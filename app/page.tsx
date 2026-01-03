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
    if (!previewRef.current) return;

    setIsGenerating(true);

    try {
      const format = IMAGE_FORMATS[formatName];

      // Ensure fonts are loaded before capturing
      await document.fonts.ready;

      // Capture the preview with improved options
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#000000",
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: previewRef.current.offsetWidth,
        height: previewRef.current.offsetHeight,
        onclone: (clonedDoc) => {
          // Ensure the cloned element is visible and properly styled
          const clonedElement = clonedDoc.querySelector('[data-cover-generator]');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.visibility = 'visible';
          }
        },
      });

      // Create a new canvas with the target dimensions
      const targetCanvas = document.createElement("canvas");
      targetCanvas.width = format.width;
      targetCanvas.height = format.height;
      const ctx = targetCanvas.getContext("2d");

      if (!ctx) return;

      // Fill with black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, format.width, format.height);

      // Calculate scaling to fit
      const scale = Math.max(
        format.width / canvas.width,
        format.height / canvas.height
      );

      const scaledWidth = canvas.width * scale;
      const scaledHeight = canvas.height * scale;

      // Center the image
      const x = (format.width - scaledWidth) / 2;
      const y = (format.height - scaledHeight) / 2;

      // Draw the scaled image
      ctx.drawImage(canvas, x, y, scaledWidth, scaledHeight);

      // Convert to blob and download
      targetCanvas.toBlob((blob) => {
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
                  <Input
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
              style={{ height: "600px" }}
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
