import { CardRoot, Fit, Text } from "@/components/card/primitives";
import { Photo, Sky } from "@/components/card/scenes";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Ivory({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const framed = style.options.layout === "framed";
  const meta = [content.author, content.date].filter(Boolean).join("  ·  ");

  const brand = content.site ? (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 14, height: 14, borderRadius: 14, background: p.accent }} />
      <Text field="site" font={bodyFont} size={bodySize} weight={500} lines={1}>
        {content.site}
      </Text>
    </div>
  ) : null;

  if (framed) {
    return (
      <CardRoot width={width} height={height} style={style}>
        <div style={{ flex: 1, display: "flex" }}>
          <div style={{ width: 640, display: "flex", flexDirection: "column", padding: "60px 40px 60px 72px" }}>
            {brand}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, minHeight: 0 }}>
              {content.eyebrow ? (
                <Text field="eyebrow" font={bodyFont} size={bodySize - 2} weight={500} uppercase tracking="0.14em" color={p.muted} lines={1}>
                  {content.eyebrow}
                </Text>
              ) : null}
              <Fit field="title" text={content.title} max={style.titleSize} lines={4} font={titleFont} weight={400} lineHeight={1.06} tracking="-0.02em" />
            </div>
            {meta ? (
              <Text font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
                {meta}
              </Text>
            ) : null}
          </div>
          <div style={{ position: "relative", flex: 1, margin: "48px 48px 48px 0", borderRadius: 6, overflow: "hidden" }}>
            {content.image ? <Photo src={content.image} /> : <Sky top={p.colors[1]} bottom={p.colors[2]} />}
            <div style={{ position: "absolute", left: "18%", right: "18%", top: "16%", bottom: "16%", border: `8px solid ${p.bg}`, overflow: "hidden" }}>
              {content.image ? <Photo src={content.image} focus="top" /> : <Sky top={p.colors[2]} bottom={p.colors[1]} cloud="rgba(255,255,255,0.9)" />}
            </div>
          </div>
        </div>
      </CardRoot>
    );
  }

  return (
    <CardRoot width={width} height={height} style={style}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "56px 72px" }}>
        {brand}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 24, minHeight: 0, padding: "0 40px" }}>
          {content.eyebrow ? (
            <Text field="eyebrow" font={bodyFont} size={bodySize - 2} weight={500} uppercase tracking="0.16em" color={p.muted} lines={1}>
              {content.eyebrow}
            </Text>
          ) : null}
          <div style={{ width: "100%" }}>
            <Fit field="title" text={content.title} max={style.titleSize} lines={3} font={titleFont} weight={400} lineHeight={1.06} tracking="-0.02em" textAlign="center" />
          </div>
          {content.subtitle ? (
            <div style={{ maxWidth: 780 }}>
              <Text field="subtitle" font={bodyFont} size={bodySize + 2} color={p.muted} lines={2} style={{ textAlign: "center" }}>
                {content.subtitle}
              </Text>
            </div>
          ) : null}
        </div>
        {meta ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Text font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
              {meta}
            </Text>
          </div>
        ) : null}
      </div>
    </CardRoot>
  );
}

export const ivory: TemplateDef = {
  id: "ivory",
  name: "Ivory",
  description: "Calm serif headline on a warm ivory ground, centred or beside a framed artwork.",
  category: "Featured",
  fields: [
    { key: "eyebrow", label: "Label" },
    { key: "title", label: "Headline" },
    { key: "subtitle", label: "Subtitle" },
    { key: "author", label: "Author" },
    { key: "date", label: "Date" },
    { key: "site", label: "Brand" },
    { key: "image", label: "Artwork" },
  ],
  palettes: [
    palette("ivory", "Ivory", { bg: "#f0eee6", fg: "#141413", muted: "#6b6a64", accent: "#d97757", colors: ["#d97757", "#7fa6cf", "#e9dcc6"] }),
    palette("oat", "Oat", { bg: "#e3dacc", fg: "#1f1a14", muted: "#6e6253", accent: "#b5532f", colors: ["#b5532f", "#94a9b8", "#efe2c8"] }),
    palette("slate", "Slate", { bg: "#1f1e1d", fg: "#f0eee6", muted: "#a6a39a", accent: "#d97757", colors: ["#d97757", "#4f6f93", "#c9b79c"] }),
    palette("sky", "Sky", { bg: "#e6edf3", fg: "#10202e", muted: "#55697b", accent: "#2f6fb0", colors: ["#2f6fb0", "#6f9fd8", "#f1e6d6"] }),
  ],
  defaults: { titleFont: "newsreader", bodyFont: "dm-sans", titleSize: 88, bodySize: 22 },
  titleRange: [48, 130],
  bodyRange: [16, 30],
  options: [
    {
      key: "layout",
      label: "Layout",
      choices: [
        { label: "Centred", value: "centred" },
        { label: "Framed", value: "framed" },
      ],
      defaultValue: "centred",
    },
  ],
  sample: { eyebrow: "Announcement", title: "A calmer way to design share images", subtitle: "Thoughtful defaults, generous whitespace and type that reads at any size." },
  Component: Ivory,
};
