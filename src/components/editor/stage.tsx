"use client";

import * as React from "react";

import { CanvasDotPattern } from "@/toolcraft/ui";
import { useEditor } from "@/store/editor";
import { useThumbnail } from "./use-thumbnail";
import { EditContext, type EditApi } from "@/components/card/primitives";

const editApi: EditApi = { commit: (field, value) => useEditor.getState().setContent(field, value) };

export function getCardNode() {
  return document.querySelector<HTMLElement>("[data-stage] [data-card-root]");
}

function useSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

export function useFitScale(width: number, height: number, area: { width: number; height: number }) {
  if (!area.width || !area.height) return 0;
  return Math.min((area.width - 64) / width, (area.height - 88) / height, 1);
}

export function Stage() {
  const { template, format, content, style } = useThumbnail();
  const zoom = useEditor((s) => s.zoom);
  const safeArea = useEditor((s) => s.safeArea);
  const areaRef = React.useRef<HTMLDivElement>(null);
  const area = useSize(areaRef);
  const fit = useFitScale(format.width, format.height, area);
  const scale = zoom === "fit" ? fit : zoom;
  const setFitScale = useEditor((s) => s.setFitScale);
  React.useEffect(() => {
    if (fit > 0) setFitScale(fit);
  }, [fit, setFitScale]);
  const Component = template.Component;
  const w = format.width * scale;
  const h = format.height * scale;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "var(--canvas)" }}>
      <CanvasDotPattern offset={{ x: 0, y: 0 }} scale={1} color="color-mix(in oklab, var(--foreground) 22%, transparent)" />
      <div
        ref={areaRef}
        className="absolute inset-x-3 top-3 bottom-[76px] overflow-auto md:right-[336px] md:bottom-[76px] md:left-[272px]"
        data-stage
      >
        {scale > 0 ? (
          <div className="flex min-h-full min-w-full items-center justify-center p-8">
            <div className="flex flex-col gap-2" style={{ width: w }}>
              <div className="flex items-center justify-between gap-3 text-2xs text-[color:var(--muted-foreground)]">
                <span className="truncate">
                  <span className="font-medium text-[color:var(--foreground)]">{template.name}</span>
                  <span className="mx-1.5 opacity-50">/</span>
                  {format.label}
                </span>
                <span className="shrink-0 font-mono tabular-nums">
                  {format.width} × {format.height}
                </span>
              </div>
              <div
                className="relative shrink-0 overflow-hidden rounded-[3px] shadow-[0_24px_70px_-20px_rgba(0,0,0,0.55)] ring-1 ring-[color:var(--tint-10)]"
                style={{ width: w, height: h }}
              >
                <div
                  key={template.id}
                  className="stage-enter"
                  style={{ width: format.width, height: format.height, transform: `scale(${scale})`, transformOrigin: "0 0", ["--stage-scale" as string]: scale }}
                >
                  <EditContext.Provider value={editApi}>
                    <Component content={content} style={style} width={format.width} height={format.height} />
                  </EditContext.Provider>
                </div>
                {safeArea ? <SafeArea scale={scale} width={format.width} height={format.height} /> : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SafeArea({ scale, width, height }: { scale: number; width: number; height: number }) {
  const inset = 60 * scale;
  const square = height * scale;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute border border-dashed"
        style={{ inset, borderColor: "rgba(255, 64, 129, 0.9)", boxShadow: "0 0 0 9999px rgba(255, 64, 129, 0.08)" }}
      />
      <div
        className="absolute top-0 bottom-0 border-x border-dashed"
        style={{ left: (width * scale - square) / 2, width: square, borderColor: "rgba(0, 200, 255, 0.85)" }}
      />
      <span className="absolute rounded-sm bg-[rgba(255,64,129,0.9)] px-1 py-px text-[10px] leading-none font-medium text-white" style={{ left: inset + 4, top: inset + 4 }}>
        60px safe area
      </span>
      <span
        className="absolute rounded-sm bg-[rgba(0,200,255,0.9)] px-1 py-px text-[10px] leading-none font-medium text-black"
        style={{ left: (width * scale - square) / 2 + 4, bottom: 6 }}
      >
        Square crop
      </span>
    </div>
  );
}
