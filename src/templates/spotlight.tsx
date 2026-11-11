import { Absolute, CardRoot, Fit, Grain, Text } from "@/components/card/primitives";
import { resolveWeight } from "@/lib/fonts";
import { mix } from "@/lib/thumbnail/color";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";
import { highlight } from "./code";

function Spotlight({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const letter = content.site.trim().charAt(0).toUpperCase();
  const codeLines = content.code.split("\n").slice(0, 10);

  return (
    <CardRoot width={width} height={height} style={style}>
      <Absolute style={{ inset: 0, background: `radial-gradient(60% 70% at 50% -12%, ${mix(p.accent, 0.3)}, transparent 70%)` }} />
      <Grain opacity={0.35} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 48, gap: 26 }}>
        {letter ? (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "grid",
              placeItems: "center",
              background: `linear-gradient(180deg, ${mix(p.fg, 0.14)}, ${mix(p.fg, 0.04)})`,
              border: `1px solid ${mix(p.fg, 0.18)}`,
              boxShadow: `inset 0 1px 0 ${mix(p.fg, 0.2)}, 0 12px 30px ${mix("#000000", 0.4)}`,
              fontFamily: titleFont.family,
              fontWeight: resolveWeight(titleFont, 600),
              fontSize: 30,
              color: p.fg,
            }}
          >
            {letter}
          </div>
        ) : null}
        <div style={{ width: 960 }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={1} font={titleFont} weight={400} lineHeight={1.1} tracking="-0.02em" textAlign="center" balance={false} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: (width - 880) / 2,
          width: 880,
          top: height * 0.5,
          bottom: -40,
          borderRadius: 18,
          background: `linear-gradient(180deg, ${p.surface}, ${p.bg})`,
          border: `1px solid ${mix(p.fg, 0.12)}`,
          boxShadow: `0 -10px 60px ${mix(p.accent, 0.12)}`,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderBottom: `1px solid ${mix(p.fg, 0.08)}` }}>
          {content.eyebrow ? (
            <div style={{ padding: "6px 12px", borderRadius: 8, background: mix(p.fg, 0.1) }}>
              <Text field="eyebrow" font={bodyFont} size={16} color={p.fg} lines={1}>
                {content.eyebrow}
              </Text>
            </div>
          ) : null}
          {[64, 48, 72, 56].map((w, i) => (
            <span key={i} style={{ width: w, height: 10, borderRadius: 10, background: mix(p.fg, 0.08) }} />
          ))}
        </div>
        <div style={{ display: "flex", padding: "18px 0" }}>
          <div style={{ width: 64, textAlign: "right", paddingRight: 22, flexShrink: 0 }}>
            {codeLines.map((_, i) => (
              <div key={i} style={{ fontFamily: bodyFont.family, fontSize: bodySize - 2, lineHeight: 1.7, color: mix(p.fg, 0.28) }}>
                {i + 1}
              </div>
            ))}
          </div>
          <pre style={{ margin: 0, fontFamily: bodyFont.family, fontWeight: resolveWeight(bodyFont, 400), fontSize: bodySize - 2, lineHeight: 1.7, color: p.fg, whiteSpace: "pre", overflow: "hidden" }}>
            {highlight(codeLines.join("\n"), p)}
          </pre>
        </div>
      </div>
      <Absolute style={{ left: 0, right: 0, bottom: 0, height: 120, background: `linear-gradient(transparent, ${p.bg})` }} />
    </CardRoot>
  );
}

export const spotlight: TemplateDef = {
  id: "spotlight",
  name: "Spotlight",
  description: "Developer launch card: soft spotlight, app tile, display title and a code window rising from the edge.",
  category: "Featured",
  fields: [
    { key: "title", label: "Title" },
    { key: "code", label: "Code", multiline: true },
    { key: "eyebrow", label: "Tab label" },
    { key: "site", label: "Brand", hint: "Its first letter goes in the app tile." },
  ],
  palettes: [
    palette("mono", "Mono", { bg: "#0a0a0a", fg: "#f2f2f2", muted: "#7a7a7a", surface: "#141414", accent: "#ffffff", colors: ["#9ecbff", "#c3e88d", "#f78c6c"] }),
    palette("ocean", "Ocean", { bg: "#06121f", fg: "#e8f2ff", muted: "#7891ad", surface: "#0b1b2e", accent: "#5aa9ff", colors: ["#5aa9ff", "#7ee2b8", "#ffb86b"] }),
    palette("ember", "Ember", { bg: "#140b07", fg: "#fff1e8", muted: "#a3877a", surface: "#1e120c", accent: "#ff8a4c", colors: ["#ff8a4c", "#d8e37b", "#7cc6ff"] }),
  ],
  defaults: { titleFont: "instrument-serif", bodyFont: "local-mono", titleSize: 92, bodySize: 20 },
  titleRange: [48, 120],
  bodyRange: [14, 26],
  sample: {
    eyebrow: "TypeScript",
    title: "Share images for developers",
    code: `import { render } from "x-thumbnail";\n\nconst card = await render({\n  template: "spotlight",\n  title: "Hello, world",\n  size: "og",\n});\n\nawait card.save("og.png");`,
  },
  Component: Spotlight,
};
