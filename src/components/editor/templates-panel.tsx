"use client";

import * as React from "react";

import { CheckIcon } from "@phosphor-icons/react";

import { PanelSurface } from "@/toolcraft/ui";
import { cn } from "@/toolcraft/ui/lib/utils";
import { useEditor } from "@/store/editor";
import { site } from "@/lib/site";
import { contentFor, resolveContent } from "@/lib/thumbnail/content";
import { resolveStyle } from "@/lib/thumbnail/style";
import type { Content, StyleOverride, TemplateCategory, TemplateDef } from "@/lib/thumbnail/types";
import { TEMPLATES } from "@/templates";

const THUMB_WIDTH = 210;
const CARD = { width: 1200, height: 630 };
const CATEGORIES: TemplateCategory[] = ["Featured", "YouTube", "Announcement", "Developer", "Product", "Editorial", "Graphic", "Social"];

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
  const resolved = React.useMemo(() => resolveContent(template, content, override?.hidden), [template, content, override]);
  const style = React.useMemo(() => resolveStyle(template, override, localFonts), [template, override, localFonts]);
  return (
    <div className="relative overflow-hidden rounded-[5px]" style={{ width: THUMB_WIDTH, height: CARD.height * scale }}>
      <div inert style={{ width: CARD.width, height: CARD.height, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
        <Component content={resolved} style={style} width={CARD.width} height={CARD.height} />
      </div>
    </div>
  );
});

export function TemplatesPanel() {
  const templateId = useEditor((s) => s.doc.templateId);
  const liveContent = useEditor((s) => s.doc.content);
  const liveContents = useEditor((s) => s.doc.contents);
  const syncText = useEditor((s) => s.doc.syncText);
  const contents = React.useDeferredValue(liveContents);
  const styles = useEditor((s) => s.doc.styles);
  const localFonts = useEditor((s) => s.localFonts);
  const content = React.useDeferredValue(liveContent);
  const setTemplate = useEditor((s) => s.setTemplate);
  const listRef = React.useRef<HTMLDivElement>(null);
  const [filter, setFilter] = React.useState<TemplateCategory | "All">("All");
  const shown = CATEGORIES.filter((c) => (filter === "All" || filter === c) && TEMPLATES.some((t) => t.category === c));

  React.useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-template="${templateId}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [templateId]);

  return (
    <PanelSurface className="pointer-events-auto absolute top-3 bottom-3 left-3 hidden w-[248px] flex-col overflow-hidden rounded-lg md:flex">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b px-3">
        <svg aria-hidden viewBox="0 0 32 32" className="size-5 shrink-0">
          <rect width="32" height="32" rx="6" fill="currentColor" />
          <rect x="6" y="6" width="20" height="20" rx="2" fill="none" stroke="var(--card)" strokeWidth="1.8" />
          <path d="M6 13h20M6 19h20M13 6v20M19 6v20" stroke="var(--card)" strokeWidth="1" opacity="0.5" />
        </svg>
        <div className="min-w-0">
          <p className="m-0 truncate text-xs-plus font-semibold">{site.name}</p>
          <p className="m-0 truncate text-2xs text-[color:var(--muted-foreground)]">Share images · auto-saved</p>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-1 border-b px-2.5 py-2" role="tablist" aria-label="Template category">
        {(["All", ...CATEGORIES.filter((c) => TEMPLATES.some((t) => t.category === c))] as const).map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c)}
            className={cn(
              "h-6 rounded-full border px-2.5 text-2xs transition-colors",
              filter === c
                ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
                : "border-[color:var(--tint-10)] text-[color:var(--muted-foreground)] hover:border-[color:var(--tint-25)] hover:text-[color:var(--foreground)]",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-2 pb-3" role="listbox" aria-label="Templates">
        {shown.map((category) => {
          const items = TEMPLATES.filter((t) => t.category === category);
          if (!items.length) return null;
          return (
            <div key={category} className="flex flex-col gap-1">
              <p className="m-0 px-1.5 pt-3 pb-1 text-2xs font-medium tracking-wide text-[color:var(--muted-foreground)] uppercase">{category}</p>
              {items.map((template) => {
                const active = template.id === templateId;
                return (
                  <button
                    key={template.id}
                    type="button"
                    role="option"
                    aria-selected={active}
                    data-template={template.id}
                    onClick={() => setTemplate(template.id)}
                    className="group flex flex-col gap-1.5 rounded-lg p-[7px] text-left outline-none"
                  >
                    <span
                      className={cn(
                        "relative block rounded-[7px] p-[2px] transition-[box-shadow,transform] duration-150 group-hover:-translate-y-px group-active:translate-y-0",
                        active
                          ? "shadow-[0_0_0_2px_var(--accent)]"
                          : "shadow-[0_0_0_1px_var(--tint-10)] group-hover:shadow-[0_0_0_1px_var(--tint-25)] group-focus-visible:shadow-[0_0_0_2px_var(--accent)]",
                      )}
                    >
                      <Thumbnail template={template} content={contentFor({ content, contents, syncText }, template.id)} override={styles[template.id]} localFonts={localFonts} />
                      {active ? (
                        <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-[color:var(--accent)] text-white shadow-[0_0_0_2px_var(--card)]">
                          <CheckIcon weight="bold" className="size-3" />
                        </span>
                      ) : null}
                    </span>
                    <span className="flex items-baseline justify-between gap-2 px-0.5">
                      <span className={cn("truncate text-xs-plus", active ? "font-medium" : "text-[color:var(--muted-foreground)] group-hover:text-[color:var(--foreground)]")}>
                        {template.name}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex shrink-0 flex-col gap-1.5 border-t px-3 py-2.5 text-2xs leading-relaxed text-[color:var(--muted-foreground)]">
        <p className="m-0">Press [ and ] to flip through templates.</p>
        <a
          href={site.author.url}
          target="_blank"
          rel="author noopener"
          className="w-fit text-[color:var(--muted-foreground)] underline decoration-[color:var(--tint-25)] underline-offset-2 hover:text-[color:var(--foreground)]"
        >
          Made by {site.author.name} ↗
        </a>
      </div>
    </PanelSurface>
  );
}
