"use client";

import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

import { useEditor } from "@/store/editor";
import { Hint } from "./hint";

const ZOOMS = [0.25, 0.33, 0.5, 0.67, 0.75, 1, 1.25, 1.5, 2];

export function stepZoom(direction: 1 | -1) {
  const { zoom, setZoom, fitScale } = useEditor.getState();
  const current = zoom === "fit" ? fitScale : zoom;
  const next = direction > 0 ? ZOOMS.find((z) => z > current + 0.001) : [...ZOOMS].reverse().find((z) => z < current - 0.001);
  if (next) setZoom(next);
}

const button =
  "grid size-7 place-items-center rounded-full text-[color:var(--muted-foreground)] hover:bg-[color:var(--tint-8)] hover:text-[color:var(--foreground)] [&_svg]:size-3.5";

export function ZoomPill() {
  const zoom = useEditor((s) => s.zoom);
  const fitScale = useEditor((s) => s.fitScale);
  const setZoom = useEditor((s) => s.setZoom);
  const percent = Math.round((zoom === "fit" ? fitScale : zoom) * 100);

  return (
    <div className="absolute right-3 bottom-3 z-10 flex items-center gap-0.5 rounded-full border bg-[color:var(--card)] p-0.5 shadow-lg" data-testid="zoom">
      <Hint label="Zoom out" keys={["⌘", "−"]}>
        <button type="button" aria-label="Zoom out" className={button} onClick={() => stepZoom(-1)}>
          <MinusIcon />
        </button>
      </Hint>
      <Hint label={zoom === "fit" ? "Actual size" : "Zoom to fit"} keys={zoom === "fit" ? ["⇧", "0"] : ["⇧", "1"]}>
        <button
          type="button"
          aria-label={zoom === "fit" ? "Zoom to 100%" : "Zoom to fit"}
          onClick={() => setZoom(zoom === "fit" ? 1 : "fit")}
          className="h-7 min-w-12 rounded-full px-1.5 font-mono text-2xs tabular-nums hover:bg-[color:var(--tint-8)]"
        >
          {zoom === "fit" ? `Fit ${percent}%` : `${percent}%`}
        </button>
      </Hint>
      <Hint label="Zoom in" keys={["⌘", "+"]}>
        <button type="button" aria-label="Zoom in" className={button} onClick={() => stepZoom(1)}>
          <PlusIcon />
        </button>
      </Hint>
    </div>
  );
}
