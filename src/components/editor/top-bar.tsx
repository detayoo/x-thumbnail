"use client";

import * as React from "react";
import {
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  FrameCornersIcon,
  MoonIcon,
  QuestionIcon,
  SunIcon,
} from "@phosphor-icons/react";

import { cn } from "@/toolcraft/ui/lib/utils";
import { useEditor } from "@/store/editor";
import { site } from "@/lib/site";
import { FORMATS } from "@/lib/thumbnail/formats";
import { ExportPopover } from "./export-popover";
import { useTheme } from "./use-theme";
import { Hint } from "./hint";
import { useThumbnail } from "./use-thumbnail";

export function Logo({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className={className}>
      <rect width="32" height="32" rx="8" fill="var(--accent)" />
      <rect x="7" y="9" width="18" height="14" rx="2.5" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M7 18.5l5-4.5 4 3.5 3-2.5 6 5" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export const iconButton =
  "grid size-8 place-items-center rounded-lg text-[color:var(--muted-foreground)] transition-colors hover:bg-[color:var(--tint-8)] hover:text-[color:var(--foreground)] aria-disabled:cursor-default aria-disabled:opacity-35 aria-disabled:hover:bg-transparent [&_svg]:size-[17px]";

function FormatSwitch() {
  const formatId = useEditor((s) => s.doc.formatId);
  const setFormat = useEditor((s) => s.setFormat);
  return (
    <div className="flex items-center rounded-full bg-[color:var(--tint-5)] p-0.5" role="radiogroup" aria-label="Image size">
      {FORMATS.map((f) => {
        const active = f.id === formatId;
        return (
          <Hint key={f.id} label={`${f.label} · ${f.width} × ${f.height}`} description={f.detail} side="bottom">
            <button
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setFormat(f.id)}
              className={cn(
                "h-7 rounded-full px-3 text-xs-plus transition-colors",
                active
                  ? "bg-[color:var(--card)] font-medium text-[color:var(--foreground)] shadow-[0_1px_2px_rgba(0,0,0,0.25),0_0_0_1px_var(--tint-10)]"
                  : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
              )}
            >
              {f.short}
            </button>
          </Hint>
        );
      })}
    </div>
  );
}

export function TopBar({ onHelp }: { onHelp: () => void }) {
  const { template } = useThumbnail();
  const canUndo = useEditor((s) => s.past.length > 0);
  const canRedo = useEditor((s) => s.future.length > 0);
  const safeArea = useEditor((s) => s.safeArea);
  const { undo, redo, toggleSafeArea } = useEditor.getState();
  const [theme, setTheme] = useTheme();
  return (
    <header className="relative z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-[color:var(--card)] px-3" data-testid="top-bar">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <Logo className="size-7 shrink-0" />
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="text-sm font-semibold tracking-tight">{site.name}</span>
          <span className="hidden truncate text-xs-plus text-[color:var(--muted-foreground)] lg:inline">
            <span className="mr-2 opacity-40">/</span>
            {template.name}
          </span>
        </div>
      </div>

      <FormatSwitch />

      <div className="flex flex-1 items-center justify-end gap-0.5">
        <Hint label="Undo" keys={["⌘", "Z"]} side="bottom">
          <button type="button" aria-label="Undo" aria-disabled={!canUndo || undefined} className={iconButton} onClick={() => canUndo && undo()}>
            <ArrowUUpLeftIcon />
          </button>
        </Hint>
        <Hint label="Redo" keys={["⇧", "⌘", "Z"]} side="bottom">
          <button type="button" aria-label="Redo" aria-disabled={!canRedo || undefined} className={iconButton} onClick={() => canRedo && redo()}>
            <ArrowUUpRightIcon />
          </button>
        </Hint>
        <div className="mx-1.5 h-5 w-px bg-[color:var(--tint-12)]" />
        <Hint label="Safe area" description="Shows the 60px margin and the square crop some apps use." keys={["G"]} side="bottom">
          <button
            type="button"
            aria-label="Safe area guides"
            aria-pressed={safeArea}
            className={cn(iconButton, safeArea && "bg-[color:color-mix(in_oklab,var(--accent)_18%,transparent)] text-[color:var(--accent)] hover:text-[color:var(--accent)]")}
            onClick={toggleSafeArea}
          >
            <FrameCornersIcon />
          </button>
        </Hint>
        <Hint label="Keyboard shortcuts" keys={["?"]} side="bottom">
          <button type="button" aria-label="Keyboard shortcuts" className={iconButton} onClick={onHelp}>
            <QuestionIcon />
          </button>
        </Hint>
        <Hint label={theme === "dark" ? "Light mode" : "Dark mode"} keys={["⇧", "D"]} side="bottom">
          <button
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={iconButton}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            data-testid="theme-toggle"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </Hint>
        <ExportPopover />
      </div>

    </header>
  );
}
