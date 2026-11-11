import { CardRoot, Fit, Text } from "@/components/card/primitives";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Editorial({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const meta = [content.author, content.date].filter(Boolean).join("  ·  ");

  return (
    <CardRoot width={width} height={height} style={style}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "60px 72px 56px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, paddingBottom: 22, borderBottom: `2px solid ${p.fg}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
            {content.eyebrow ? <span style={{ width: 12, height: 12, borderRadius: 12, background: p.accent, flexShrink: 0 }} /> : null}
            <Text field="eyebrow" font={bodyFont} size={bodySize} weight={600} uppercase tracking="0.14em" lines={1}>
              {content.eyebrow}
            </Text>
          </div>
          <Text field="site" font={bodyFont} size={bodySize} color={p.muted} lines={1}>
            {content.site}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, padding: "28px 0 30px" }}>
          <Fit
            field="title" text={content.title}
            max={style.titleSize}
            fill
            align="end"
            font={titleFont}
            weight={400}
            italic={style.options.italic === "on"}
            lineHeight={0.98}
            tracking="-0.025em"
          />
        </div>
        {meta ? (
          <div style={{ paddingTop: 20, borderTop: `1px solid ${p.line}`, display: "flex", justifyContent: "space-between", gap: 24 }}>
            <Text font={bodyFont} size={bodySize} color={p.muted} lines={1}>
              {meta}
            </Text>
            <Text field="role" font={bodyFont} size={bodySize} color={p.muted} lines={1}>
              {content.role}
            </Text>
          </div>
        ) : null}
      </div>
    </CardRoot>
  );
}

export const editorial: TemplateDef = {
  id: "editorial",
  name: "Editorial",
  description: "Magazine-style serif headline between hairline rules.",
  category: "Editorial",
  fields: [
    { key: "eyebrow", label: "Section" },
    { key: "title", label: "Headline" },
    { key: "author", label: "Author" },
    { key: "role", label: "Role" },
    { key: "date", label: "Date" },
    { key: "site", label: "Site" },
  ],
  palettes: [
    palette("paper", "Paper", { bg: "#f3eee4", fg: "#191613", accent: "#b4532a", muted: "#5f574d" }),
    palette("night", "Night", { bg: "#121110", fg: "#f1ece2", accent: "#e3b04b", muted: "#a8a196" }),
    palette("sage", "Sage", { bg: "#dde4d3", fg: "#1d2a1f", accent: "#3f6b45", muted: "#4d5b4f" }),
    palette("rose", "Rose", { bg: "#f4ddd5", fg: "#3a1a14", accent: "#b33a2a", muted: "#7a4a40" }),
  ],
  defaults: { titleFont: "instrument-serif", bodyFont: "geist", titleSize: 128, bodySize: 22 },
  titleRange: [56, 180],
  bodyRange: [16, 32],
  options: [
    {
      key: "italic",
      label: "Headline",
      choices: [
        { label: "Roman", value: "off" },
        { label: "Italic", value: "on" },
      ],
      defaultValue: "off",
    },
  ],
  sample: { eyebrow: "Essay", title: "The quiet craft of making things that last", author: "Ada Okafor", role: "Contributing editor", site: "longform.press" },
  Component: Editorial,
};
