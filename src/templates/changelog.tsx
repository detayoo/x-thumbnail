import { Absolute, CardRoot, Fit, Text } from "@/components/card/primitives";
import { mix } from "@/lib/thumbnail/color";
import { lines } from "@/lib/thumbnail/content";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Changelog({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const items = lines(content.subtitle, 3);

  return (
    <CardRoot width={width} height={height} style={style}>
      <Absolute style={{ right: -260, top: -320, width: 820, height: 820, background: `radial-gradient(closest-side, ${mix(p.accent, 0.22)}, transparent)` }} />
      <Absolute style={{ left: 87, top: 150, bottom: 0, width: 2, background: `linear-gradient(${p.line}, transparent)` }} />
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: "60px 72px 56px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {content.eyebrow ? (
            <div style={{ padding: "8px 14px", borderRadius: 10, background: p.accent, color: p.accentFg }}>
              <Text font={bodyFont} size={bodySize} weight={600} lines={1}>
                {content.eyebrow}
              </Text>
            </div>
          ) : null}
          <Text font={bodyFont} size={bodySize} color={p.muted} lines={1}>
            {content.date}
          </Text>
          <div style={{ flex: 1 }} />
          <Text font={bodyFont} size={bodySize} color={p.muted} lines={1}>
            {content.site}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 34, minHeight: 0, paddingLeft: 56 }}>
          <Fit text={content.title} max={style.titleSize} lines={2} font={titleFont} weight={650} lineHeight={1.06} tracking="-0.03em" />
          {items.length ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 26,
                      flexShrink: 0,
                      marginLeft: -71,
                      marginRight: 27,
                      background: p.bg,
                      border: `3px solid ${p.accent}`,
                      boxShadow: `0 0 0 6px ${p.bg}`,
                    }}
                  />
                  <Text font={bodyFont} size={bodySize + 4} color={mix(p.fg, 0.86)} lines={1}>
                    {item}
                  </Text>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </CardRoot>
  );
}

export const changelog: TemplateDef = {
  id: "changelog",
  name: "Changelog",
  description: "Release notes: version badge, headline and up to three changes.",
  category: "Product",
  fields: [
    { key: "eyebrow", label: "Version" },
    { key: "date", label: "Date" },
    { key: "title", label: "Headline" },
    { key: "subtitle", label: "Changes", multiline: true, hint: "One change per line, up to three." },
    { key: "site", label: "Product" },
  ],
  palettes: [
    palette("graphite", "Graphite", { bg: "#0e0f12", fg: "#f4f4f5", muted: "#8b8d98", accent: "#4ade80", accentFg: "#052e16" }),
    palette("paper", "Paper", { bg: "#fbfbf9", fg: "#111111", muted: "#6b6b6b", accent: "#2563eb", accentFg: "#ffffff" }),
    palette("midnight", "Midnight", { bg: "#0b1026", fg: "#e6e9ff", muted: "#8e95c2", accent: "#f472b6", accentFg: "#2a0518" }),
    palette("sand", "Sand", { bg: "#f3efe6", fg: "#2a2118", muted: "#7a6d5d", accent: "#d9480f", accentFg: "#ffffff" }),
  ],
  defaults: { titleFont: "geist", bodyFont: "geist-mono", titleSize: 76, bodySize: 22 },
  titleRange: [44, 110],
  bodyRange: [16, 30],
  sample: {
    eyebrow: "v2.4",
    title: "Faster exports and a new font library",
    subtitle: "Exports render in under a second\n35 typefaces, from serif to mono\nShortcuts for every action",
  },
  Component: Changelog,
};
