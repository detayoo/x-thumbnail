"use client";

import {
  ArrowCounterClockwiseIcon,
  EyeSlashIcon,
  ImageIcon,
  ShapesIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextTIcon,
  XIcon,
} from "@phosphor-icons/react";

import { cn } from "@/toolcraft/ui/lib/utils";
import { useEditor } from "@/store/editor";
import type { TextAlign } from "@/lib/thumbnail/types";
import { useThumbnail } from "./use-thumbnail";
import { Hint } from "./hint";

const button =
  "grid size-7 place-items-center rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--tint-8)] hover:text-[color:var(--foreground)] aria-pressed:bg-[color:color-mix(in_oklab,var(--accent)_18%,transparent)] aria-pressed:text-[color:var(--accent)] [&_svg]:size-4";

const ALIGNS: { value: TextAlign; label: string; icon: React.ReactNode }[] = [
  { value: "left", label: "Align left", icon: <TextAlignLeftIcon /> },
  { value: "center", label: "Align centre", icon: <TextAlignCenterIcon /> },
  { value: "right", label: "Align right", icon: <TextAlignRightIcon /> },
];

export function SelectionBar() {
  const selected = useEditor((s) => s.selected);
  const { template, style } = useThumbnail();
  const { setElement, setHidden, select } = useEditor.getState();
  if (!selected) return null;
  const field = template.fields.find((f) => f.key === selected);
  const part = template.parts?.find((p) => p.key === selected);
  if (!field && !part) return null;
  const isText = field && field.key !== "image";
  const layout = style.layout[selected];
  const moved = Boolean(layout?.x || layout?.y);

  return (
    <div
      className="toolcraft-panel-surface floating-popup-surface pointer-events-auto absolute top-3 left-1/2 z-10 flex h-10 -translate-x-1/2 items-center gap-0.5 rounded-xl border px-1.5 shadow-xl"
      role="toolbar"
      aria-label="Selected element"
      onClick={(e) => e.stopPropagation()}
      data-testid="selection-bar"
    >
      <span className="flex items-center gap-1.5 pr-1.5 pl-1 text-xs-plus font-medium">
        <span className="text-[color:var(--accent)] [&_svg]:size-3.5">{part ? <ShapesIcon /> : field?.key === "image" ? <ImageIcon /> : <TextTIcon />}</span>
        {field?.label ?? part?.label}
      </span>
      {isText ? (
        <>
          <div className="mx-1 h-4 w-px bg-[color:var(--tint-12)]" />
          {ALIGNS.map((a) => (
            <Hint key={a.value} label={a.label} side="bottom">
              <button
                type="button"
                aria-label={a.label}
                aria-pressed={layout?.align === a.value}
                className={button}
                onClick={() => setElement(selected, { align: layout?.align === a.value ? undefined : a.value })}
              >
                {a.icon}
              </button>
            </Hint>
          ))}
        </>
      ) : null}
      <div className="mx-1 h-4 w-px bg-[color:var(--tint-12)]" />
      <Hint label="Reset position and alignment" description="Drag to move. Arrow keys nudge, Shift for 10px." side="bottom">
        <button type="button" aria-label="Reset position" aria-disabled={!layout || undefined} className={cn(button, !layout && "opacity-35")} onClick={() => layout && setElement(selected, null)}>
          <ArrowCounterClockwiseIcon />
        </button>
      </Hint>
      <Hint label="Hide" keys={["⌫"]} side="bottom">
        <button type="button" aria-label="Hide element" className={button} onClick={() => setHidden(selected, true)}>
          <EyeSlashIcon />
        </button>
      </Hint>
      <Hint label="Deselect" keys={["Esc"]} side="bottom">
        <button type="button" aria-label="Deselect" className={button} onClick={() => select(null)}>
          <XIcon />
        </button>
      </Hint>
      {moved ? <span className="pr-1 pl-1.5 font-mono text-2xs text-[color:var(--muted-foreground)] tabular-nums">{`${layout?.x ?? 0}, ${layout?.y ?? 0}`}</span> : null}
    </div>
  );
}
