import { getFont, LOCAL_FONT_SUBSTITUTES } from "@/lib/fonts";
import type { Palette, ResolvedStyle, StyleOverride, TemplateDef } from "./types";

type PaletteInput = Pick<Palette, "bg" | "fg" | "accent"> & Partial<Omit<Palette, "id" | "name">>;

export function palette(id: string, name: string, p: PaletteInput): Palette {
  return {
    id,
    name,
    bg: p.bg,
    fg: p.fg,
    accent: p.accent,
    muted: p.muted ?? `color-mix(in oklab, ${p.fg} 62%, ${p.bg})`,
    accentFg: p.accentFg ?? p.bg,
    surface: p.surface ?? `color-mix(in oklab, ${p.fg} 6%, ${p.bg})`,
    line: p.line ?? `color-mix(in oklab, ${p.fg} 16%, ${p.bg})`,
    colors: p.colors ?? [p.accent],
  };
}

function availableFont(id: string, localFonts: Record<string, boolean>) {
  const font = getFont(id);
  if (font.local && !localFonts[font.id]) return getFont(LOCAL_FONT_SUBSTITUTES[font.id]);
  return font;
}

export function resolveStyle(template: TemplateDef, override: StyleOverride | undefined, localFonts: Record<string, boolean>): ResolvedStyle {
  const o = override ?? {};
  const base = template.palettes.find((p) => p.id === o.paletteId) ?? template.palettes[0];
  const options: Record<string, string> = {};
  for (const opt of template.options ?? []) options[opt.key] = o.options?.[opt.key] ?? opt.defaultValue;
  return {
    titleFont: availableFont(o.titleFont ?? template.defaults.titleFont, localFonts),
    bodyFont: availableFont(o.bodyFont ?? template.defaults.bodyFont, localFonts),
    titleSize: o.titleSize ?? template.defaults.titleSize,
    bodySize: o.bodySize ?? template.defaults.bodySize,
    palette: o.accent ? { ...base, accent: o.accent, colors: [o.accent, ...base.colors.slice(1)] } : base,
    options,
    hidden: new Set(o.hidden ?? []),
    layout: o.layout ?? {},
    image: o.image ?? {},
  };
}
