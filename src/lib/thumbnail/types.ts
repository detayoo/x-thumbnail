import type * as React from "react";

import type { FontDef } from "@/lib/fonts";

export type TextKey = "eyebrow" | "title" | "subtitle" | "author" | "role" | "date" | "site" | "stat" | "code";

export type Content = Record<TextKey, string> & { image: string | null };

export type FieldSpec = {
  key: TextKey | "image";
  label: string;
  multiline?: boolean;
  hint?: string;
};

export type Palette = {
  id: string;
  name: string;
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accentFg: string;
  surface: string;
  line: string;
  colors: readonly string[];
};

export type OptionDef = {
  key: string;
  label: string;
  choices: readonly { label: string; value: string }[];
  defaultValue: string;
};

export type TemplateCategory = "Featured" | "YouTube" | "Announcement" | "Developer" | "Product" | "Editorial" | "Graphic" | "Social";

export type TemplateDefaults = {
  titleFont: string;
  bodyFont: string;
  titleSize: number;
  bodySize: number;
};

export type StyleOverride = Partial<TemplateDefaults> & {
  paletteId?: string;
  accent?: string;
  options?: Record<string, string>;
  hidden?: string[];
  layout?: Record<string, ElementLayout>;
};

export type TextAlign = "left" | "center" | "right";

export type ElementLayout = { x?: number; y?: number; align?: TextAlign };

export type PartSpec = { key: string; label: string };

export type ResolvedStyle = {
  titleFont: FontDef;
  bodyFont: FontDef;
  titleSize: number;
  bodySize: number;
  palette: Palette;
  options: Record<string, string>;
  hidden: ReadonlySet<string>;
  layout: Readonly<Record<string, ElementLayout>>;
};

export type TemplateProps = {
  content: Content;
  style: ResolvedStyle;
  width: number;
  height: number;
};

export type TemplateDef = {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  fields: readonly FieldSpec[];
  palettes: readonly Palette[];
  defaults: TemplateDefaults;
  titleRange: readonly [number, number];
  bodyRange: readonly [number, number];
  options?: readonly OptionDef[];
  parts?: readonly PartSpec[];
  sample?: Partial<Content>;
  preferredFormat?: FormatId;
  Component: React.ComponentType<TemplateProps>;
};

export type FormatId = "og" | "x" | "linkedin" | "youtube";

export type Format = {
  id: FormatId;
  label: string;
  short: string;
  width: number;
  height: number;
  ratio: string;
  detail: string;
};

export type ThumbnailDoc = {
  templateId: string;
  formatId: FormatId;
  content: Partial<Content>;
  contents: Record<string, Partial<Content>>;
  syncText: boolean;
  styles: Record<string, StyleOverride>;
};
