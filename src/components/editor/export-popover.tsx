"use client";

import * as React from "react";
import { CaretDownIcon, CheckIcon, ClipboardTextIcon, CopyIcon, DownloadSimpleIcon } from "@phosphor-icons/react";

import { Popover, PopoverContent, PopoverTrigger } from "@/toolcraft/ui";
import { cn } from "@/toolcraft/ui/lib/utils";
import { useEditor } from "@/store/editor";
import { FORMATS } from "@/lib/thumbnail/formats";
import { copyMetaTags, copyPng, exportPng } from "./export-actions";
import { Hint } from "./hint";

export function ExportPopover() {
  const formatId = useEditor((s) => s.doc.formatId);
  const setFormat = useEditor((s) => s.setFormat);
  const [open, setOpen] = React.useState(false);
  const [scale, setScale] = React.useState<1 | 2>(1);
  const format = FORMATS.find((f) => f.id === formatId) ?? FORMATS[0];

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Hint label="Export" description="Pick a size and scale, then download or copy." keys={["⌘", "E"]} side="bottom">
        <PopoverTrigger
          render={
            <button
              type="button"
              className={cn(
                "ml-1.5 flex h-8 items-center gap-1.5 rounded-full bg-[color:var(--accent)] pr-2.5 pl-3.5 text-xs-plus font-medium text-white",
                "shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_6px_16px_-6px_color-mix(in_oklab,var(--accent)_80%,transparent)]",
                "transition-[filter,transform] duration-100 hover:brightness-110 active:scale-[0.97] [&_svg]:size-3.5",
              )}
              data-testid="export-button"
            />
          }
        >
          <DownloadSimpleIcon weight="bold" />
          Export
          <CaretDownIcon className="opacity-80" />
        </PopoverTrigger>
      </Hint>
      <PopoverContent side="bottom" align="end" sideOffset={8} className="w-[300px] gap-3 p-2">
        <div className="flex flex-col gap-1">
          <p className="m-0 px-1.5 pt-1 text-2xs font-medium tracking-wide text-[color:var(--muted-foreground)] uppercase">Size</p>
          <div role="radiogroup" aria-label="Export size" className="flex flex-col gap-0.5">
            {FORMATS.map((f) => {
              const active = f.id === formatId;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setFormat(f.id)}
                  className={cn(
                    "flex h-11 items-center gap-2.5 rounded-lg px-2 text-left outline-none",
                    active ? "bg-[color:color-mix(in_oklab,var(--accent)_14%,transparent)]" : "hover:bg-[color:var(--tint-5)] focus-visible:bg-[color:var(--tint-5)]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-4 shrink-0 place-items-center rounded-full border-[1.5px]",
                      active ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white" : "border-[color:var(--tint-25)]",
                    )}
                  >
                    {active ? <CheckIcon weight="bold" className="size-2.5" /> : null}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-xs-plus font-medium">{f.label}</span>
                    <span className="truncate text-2xs text-[color:var(--muted-foreground)]">{f.detail}</span>
                  </span>
                  <span className="font-mono text-2xs text-[color:var(--muted-foreground)] tabular-nums">
                    {f.width}×{f.height}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 px-1.5">
          <span className="text-xs-plus text-[color:var(--muted-foreground)]">Scale</span>
          <div className="flex items-center rounded-full bg-[color:var(--tint-5)] p-0.5" role="radiogroup" aria-label="Scale">
            {([1, 2] as const).map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={scale === s}
                onClick={() => setScale(s)}
                className={cn(
                  "h-6 rounded-full px-3 font-mono text-2xs",
                  scale === s ? "bg-[color:var(--card)] text-[color:var(--foreground)] shadow-[0_0_0_1px_var(--tint-10)]" : "text-[color:var(--muted-foreground)]",
                )}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => run(() => exportPng(scale))}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[color:var(--accent)] text-xs-plus font-medium text-white transition-[filter] hover:brightness-110 active:scale-[0.99] [&_svg]:size-4"
        >
          <DownloadSimpleIcon weight="bold" />
          Download PNG
          <span className="font-mono text-2xs opacity-75">
            {format.width * scale}×{format.height * scale}
          </span>
        </button>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => run(() => copyPng())}
            className="flex h-8 items-center justify-center gap-1.5 rounded-lg bg-[color:var(--tint-5)] text-xs-plus hover:bg-[color:var(--tint-10)] [&_svg]:size-3.5"
          >
            <CopyIcon />
            Copy image
          </button>
          <button
            type="button"
            onClick={() => run(copyMetaTags)}
            className="flex h-8 items-center justify-center gap-1.5 rounded-lg bg-[color:var(--tint-5)] text-xs-plus hover:bg-[color:var(--tint-10)] [&_svg]:size-3.5"
          >
            <ClipboardTextIcon />
            Meta tags
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
