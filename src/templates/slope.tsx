import { Absolute, CardRoot, Fit, Text, Part } from "@/components/card/primitives";
import { mix } from "@/lib/thumbnail/color";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Slope({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const [c0, c1, c2, c3] = p.colors;
  const band = `radial-gradient(40% 120% at 10% 90%, ${c0}, transparent 70%), radial-gradient(35% 140% at 40% 100%, ${c1}, transparent 70%), radial-gradient(35% 120% at 70% 80%, ${c2}, transparent 70%), radial-gradient(40% 140% at 100% 60%, ${c3}, transparent 70%), linear-gradient(100deg, ${c0}, ${c1}, ${c2}, ${c3})`;

  return (
    <CardRoot width={width} height={height} style={style}>
      {style.hidden.has("band") ? null : (
        <Part name="band">
          <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0% 92%, 100% 52%, 100% 100%, 0% 100%)" }}>
            <div style={{ position: "absolute", inset: -40, background: band, filter: "blur(18px)" }} />
          </div>
        </Part>
      )}
      <Absolute style={{ left: 28, top: 0, bottom: 0, width: 1, background: mix(p.fg, 0.07) }} />
      <Absolute style={{ right: 28, top: 0, bottom: 0, width: 1, background: mix(p.fg, 0.07) }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 34, padding: `${height * 0.15}px 110px 0` }}>
        {content.site || content.eyebrow ? (
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <Text field="site" font={titleFont} size={36} weight={700} tracking="-0.03em" lines={1}>
              {content.site}
            </Text>
            {content.site && content.eyebrow ? <span style={{ width: 2, height: 36, background: mix(p.fg, 0.18) }} /> : null}
            <Text field="eyebrow" font={titleFont} size={34} weight={500} color={p.muted} lines={1}>
              {content.eyebrow}
            </Text>
          </div>
        ) : null}
        <div style={{ width: "100%" }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={2} font={titleFont} weight={700} lineHeight={1.06} tracking="-0.035em" textAlign="center" />
        </div>
        {content.subtitle ? (
          <div style={{ maxWidth: 820 }}>
            <Text field="subtitle" font={bodyFont} size={bodySize + 2} color={p.muted} lines={2} style={{ textAlign: "center" }}>
              {content.subtitle}
            </Text>
          </div>
        ) : null}
      </div>
    </CardRoot>
  );
}

export const slope: TemplateDef = {
  id: "slope",
  name: "Slope",
  description: "Bright brand lockup with a soft multicolour band sloping across the bottom.",
  category: "Featured",
  fields: [
    { key: "site", label: "Brand" },
    { key: "eyebrow", label: "Section" },
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Subtitle" },
  ],
  palettes: [
    palette("dawn", "Dawn", { bg: "#f6f9fc", fg: "#0b1f3a", muted: "#5b6b82", accent: "#2f6bff", colors: ["#7fb2ff", "#ffcf70", "#ff8fa3", "#6fe0cc"] }),
    palette("mint", "Mint", { bg: "#f4fbf8", fg: "#0c2a24", muted: "#557068", accent: "#14b8a6", colors: ["#6fe0cc", "#9ad0ff", "#c7f59a", "#ffe08a"] }),
    palette("sunset", "Sunset", { bg: "#fff8f3", fg: "#2a1508", muted: "#7a5a46", accent: "#ff6b3d", colors: ["#ff9a76", "#ffd36e", "#ff7aa8", "#7fc8ff"] }),
    palette("night", "Night", { bg: "#0b1220", fg: "#f1f5ff", muted: "#93a1bd", accent: "#5aa9ff", colors: ["#3b82f6", "#22d3ee", "#f59e0b", "#f472b6"] }),
  ],
  defaults: { titleFont: "plus-jakarta-sans", bodyFont: "plus-jakarta-sans", titleSize: 72, bodySize: 22 },
  titleRange: [44, 104],
  bodyRange: [16, 30],
  parts: [{ key: "band", label: "Colour band" }],
  sample: { site: "acme", eyebrow: "Blog", title: "How we cut checkout time in half", subtitle: "" },
  Component: Slope,
};
