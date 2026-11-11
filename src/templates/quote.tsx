import { Absolute, CardRoot, Fit, Monogram, Text } from "@/components/card/primitives";
import { resolveWeight } from "@/lib/fonts";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Quote({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;

  return (
    <CardRoot width={width} height={height} style={style}>
      <Absolute
        style={{
          left: 58,
          top: -18,
          fontFamily: titleFont.family,
          fontWeight: resolveWeight(titleFont, 700),
          fontSize: 300,
          lineHeight: 1,
          color: p.accent,
        }}
      >
        {"“"}
      </Absolute>
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: "150px 80px 60px 80px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, paddingBottom: 36 }}>
          <Fit
            field="title" text={content.title}
            max={style.titleSize}
            fill
            align="center"
            font={titleFont}
            weight={400}
            italic={style.options.italic !== "off"}
            lineHeight={1.14}
            tracking="-0.015em"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {content.author ? <Monogram name={content.author} size={58} bg={p.accent} fg={p.accentFg} font={bodyFont} /> : null}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0, flex: 1 }}>
            <Text field="author" font={bodyFont} size={bodySize + 2} weight={600} lines={1}>
              {content.author}
            </Text>
            <Text field="role" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
              {content.role}
            </Text>
          </div>
          <Text field="site" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
            {content.site}
          </Text>
        </div>
      </div>
    </CardRoot>
  );
}

export const quote: TemplateDef = {
  id: "quote",
  name: "Quote",
  description: "A pull quote with attribution, for testimonials and talks.",
  category: "Social",
  fields: [
    { key: "title", label: "Quote", multiline: true },
    { key: "author", label: "Name" },
    { key: "role", label: "Role" },
    { key: "site", label: "Site or handle" },
  ],
  palettes: [
    palette("cream", "Cream", { bg: "#f5efe3", fg: "#1f1b16", muted: "#6f665a", accent: "#c2410c", accentFg: "#fff7ed" }),
    palette("ink", "Ink", { bg: "#121212", fg: "#f5f3ee", muted: "#a3a3a3", accent: "#facc15", accentFg: "#1a1500" }),
    palette("sky", "Sky", { bg: "#e3eefb", fg: "#0d2340", muted: "#4a6584", accent: "#2054d2", accentFg: "#ffffff" }),
    palette("mint", "Mint", { bg: "#e2f3ea", fg: "#0f2e22", muted: "#4b6b5d", accent: "#0f9d6a", accentFg: "#ffffff" }),
  ],
  defaults: { titleFont: "newsreader", bodyFont: "geist", titleSize: 68, bodySize: 22 },
  titleRange: [36, 110],
  bodyRange: [16, 30],
  options: [
    {
      key: "italic",
      label: "Quote",
      choices: [
        { label: "Italic", value: "on" },
        { label: "Roman", value: "off" },
      ],
      defaultValue: "on",
    },
  ],
  sample: { title: "The best share card is the one you can read from across the room.", site: "@acme" },
  Component: Quote,
};
