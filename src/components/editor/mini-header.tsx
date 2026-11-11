"use client";

import * as React from "react";
import { MinusIcon, MoonIcon, PlusIcon, QuestionIcon, SunIcon } from "@phosphor-icons/react";

import { useEditor } from "@/store/editor";
import { ExportPopover } from "./export-popover";
import { useTheme } from "./use-theme";
import { Hint } from "./hint";

const ZOOMS = [0.25, 0.33, 0.5, 0.67, 0.75, 1, 1.25, 1.5, 2];

export function stepZoom(direction: 1 | -1) {
  const { zoom, setZoom, fitScale } = useEditor.getState();
  const current = zoom === "fit" ? fitScale : zoom;
  const next = direction > 0 ? ZOOMS.find((z) => z > current + 0.001) : [...ZOOMS].reverse().find((z) => z < current - 0.001);
  if (next) setZoom(next);
}

export function MiniHeader({ onHelp }: { onHelp: () => void }) {
  const zoom = useEditor((s) => s.zoom);
  const setZoom = useEditor((s) => s.setZoom);
  const [theme, setTheme] = useTheme();
  const fitScale = useEditor((s) => s.fitScale);
  const fitPercent = Math.round(fitScale * 100);

  const iconBtn =
    "grid size-7 place-items-center rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--tint-8)] hover:text-[color:var(--foreground)] [&_svg]:size-3.5";

  return (
    <div
      className="toolcraft-panel-surface floating-popup-surface pointer-events-auto absolute top-3 right-3 flex h-11 w-[312px] max-w-[calc(100vw-24px)] items-center justify-between gap-1 rounded-lg border px-1.5"
      data-testid="mini-header"
    >
      <div className="flex items-center gap-0.5">
        <Hint label="Zoom out" keys={["⌘", "−"]} side="bottom">
          <button type="button" aria-label="Zoom out" className={iconBtn} onClick={() => stepZoom(-1)}>
            <MinusIcon />
          </button>
        </Hint>
        <Hint label={zoom === "fit" ? "Actual size" : "Zoom to fit"} keys={zoom === "fit" ? ["⇧", "0"] : ["⇧", "1"]} side="bottom">
          <button
            type="button"
            aria-label={zoom === "fit" ? "Zoom to 100%" : "Zoom to fit"}
            onClick={() => setZoom(zoom === "fit" ? 1 : "fit")}
            className="h-7 min-w-11 rounded-md px-1 font-mono text-2xs tabular-nums hover:bg-[color:var(--tint-8)]"
          >
            {zoom === "fit" ? fitPercent : Math.round(zoom * 100)}%
          </button>
        </Hint>
        <Hint label="Zoom in" keys={["⌘", "+"]} side="bottom">
          <button type="button" aria-label="Zoom in" className={iconBtn} onClick={() => stepZoom(1)}>
            <PlusIcon />
          </button>
        </Hint>
        <div className="mx-1 h-4 w-px bg-[color:var(--tint-10)]" />
        <Hint label="Keyboard shortcuts" keys={["?"]} side="bottom">
          <button type="button" aria-label="Keyboard shortcuts" className={iconBtn} onClick={onHelp}>
            <QuestionIcon />
          </button>
        </Hint>
        <Hint label={theme === "dark" ? "Light mode" : "Dark mode"} keys={["⇧", "D"]} side="bottom">
          <button
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={iconBtn}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            data-testid="theme-toggle"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </Hint>
      </div>

      <ExportPopover />
    </div>
  );
}
