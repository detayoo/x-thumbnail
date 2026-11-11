import type { Content, TemplateDef, ThumbnailDoc } from "./types";

const today = () => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date());

export const DEFAULT_CONTENT: Content = {
  eyebrow: "Field notes",
  title: "Designing share cards people actually click",
  subtitle: "Type, contrast and safe margins for Open Graph images that still read at thumbnail size.",
  author: "Ada Okafor",
  role: "Design Engineer",
  date: today(),
  site: "acme.dev",
  stat: "3.4×",
  code: `export const metadata = {\n  openGraph: {\n    images: ["/og.png"],\n  },\n};`,
  image: null,
};

export function resolveContent(template: TemplateDef, content: Partial<Content>, hidden?: readonly string[]): Content {
  const merged: Content = { ...DEFAULT_CONTENT, ...template.sample };
  for (const [key, value] of Object.entries(content) as [keyof Content, Content[keyof Content]][]) {
    if (value !== undefined) (merged as Record<string, unknown>)[key] = value;
  }
  for (const key of hidden ?? []) {
    if (key === "image") merged.image = null;
    else if (key in merged) (merged as Record<string, unknown>)[key] = "";
  }
  return merged;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function lines(text: string, max = 4) {
  return text
    .split(/\n|\s·\s|;\s*/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, max);
}

export function slug(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "thumbnail"
  );
}

const EMPTY: Partial<Content> = {};

export function contentFor(doc: Pick<ThumbnailDoc, "content" | "contents" | "syncText">, templateId: string): Partial<Content> {
  return doc.syncText ? doc.content : (doc.contents?.[templateId] ?? EMPTY);
}
