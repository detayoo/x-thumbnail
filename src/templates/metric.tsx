import { Part, CardRoot, Fit, Text } from "@/components/card/primitives";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

const BARS = [0.22, 0.3, 0.26, 0.38, 0.34, 0.46, 0.42, 0.55, 0.5, 0.62, 0.58, 0.7, 0.66, 0.8, 0.76, 1];

function Metric({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;

  return (
    <CardRoot width={width} height={height} style={style}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "56px 72px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {content.site ? <span style={{ width: 14, height: 14, borderRadius: 14, background: p.accent }} /> : null}
            <Text field="site" font={bodyFont} size={bodySize} weight={600} lines={1}>
              {content.site}
            </Text>
          </div>
          <Text field="eyebrow" font={bodyFont} size={bodySize} color={p.muted} lines={1}>
            {content.eyebrow}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 48, minHeight: 0 }}>
          <div style={{ width: 540, flexShrink: 0 }}>
            <Fit field="stat" text={content.stat} max={style.titleSize} lines={1} font={titleFont} weight={800} lineHeight={1} tracking="-0.05em" color={p.accent} balance={false} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0, flex: 1 }}>
            <Fit field="title" text={content.title} max={52} min={30} lines={3} font={bodyFont} weight={600} lineHeight={1.12} tracking="-0.02em" />
            {content.subtitle ? (
              <Text field="subtitle" font={bodyFont} size={bodySize} color={p.muted} lines={2}>
                {content.subtitle}
              </Text>
            ) : null}
          </div>
        </div>
        {style.hidden.has("bars") ? <div style={{ height: 56 }} /> : (
        <Part name="bars">
        <div style={{ height: 96, display: "flex", alignItems: "flex-end", gap: 10 }}>
          {BARS.map((h, i) => (
            <div
              key={i}
              style={{ flex: 1, height: `${h * 100}%`, borderRadius: "8px 8px 0 0", background: i === BARS.length - 1 ? p.accent : p.line }}
            />
          ))}
        </div>
        </Part>
        )}
      </div>
    </CardRoot>
  );
}

export const metric: TemplateDef = {
  id: "metric",
  name: "Metric",
  description: "One big number with a label and a rising bar motif.",
  category: "Product",
  fields: [
    { key: "stat", label: "Number" },
    { key: "title", label: "Label" },
    { key: "subtitle", label: "Context" },
    { key: "eyebrow", label: "Period" },
    { key: "site", label: "Brand" },
  ],
  palettes: [
    palette("forest", "Forest", { bg: "#0d1f17", fg: "#eafff3", muted: "#8fb5a2", accent: "#4ade80", line: "#1f3a2d" }),
    palette("paper", "Paper", { bg: "#f6f5f1", fg: "#111111", muted: "#6b6b6b", accent: "#ff4f00", line: "#e2dfd6" }),
    palette("cobalt", "Cobalt", { bg: "#0b1b4d", fg: "#ffffff", muted: "#a9b6e3", accent: "#7dd3fc", line: "#1f3375" }),
    palette("ocean", "Ocean", { bg: "#06202b", fg: "#e8fbff", muted: "#8db8c4", accent: "#22d3ee", line: "#12394a" }),
  ],
  defaults: { titleFont: "bricolage-grotesque", bodyFont: "geist", titleSize: 260, bodySize: 24 },
  titleRange: [120, 320],
  bodyRange: [16, 32],
  parts: [{ key: "bars", label: "Bar chart" }],
  sample: {
    stat: "3.4×",
    title: "more clicks on links with a custom share image",
    subtitle: "Measured across 1,200 links shared last quarter.",
    eyebrow: "Q3 2026",
  },
  Component: Metric,
};
