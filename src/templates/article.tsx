import { CardRoot, Fit, Monogram, Text, Part } from "@/components/card/primitives";
import { mix } from "@/lib/thumbnail/color";
import { palette } from "@/lib/thumbnail/style";
import type { Palette, TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Pattern({ kind, p }: { kind: string; p: Palette }) {
  const ink = mix(p.accentFg, 0.22);
  if (kind === "stripes") {
    return <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(135deg, ${ink} 0 3px, transparent 3px 26px)` }} />;
  }
  if (kind === "dots") {
    return <div style={{ position: "absolute", inset: 0, background: `radial-gradient(${ink} 3.5px, transparent 4px) 0 0 / 34px 34px` }} />;
  }
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {[520, 400, 280, 160].map((d) => (
        <div
          key={d}
          style={{ position: "absolute", width: d, height: d, right: 190 - d / 2, top: "50%", marginTop: -d / 2, borderRadius: "50%", border: `3px solid ${ink}` }}
        />
      ))}
      <div style={{ position: "absolute", width: 64, height: 64, right: 158, top: "50%", marginTop: -32, borderRadius: "50%", background: p.accentFg }} />
    </div>
  );
}

function Article({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const meta = [content.role, content.date].filter(Boolean).join("  ·  ");

  return (
    <CardRoot width={width} height={height} style={style}>
      {style.hidden.has("panel") ? null : (
        <Part name="panel">
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 380, background: p.accent, overflow: "hidden" }}>
            <Pattern kind={style.options.pattern} p={p} />
          </div>
        </Part>
      )}
      <div style={{ position: "relative", flex: 1, width: 820, display: "flex", flexDirection: "column", padding: "60px 72px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {content.site ? <span style={{ width: 16, height: 16, borderRadius: 4, background: p.accent }} /> : null}
          <Text field="site" font={bodyFont} size={bodySize} weight={600} lines={1}>
            {content.site}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0, gap: 20, padding: "24px 0" }}>
          {content.eyebrow ? (
            <Text field="eyebrow" font={bodyFont} size={bodySize - 2} weight={600} uppercase tracking="0.12em" color={p.accent} lines={1}>
              {content.eyebrow}
            </Text>
          ) : null}
          <Fit field="title" text={content.title} max={style.titleSize} lines={4} font={titleFont} weight={700} lineHeight={1.08} tracking="-0.03em" />
        </div>
        {content.author ? (
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Monogram name={content.author} size={60} bg={p.accent} fg={p.accentFg} font={bodyFont} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
              <Text field="author" font={bodyFont} size={bodySize + 2} weight={600} lines={1}>
                {content.author}
              </Text>
              <Text font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
                {meta}
              </Text>
            </div>
          </div>
        ) : null}
      </div>
    </CardRoot>
  );
}

const light = { bg: "#ffffff", fg: "#0f172a", muted: "#64748b", accentFg: "#ffffff" };

export const article: TemplateDef = {
  id: "article",
  name: "Article",
  description: "Blog card with author, date and a patterned color panel.",
  category: "Editorial",
  fields: [
    { key: "eyebrow", label: "Category" },
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "role", label: "Role or read time" },
    { key: "date", label: "Date" },
    { key: "site", label: "Blog name" },
  ],
  palettes: [
    palette("cobalt", "Cobalt", { ...light, accent: "#2b59ff" }),
    palette("tangerine", "Tangerine", { ...light, accent: "#ff6b1a" }),
    palette("forest", "Forest", { ...light, accent: "#13795b" }),
    palette("night", "Night", { bg: "#0b0b10", fg: "#f4f4f6", muted: "#9b9bab", accent: "#4f8cff", accentFg: "#0b0b10" }),
  ],
  defaults: { titleFont: "plus-jakarta-sans", bodyFont: "plus-jakarta-sans", titleSize: 66, bodySize: 22 },
  titleRange: [40, 96],
  bodyRange: [16, 30],
  options: [
    {
      key: "pattern",
      label: "Pattern",
      choices: [
        { label: "Rings", value: "rings" },
        { label: "Stripes", value: "stripes" },
        { label: "Dots", value: "dots" },
      ],
      defaultValue: "rings",
    },
  ],
  parts: [{ key: "panel", label: "Pattern panel" }],
  sample: { eyebrow: "Accessibility", title: "A field guide to colour contrast that passes", role: "6 min read", author: "Kemi Adeyemi", site: "Pixel Notes" },
  Component: Article,
};
