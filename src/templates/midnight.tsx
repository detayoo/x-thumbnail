import { Part, Absolute, CardRoot, Fit, Text } from "@/components/card/primitives";
import { resolveWeight } from "@/lib/fonts";
import { mix } from "@/lib/thumbnail/color";
import { lines } from "@/lib/thumbnail/content";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Mark({ site, accent, size, font }: { site: string; accent: string; size: number; font: TemplateProps["style"]["titleFont"] }) {
  const letter = site.trim().charAt(0).toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        flexShrink: 0,
        display: "grid",
        placeItems: "center",
        background: `linear-gradient(145deg, ${mix(accent, 0.65, "#ffffff")} 0%, ${accent} 55%, ${mix(accent, 0.7, "#000000")} 100%)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 30px ${mix(accent, 0.35)}`,
        color: "#ffffff",
        fontFamily: font.family,
        fontWeight: resolveWeight(font, 700),
        fontSize: size * 0.46,
      }}
    >
      {letter}
    </div>
  );
}

function Midnight({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const panel = style.options.layout !== "lockup";
  const items = lines(content.subtitle, 4);

  return (
    <CardRoot width={width} height={height} style={style}>
      <Absolute style={{ inset: 0, background: `radial-gradient(70% 55% at 50% 0%, ${mix(p.accent, 0.16)}, transparent 70%)` }} />
      <Absolute style={{ left: 0, right: 0, top: 0, height: 1, background: `linear-gradient(90deg, transparent, ${mix(p.fg, 0.18)}, transparent)` }} />
      {panel ? (
        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 120px 0", gap: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22, maxWidth: "100%" }}>
            {content.site && !style.hidden.has("mark") ? <Part name="mark"><div><Mark site={content.site} accent={p.accent} size={56} font={titleFont} /></div></Part> : null}
            {content.site && !style.hidden.has("mark") ? <span style={{ width: 1, height: 44, background: mix(p.fg, 0.2) }} /> : null}
            <div style={{ minWidth: 0, maxWidth: 820 }}>
              <Fit field="title" text={content.title} max={style.titleSize} lines={1} font={titleFont} weight={500} lineHeight={1.1} tracking="-0.025em" balance={false} />
            </div>
          </div>
          <div
            style={{
              width: 700,
              flex: 1,
              borderRadius: "18px 18px 0 0",
              background: `linear-gradient(180deg, ${p.surface}, ${p.bg})`,
              border: `1px solid ${mix(p.fg, 0.1)}`,
              borderBottom: "none",
              boxShadow: `0 -20px 80px ${mix("#000000", 0.4)}`,
              padding: "26px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14 }}>
              <Text field="eyebrow" font={bodyFont} size={bodySize - 4} color={p.muted} lines={1}>
                {content.eyebrow}
              </Text>
              <div style={{ display: "flex", gap: 8 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: 8, height: 8, borderRadius: 8, background: mix(p.fg, 0.18) }} />
                ))}
              </div>
            </div>
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: i === 0 ? mix(p.fg, 0.06) : "transparent",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    flexShrink: 0,
                    border: `2px solid ${i === 0 ? p.accent : mix(p.fg, 0.3)}`,
                    background: i === 0 ? mix(p.accent, 0.25) : "transparent",
                  }}
                />
                <Text font={bodyFont} size={bodySize} color={i === 0 ? p.fg : p.muted} weight={i === 0 ? 500 : 400} lines={1}>
                  {item}
                </Text>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 30, padding: "0 96px" }}>
          {content.site && !style.hidden.has("mark") ? <Part name="mark"><div><Mark site={content.site} accent={p.accent} size={84} font={titleFont} /></div></Part> : null}
          {content.site && !style.hidden.has("mark") ? <span style={{ width: 1, height: 96, background: mix(p.fg, 0.2), flexShrink: 0 }} /> : null}
          <div style={{ minWidth: 0, flex: content.site ? 1 : undefined }}>
            <Fit field="title" text={content.title} max={style.titleSize + 16} lines={2} font={titleFont} weight={500} lineHeight={1.08} tracking="-0.03em" />
          </div>
        </div>
      )}
    </CardRoot>
  );
}

const night = { bg: "#0f0f11", fg: "#f4f4f5", muted: "#8a8a93", surface: "#18181b" };

export const midnight: TemplateDef = {
  id: "midnight",
  name: "Midnight",
  description: "Quiet dark product card: a mark, a hairline and the title, or a floating task panel.",
  category: "Featured",
  fields: [
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Panel items", multiline: true, hint: "One item per line, up to four." },
    { key: "eyebrow", label: "Panel label" },
    { key: "site", label: "Brand" },
  ],
  palettes: [
    palette("blue", "Blue", { ...night, accent: "#4c8dff" }),
    palette("mint", "Mint", { ...night, accent: "#3ddc97" }),
    palette("amber", "Amber", { ...night, accent: "#ffb347" }),
    palette("graphite", "Graphite", { ...night, accent: "#a1a1aa" }),
  ],
  defaults: { titleFont: "geist", bodyFont: "geist", titleSize: 56, bodySize: 22 },
  titleRange: [36, 96],
  bodyRange: [16, 28],
  options: [
    {
      key: "layout",
      label: "Layout",
      choices: [
        { label: "Panel", value: "panel" },
        { label: "Lockup", value: "lockup" },
      ],
      defaultValue: "panel",
    },
  ],
  parts: [{ key: "mark", label: "Brand mark" }],
  sample: {
    title: "Stacked releases",
    subtitle: "Ship a share image with every release\nPreview cards before you publish\nExport at 1x or 2x\nCopy meta tags in one click",
    eyebrow: "Release 2.4",
  },
  Component: Midnight,
};
