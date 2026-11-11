"use client";

import * as React from "react";

import { PanelSurface } from "@/toolcraft/ui";
import { cn } from "@/toolcraft/ui/lib/utils";
import { useEditor } from "@/store/editor";
import { site } from "@/lib/site";
import { resolveContent } from "@/lib/thumbnail/content";
import { resolveStyle } from "@/lib/thumbnail/style";
import type { Content, StyleOverride, TemplateCategory, TemplateDef } from "@/lib/thumbnail/types";
import { TEMPLATES } from "@/templates";

const THUMB_WIDTH = 214;
const CARD = { width: 1200, height: 630 };
const CATEGORIES: TemplateCategory[] = ["Product", "Editorial", "Developer", "Graphic", "Social"];

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
  const styles = useEditor((s) => s.doc.styles);
  const localFonts = useEditor((s) => s.localFonts);
  const content = React.useDeferredValue(liveContent);
  const setTemplate = useEditor((s) => s.setTemplate);
  const listRef = React.useRef<HTMLDivElement>(null);

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
      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-2 pb-3" role="listbox" aria-label="Templates">
        {CATEGORIES.map((category) => {
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
                    className={cn(
                      "group flex flex-col gap-1.5 rounded-lg p-[7px] text-left outline-none",
                      active ? "bg-[color:color-mix(in_oklab,var(--accent)_22%,transparent)]" : "hover:bg-[color:var(--tint-5)] focus-visible:bg-[color:var(--tint-5)]",
                    )}
                  >
                    <span
                      className={cn(
                        "block rounded-[6px] ring-1 ring-[color:var(--tint-10)] transition-transform duration-150 group-active:scale-[0.98]",
                        active && "ring-2 ring-[color:var(--accent)]",
                      )}
                    >
                      <Thumbnail template={template} content={content} override={styles[template.id]} localFonts={localFonts} />
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
