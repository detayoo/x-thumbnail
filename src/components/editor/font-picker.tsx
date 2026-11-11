"use client";

import * as React from "react";
import { CaretDownIcon, CheckIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";

import { ControlFieldLabel, Field, Popover, PopoverContent, PopoverTrigger } from "@/toolcraft/ui";
import { cn } from "@/toolcraft/ui/lib/utils";
import { FONT_CATEGORIES, FONTS, getFont, resolveWeight, type FontCategory } from "@/lib/fonts";
import { useEditor } from "@/store/editor";

type Filter = "all" | FontCategory;

export function FontPicker({ name, value, onChange }: { name: string; value: string; onChange: (id: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<Filter>("all");
  const localFonts = useEditor((s) => s.localFonts);
  const selected = getFont(value);
  const listRef = React.useRef<HTMLDivElement>(null);

  const available = FONTS.filter((f) => !f.local || localFonts[f.id]);
  const q = query.trim().toLowerCase();
  const visible = available.filter((f) => (filter === "all" || f.category === filter) && (!q || f.label.toLowerCase().includes(q)));
  const groups = FONT_CATEGORIES.map((c) => ({ ...c, fonts: visible.filter((f) => f.category === c.id) })).filter((g) => g.fonts.length);

  React.useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => listRef.current?.querySelector<HTMLElement>("[data-selected]")?.scrollIntoView({ block: "center" }));
    return () => cancelAnimationFrame(id);
  }, [open]);

  return (
    <Field className="min-w-0 gap-2">
      <ControlFieldLabel>{name}</ControlFieldLabel>
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery("");
        }}
      >
        <PopoverTrigger
          render={
            <button
              type="button"
              aria-label={`${name}: ${selected.label}`}
              className={cn(
                "flex h-8 w-full min-w-0 items-center justify-between gap-2 rounded-md bg-[color:var(--tint-5)] px-2 text-left outline-none",
                "hover:bg-[color:var(--tint-8)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
              )}
            />
          }
        >
          <span className="truncate text-[15px] leading-none" style={{ fontFamily: selected.family, fontWeight: resolveWeight(selected, 500) }}>
            {selected.label}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-2xs text-[color:var(--muted-foreground)]">
            {selected.local ? "Local" : FONT_CATEGORIES.find((c) => c.id === selected.category)?.label}
            <CaretDownIcon className="size-3" />
          </span>
        </PopoverTrigger>
        <PopoverContent side="left" align="start" sideOffset={14} className="w-[288px] gap-2 p-1.5">
          <label className="flex h-8 items-center gap-2 rounded-md bg-[color:var(--tint-5)] px-2">
            <MagnifyingGlassIcon className="size-3.5 shrink-0 text-[color:var(--muted-foreground)]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${available.length} typefaces…`}
              aria-label="Search typefaces"
              className="min-w-0 flex-1 bg-transparent text-xs-plus outline-none placeholder:text-[color:var(--muted-foreground)]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && visible[0]) {
                  onChange(visible[0].id);
                  setOpen(false);
                }
              }}
            />
          </label>
          <div className="flex gap-0.5" role="tablist" aria-label="Font category">
            {(["all", ...FONT_CATEGORIES.map((c) => c.id)] as Filter[]).map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={filter === id}
                onClick={() => setFilter(id)}
                className={cn(
                  "h-6 flex-1 rounded-md text-2xs text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
                  filter === id && "bg-[color:var(--tint-10)] text-[color:var(--foreground)]",
                )}
              >
                {id === "all" ? "All" : FONT_CATEGORIES.find((c) => c.id === id)?.label}
              </button>
            ))}
          </div>
          <div ref={listRef} className="-mx-1.5 max-h-[min(420px,60vh)] overflow-y-auto px-1.5 pb-1" role="listbox" aria-label={name}>
            {groups.length === 0 ? <p className="m-0 px-2 py-6 text-center text-2xs text-[color:var(--muted-foreground)]">No typeface matches “{query}”.</p> : null}
            {groups.map((group) => (
              <div key={group.id} className="flex flex-col">
                <p className="m-0 px-2 pt-2.5 pb-1 text-2xs font-medium tracking-wide text-[color:var(--muted-foreground)] uppercase">{group.label}</p>
                {group.fonts.map((font) => {
                  const active = font.id === selected.id;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      role="option"
                      aria-selected={active}
                      data-selected={active ? "" : undefined}
                      onClick={() => {
                        onChange(font.id);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex h-9 shrink-0 items-center justify-between gap-2 rounded-md px-2 text-left outline-none",
                        "hover:bg-[color:var(--tint-8)] focus-visible:bg-[color:var(--tint-8)]",
                        active && "bg-[color:color-mix(in_oklab,var(--accent)_22%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--accent)_28%,transparent)]",
                      )}
                    >
                      <span className="truncate text-[17px] leading-none" style={{ fontFamily: font.family, fontWeight: resolveWeight(font, 500) }}>
                        {font.label}
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5 text-2xs text-[color:var(--muted-foreground)]">
                        {font.local ? "Local" : null}
                        {active ? <CheckIcon className="size-3.5 text-[color:var(--foreground)]" /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
