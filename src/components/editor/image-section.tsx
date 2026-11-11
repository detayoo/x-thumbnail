"use client";

import * as React from "react";

import { ControlFieldLabel, Field, PanelSection, SegmentedControl, SliderControl, SwitchControl } from "@/toolcraft/ui";
import { useEditor } from "@/store/editor";
import { contentFor } from "@/lib/thumbnail/content";
import { cutoutEnabled } from "@/lib/thumbnail/cutout";
import type { ImageAdjust } from "@/lib/thumbnail/types";
import { useThumbnail } from "./use-thumbnail";
import { useCutoutBusy } from "./use-cutout";

const BOX_WIDTH = 280;
const BOX_HEIGHT = 168;

function FocalPicker({ src, x, y, onChange }: { src: string; x: number; y: number; onChange: (x: number, y: number) => void }) {
  const [aspect, setAspect] = React.useState(1);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const width = Math.min(BOX_WIDTH, BOX_HEIGHT * aspect);
  const height = width / aspect;

  const update = (clientX: number, clientY: number) => {
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    const ny = Math.round(Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100)));
    onChange(nx, ny);
  };

  return (
    <Field className="min-w-0 gap-2">
      <ControlFieldLabel>Focus</ControlFieldLabel>
      <div className="grid place-items-center rounded-md bg-[color:var(--tint-5)] p-2">
        <div
          ref={boxRef}
          role="slider"
          tabIndex={0}
          aria-label="Image focus point"
          aria-valuenow={x}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${x}% across, ${y}% down`}
          className="relative cursor-crosshair touch-none overflow-hidden rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          style={{ width, height }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            update(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) update(e.clientX, e.clientY);
          }}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 10 : 2;
            const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
            const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
            if (!dx && !dy) return;
            e.preventDefault();
            e.stopPropagation();
            onChange(Math.min(100, Math.max(0, x + dx)), Math.min(100, Math.max(0, y + dy)));
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" draggable={false} className="pointer-events-none size-full object-cover" onLoad={(e) => setAspect(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight || 1)} />
          <span
            aria-hidden
            className="pointer-events-none absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.4)]"
            style={{ left: `${x}%`, top: `${y}%`, background: "color-mix(in oklab, var(--accent) 55%, transparent)" }}
          />
        </div>
      </div>
      <p className="m-0 text-2xs leading-relaxed text-[color:var(--muted-foreground)]">Drag the dot onto the part of the image you want to keep in view.</p>
    </Field>
  );
}

export function ImageSection() {
  const { template, override } = useThumbnail();
  const raw = useEditor((s) => contentFor(s.doc, s.doc.templateId));
  const setStyle = useEditor((s) => s.setStyle);
  const busy = useCutoutBusy(raw.image);
  if (!template.fields.some((f) => f.key === "image") || !raw.image) return null;

  const adjust = override.image ?? {};
  const set = (patch: ImageAdjust, coalesce?: string) => setStyle({ image: { ...adjust, ...patch } }, coalesce);
  const fit = adjust.fit ?? template.imageFit ?? "cover";
  const touched = Object.keys(adjust).some((k) => k !== "cutout");

  return (
    <PanelSection
      title="Image"
      action={
        touched ? (
          <button
            type="button"
            onClick={() => setStyle({ image: adjust.cutout ? { cutout: true } : undefined })}
            className="text-2xs text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
          >
            Reset
          </button>
        ) : undefined
      }
    >
      <FocalPicker src={raw.image} x={adjust.x ?? 50} y={adjust.y ?? 50} onChange={(x, y) => set({ x, y }, "image-focus")} />
      <SliderControl
        name="Zoom"
        min={100}
        max={300}
        step={1}
        unit="%"
        value={Math.round((adjust.zoom ?? 1) * 100)}
        onValueChange={(v) => set({ zoom: v / 100 }, "image-zoom")}
      />
      <SegmentedControl
        name="Sizing"
        value={fit}
        options={[
          { label: "Fill frame", value: "cover" },
          { label: "Show all", value: "contain" },
        ]}
        onValueChange={(v) => set({ fit: v as ImageAdjust["fit"] })}
      />
      {cutoutEnabled ? (
        <>
          <SwitchControl name={busy ? "Removing background…" : "Remove background"} checked={Boolean(adjust.cutout)} disabled={busy} onCheckedChange={(on) => set({ cutout: on })} />
          {adjust.cutout && raw.cutout ? (
            <p className="m-0 text-2xs leading-relaxed text-[color:var(--muted-foreground)]">Turn it off any time to go back to the original photo.</p>
          ) : null}
        </>
      ) : null}
    </PanelSection>
  );
}
