import { Absolute, CardRoot, Fit, Text } from "@/components/card/primitives";
import { mix } from "@/lib/thumbnail/color";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Launch({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const planet = 2400;
  const horizon = height * 0.8;

  return (
    <CardRoot width={width} height={height} style={style}>
      <Absolute
        style={{
          left: width / 2 - 700,
          top: horizon - 420,
          width: 1400,
          height: 700,
          background: `radial-gradient(closest-side, ${mix(p.accent, 0.55)}, ${mix(p.accent, 0.12)} 55%, transparent)`,
        }}
      />
      <Absolute
        style={{
          left: width / 2 - planet / 2,
          top: horizon,
          width: planet,
          height: planet,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 0%, ${mix(p.accent, 0.35, p.bg)}, ${p.bg} 18%)`,
          boxShadow: `0 -2px 0 0 ${mix(p.accent, 0.6, "#ffffff")}, 0 -18px 60px ${mix(p.accent, 0.7)}, inset 0 30px 80px ${mix(p.accent, 0.35)}`,
        }}
      />
      {content.site ? (
        <div style={{ position: "absolute", top: 52, left: 64, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 18, height: 18, borderRadius: 5, background: p.accent }} />
          <Text font={bodyFont} size={bodySize - 2} weight={500} color={p.muted} lines={1}>
            {content.site}
          </Text>
        </div>
      ) : null}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: `${height * 0.17}px 120px 0`, gap: 26 }}>
        {content.eyebrow ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 22px 10px 16px",
              borderRadius: 999,
              border: `1.5px solid ${mix(p.fg, 0.16)}`,
              background: mix(p.fg, 0.05),
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 10, background: p.accent, boxShadow: `0 0 12px ${p.accent}` }} />
            <Text font={bodyFont} size={bodySize} weight={500} lines={1}>
              {content.eyebrow}
            </Text>
          </div>
        ) : null}
        <div style={{ width: "100%" }}>
          <Fit text={content.title} max={style.titleSize} lines={2} font={titleFont} weight={600} lineHeight={1.04} tracking="-0.035em" textAlign="center" />
        </div>
        {content.subtitle ? (
          <div style={{ maxWidth: 820 }}>
            <Text font={bodyFont} size={bodySize + 4} color={p.muted} lines={2} style={{ textAlign: "center" }}>
              {content.subtitle}
            </Text>
          </div>
        ) : null}
      </div>
    </CardRoot>
  );
}

const dark = { bg: "#07070b", fg: "#f5f5f7", muted: "#a1a1aa" };

export const launch: TemplateDef = {
  id: "launch",
  name: "Launch",
  description: "Centered announcement over a glowing horizon.",
  category: "Product",
  fields: [
    { key: "eyebrow", label: "Badge" },
    { key: "title", label: "Headline" },
    { key: "subtitle", label: "Subtitle" },
    { key: "site", label: "Product" },
  ],
  palettes: [
    palette("cobalt", "Cobalt", { ...dark, accent: "#2f7bff" }),
    palette("ember", "Ember", { ...dark, accent: "#ff6a3d" }),
    palette("aqua", "Aqua", { ...dark, accent: "#2dd4bf" }),
    palette("lime", "Lime", { ...dark, accent: "#a3e635" }),
  ],
  defaults: { titleFont: "geist", bodyFont: "geist", titleSize: 92, bodySize: 22 },
  titleRange: [48, 140],
  bodyRange: [16, 32],
  sample: { eyebrow: "Now in public beta", title: "Share images, designed in seconds", subtitle: "21 templates, 35 typefaces and pixel-perfect exports for every link you post." },
  Component: Launch,
};
