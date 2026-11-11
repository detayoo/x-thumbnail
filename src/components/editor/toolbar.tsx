"use client";

import * as React from "react";
import {
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CopyIcon,
  DownloadSimpleIcon,
  FrameCornersIcon,
  PaletteIcon,
} from "@phosphor-icons/react";

import { cn } from "@/toolcraft/ui/lib/utils";
import { useEditor } from "@/store/editor";
import { copyPng, exportPng } from "./export-actions";
import { Hint } from "./hint";

function ToolButton({
  label,
  description,
  keys,
  active,
  disabled,
  disabledHint,
  onClick,
  children,
}: {
  label: string;
  description?: string;
  keys?: string[];
  active?: boolean;
  disabled?: boolean;
  disabledHint?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Hint label={label} description={disabled && disabledHint ? disabledHint : description} keys={keys}>
      <button
        type="button"
        aria-label={label}
        aria-pressed={active}
        aria-disabled={disabled || undefined}
        onClick={() => !disabled && onClick()}
        className={cn(
          "grid size-8 place-items-center rounded-md text-[color:var(--foreground)] transition-colors duration-100 [&_svg]:size-[18px]",
          "hover:bg-[color:var(--tint-8)] aria-disabled:cursor-default aria-disabled:opacity-35 aria-disabled:hover:bg-transparent",
          active && "bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent)]",
        )}
      >
        {children}
      </button>
    </Hint>
  );
}

const Divider = () => <div className="mx-1 h-5 w-px bg-[color:var(--tint-12)]" />;

export function Toolbar() {
  const canUndo = useEditor((s) => s.past.length > 0);
  const canRedo = useEditor((s) => s.future.length > 0);
  const safeArea = useEditor((s) => s.safeArea);
  const { stepTemplate, shufflePalette, undo, redo, toggleSafeArea } = useEditor.getState();

  return (
    <div
      className="toolcraft-panel-surface floating-popup-surface pointer-events-auto absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-xl border p-1 shadow-2xl md:left-[calc(50%-32px)]"
      data-testid="toolbar"
      role="toolbar"
      aria-label="Tools"
    >
      <ToolButton label="Previous template" keys={["["]} onClick={() => stepTemplate(-1)}>
        <CaretLeftIcon />
      </ToolButton>
      <ToolButton label="Next template" keys={["]"]} onClick={() => stepTemplate(1)}>
        <CaretRightIcon />
      </ToolButton>
      <ToolButton label="Next palette" description="Cycle through this template's color palettes." keys={["P"]} onClick={shufflePalette}>
        <PaletteIcon />
      </ToolButton>
      <ToolButton label="Safe area" description="Show the 60px margin and the square crop some apps use." keys={["G"]} active={safeArea} onClick={toggleSafeArea}>
        <FrameCornersIcon />
      </ToolButton>
      <Divider />
      <ToolButton label="Copy image" description="Copies the PNG to your clipboard." keys={["⇧", "⌘", "C"]} onClick={copyPng}>
        <CopyIcon />
      </ToolButton>
      <ToolButton label="Download PNG" description="Exports at the selected size. ⇧⌘E exports 2×." keys={["⌘", "E"]} onClick={() => exportPng(1)}>
        <DownloadSimpleIcon />
      </ToolButton>
      <Divider />
      <ToolButton label="Undo" keys={["⌘", "Z"]} disabled={!canUndo} disabledHint="Nothing to undo yet." onClick={undo}>
        <ArrowUUpLeftIcon />
      </ToolButton>
      <ToolButton label="Redo" keys={["⇧", "⌘", "Z"]} disabled={!canRedo} disabledHint="Nothing to redo." onClick={redo}>
        <ArrowUUpRightIcon />
      </ToolButton>
    </div>
  );
}
