import { CardRoot, Fit, Text } from "@/components/card/primitives";
import { mix } from "@/lib/thumbnail/color";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Classic({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont } = style;
  const line = mix(p.fg, 0.2);
  const full = style.options.grid !== "border";
  const background = full
    ? `linear-gradient(to right, ${line} 3px, transparent 3px) -1.5px -1.5px / 150px 150px, linear-gradient(to bottom, ${line} 3px, transparent 3px) -1.5px -1.5px / 150px 150px, ${p.bg}`
    : p.bg;

  return (
    <CardRoot width={width} height={height} style={style} background={background}>
      {full ? null : (
        <div aria-hidden style={{ position: "absolute", inset: 80, borderLeft: `3px solid ${line}`, borderRight: `3px solid ${line}` }}>
          <div style={{ position: "absolute", left: -80, right: -80, top: 0, bottom: 0, borderTop: `3px solid ${line}`, borderBottom: `3px solid ${line}` }} />
        </div>
      )}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 100px", gap: 22 }}>
        <div style={{ maxWidth: 820 }}>
          <Fit text={content.title} max={style.titleSize} lines={4} font={titleFont} weight={700} lineHeight={1.08} tracking="-0.02em" />
        </div>
        {content.subtitle ? (
          <div style={{ maxWidth: 760 }}>
            <Text font={bodyFont} size={style.bodySize} color={p.muted} lines={2}>
              {content.subtitle}
            </Text>
          </div>
        ) : null}
      </div>
    </CardRoot>
  );
}

export const classic: TemplateDef = {
  id: "classic",
  name: "Grid",
  description: "The original x-thumbnail look: a bold mono title on a blueprint grid.",
  category: "Developer",
  fields: [
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Subtitle" },
  ],
  palettes: [
    palette("ink", "Ink", { bg: "#000000", fg: "#ffffff", accent: "#ffffff", muted: "#f4f4f4" }),
    palette("paper", "Paper", { bg: "#fafafa", fg: "#0a0a0a", accent: "#0a0a0a", muted: "#3f3f46" }),
    palette("blueprint", "Blueprint", { bg: "#0b3fa8", fg: "#ffffff", accent: "#9fd0ff", muted: "#dbe8ff" }),
  ],
  defaults: { titleFont: "geist-mono", bodyFont: "geist-mono", titleSize: 84, bodySize: 30 },
  titleRange: [40, 160],
  bodyRange: [18, 48],
  options: [
    {
      key: "grid",
      label: "Grid",
      choices: [
        { label: "Full grid", value: "full" },
        { label: "Border only", value: "border" },
      ],
      defaultValue: "full",
    },
  ],
  sample: { title: "Your side project deserves a thumbnail", subtitle: "Made in seconds, not an afternoon." },
  Component: Classic,
};
