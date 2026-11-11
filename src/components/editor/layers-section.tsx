"use client";

import { EyeIcon, EyeSlashIcon, ImageIcon, ShapesIcon, TextTIcon } from "@phosphor-icons/react";

import { PanelSection } from "@/toolcraft/ui";
import { cn } from "@/toolcraft/ui/lib/utils";
import { useEditor } from "@/store/editor";
import { useThumbnail } from "./use-thumbnail";
import { Hint } from "./hint";

export function LayersSection() {
  const { template, style } = useThumbnail();
  const selected = useEditor((s) => s.selected);
  const { select, setHidden } = useEditor.getState();
  const layers = [
    ...template.fields.map((f) => ({ key: f.key, label: f.label, kind: f.key === "image" ? "image" : "text" })),
    ...(template.parts ?? []).map((p) => ({ key: p.key, label: p.label, kind: "shape" })),
  ];

  return (
    <PanelSection title="Layers" description="Click a layer to select it on the canvas. Hide anything you don't need.">
      <ul className="m-0 flex list-none flex-col gap-px p-0" aria-label="Layers">
        {layers.map((layer) => {
          const hidden = style.hidden.has(layer.key);
          const active = selected === layer.key;
          return (
            <li key={layer.key}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => !hidden && select(active ? null : layer.key)}
                onKeyDown={(e) => e.key === "Enter" && !hidden && select(layer.key)}
                className={cn(
                  "group flex h-8 cursor-default items-center gap-2 rounded-md border px-2 text-xs-plus outline-none",
                  active ? "border-[color:var(--accent)] bg-[color:color-mix(in_oklab,var(--accent)_10%,transparent)]" : "border-transparent hover:bg-[color:var(--tint-5)]",
                )}
              >
                <span className={cn("text-[color:var(--muted-foreground)] [&_svg]:size-3.5", hidden && "opacity-40")}>
                  {layer.kind === "image" ? <ImageIcon /> : layer.kind === "shape" ? <ShapesIcon /> : <TextTIcon />}
                </span>
                <span className={cn("min-w-0 flex-1 truncate", hidden && "text-[color:var(--muted-foreground)] line-through decoration-[color:var(--tint-25)]")}>{layer.label}</span>
                <Hint label={hidden ? "Show" : "Hide"} keys={hidden ? undefined : ["⌫"]}>
                  <button
                    type="button"
                    aria-label={hidden ? `Show ${layer.label}` : `Hide ${layer.label}`}
                    aria-pressed={hidden}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHidden(layer.key, !hidden);
                    }}
                    className={cn(
                      "grid size-6 place-items-center rounded text-[color:var(--muted-foreground)] hover:bg-[color:var(--tint-10)] hover:text-[color:var(--foreground)] [&_svg]:size-3.5",
                      hidden ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                    )}
                  >
                    {hidden ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </Hint>
              </div>
            </li>
          );
        })}
      </ul>
    </PanelSection>
  );
}
