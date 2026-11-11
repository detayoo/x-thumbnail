"use client";

import * as React from "react";
import { CaretLeftIcon, CaretRightIcon, CheckIcon, PaletteIcon } from "@phosphor-icons/react";

import { cn } from "@/toolcraft/ui/lib/utils";
import { useEditor } from "@/store/editor";
import { resolveContent } from "@/lib/thumbnail/content";
import { resolveStyle } from "@/lib/thumbnail/style";
import type { Content, StyleOverride, TemplateCategory, TemplateDef } from "@/lib/thumbnail/types";
import { TEMPLATES } from "@/templates";
import { Hint } from "./hint";
import { iconButton } from "./top-bar";

const THUMB_WIDTH = 176;
const CARD = { width: 1200, height: 630 };
const CATEGORIES: TemplateCategory[] = ["Featured", "YouTube", "Product", "Editorial", "Developer", "Graphic", "Social"];

const Thumbnail = React.memo(function Thumbnail({
  template,
  content,
  override,
  localFonts,
}: {
  template: TemplateDef;
  content: Partial<Content>;
  override: StyleOverride | undefined;
  localFonts: Record<string, boolean>;
}) {
  const scale = THUMB_WIDTH / CARD.width;
  const Component = template.Component;
  const resolved = React.useMemo(() => resolveContent(template, content), [template, content]);
  const style = React.useMemo(() => resolveStyle(template, override, localFonts), [template, override, localFonts]);
  return (
    <div className="relative overflow-hidden rounded-md" style={{ width: THUMB_WIDTH, height: CARD.height * scale }}>
      <div inert style={{ width: CARD.width, height: CARD.height, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
        <Component content={resolved} style={style} width={CARD.width} height={CARD.height} />
      </div>
    </div>
  );
});

export function Filmstrip() {
  const templateId = useEditor((s) => s.doc.templateId);
  const liveContent = useEditor((s) => s.doc.content);
  const styles = useEditor((s) => s.doc.styles);
  const localFonts = useEditor((s) => s.localFonts);
  const content = React.useDeferredValue(liveContent);
  const { setTemplate, stepTemplate, shufflePalette } = useEditor.getState();
  const [filter, setFilter] = React.useState<TemplateCategory | "All">("All");
  const listRef = React.useRef<HTMLDivElement>(null);

  const visible = filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === filter);
  const categories = CATEGORIES.filter((c) => TEMPLATES.some((t) => t.category === c));

  React.useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-template="${templateId}"]`)?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  }, [templateId, filter]);

  return (
    <section className="flex shrink-0 flex-col border-t bg-[color:var(--card)]" aria-label="Templates" data-testid="filmstrip">
      <div className="flex h-11 items-center gap-2 px-3">
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none]" role="tablist" aria-label="Template category">
          {(["All", ...categories] as const).map((c) => {
            const count = c === "All" ? TEMPLATES.length : TEMPLATES.filter((t) => t.category === c).length;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={cn(
                  "flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs-plus transition-colors",
                  filter === c
                    ? "border-[color:var(--accent)] bg-[color:color-mix(in_oklab,var(--accent)_12%,transparent)] text-[color:var(--foreground)]"
                    : "border-[color:var(--tint-10)] text-[color:var(--muted-foreground)] hover:border-[color:var(--tint-25)] hover:text-[color:var(--foreground)]",
                )}
              >
                {c}
                <span className="font-mono text-2xs opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <Hint label="Next palette" description="Cycle through this template's colors." keys={["P"]}>
            <button type="button" aria-label="Next palette" className={iconButton} onClick={shufflePalette}>
              <PaletteIcon />
            </button>
          </Hint>
          <Hint label="Previous template" keys={["["]}>
            <button type="button" aria-label="Previous template" className={iconButton} onClick={() => stepTemplate(-1)}>
              <CaretLeftIcon />
            </button>
          </Hint>
          <Hint label="Next template" keys={["]"]}>
            <button type="button" aria-label="Next template" className={iconButton} onClick={() => stepTemplate(1)}>
              <CaretRightIcon />
            </button>
          </Hint>
        </div>
      </div>
      <div ref={listRef} className="flex gap-3 overflow-x-auto px-3 pt-1 pb-3" role="listbox" aria-label="Templates" aria-orientation="horizontal">
        {visible.map((template) => {
          const active = template.id === templateId;
          return (
            <button
              key={template.id}
              type="button"
              role="option"
              aria-selected={active}
              data-template={template.id}
              onClick={() => setTemplate(template.id)}
              className="group flex shrink-0 flex-col gap-1.5 rounded-lg text-left outline-none"
            >
              <span
                className={cn(
                  "relative block rounded-lg p-[3px] transition-[box-shadow,transform] duration-150 group-hover:-translate-y-0.5 group-active:translate-y-0",
                  active
                    ? "shadow-[0_0_0_2px_var(--accent)]"
                    : "shadow-[0_0_0_1px_var(--tint-10)] group-hover:shadow-[0_0_0_1px_var(--tint-25)] group-focus-visible:shadow-[0_0_0_2px_var(--accent)]",
                )}
              >
                <Thumbnail template={template} content={content} override={styles[template.id]} localFonts={localFonts} />
                {active ? (
                  <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-[color:var(--accent)] text-white shadow-[0_0_0_2px_var(--card)]">
                    <CheckIcon weight="bold" className="size-3" />
                  </span>
                ) : null}
              </span>
              <span className="flex items-center justify-between gap-2 px-0.5">
                <span className={cn("truncate text-2xs", active ? "font-medium text-[color:var(--foreground)]" : "text-[color:var(--muted-foreground)] group-hover:text-[color:var(--foreground)]")}>
                  {template.name}
                </span>
                <span className="text-[10px] text-[color:var(--muted-foreground)] opacity-70">{template.category}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
