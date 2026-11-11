import { Part, CardRoot, Fit, Text } from "@/components/card/primitives";
import { mix } from "@/lib/thumbnail/color";
import { lines } from "@/lib/thumbnail/content";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Cross({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <div aria-hidden style={{ position: "absolute", left: x - 9, top: y - 9, width: 18, height: 18 }}>
      <span style={{ position: "absolute", left: 8, top: 0, width: 2, height: 18, background: color }} />
      <span style={{ position: "absolute", top: 8, left: 0, height: 2, width: 18, background: color }} />
    </div>
  );
}

const CELLS = [
  [0, 0, 1, 1, 1],
  [1, 0, 2, 1, 0],
  [3, 0, 1, 2, 2],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1],
  [0, 2, 2, 1, 0],
  [2, 2, 2, 1, 1],
] as const;

function Technical({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const splitX = 700;
  const baseY = height - 104;
  const cell = (width - splitX - 40) / 4;
  const data = lines(content.subtitle, 5);
  const fan = Array.from({ length: 11 }, (_, i) => i);

  return (
    <CardRoot width={width} height={height} style={style}>
      <div aria-hidden style={{ position: "absolute", left: splitX, top: 0, bottom: 0, width: 1, background: p.line }} />
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, top: baseY, height: 1, background: p.line }} />
      {style.hidden.has("art") ? null : (
      <Part name="art">
      <div style={{ position: "absolute", left: splitX + 20, top: 40, width: cell * 4, height: cell * 3 }}>
        {CELLS.map(([cx, cy, w, h, kind], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx * cell + 6,
              top: cy * cell + 6,
              width: w * cell - 12,
              height: h * cell - 12,
              border: `1.5px dashed ${mix(p.fg, 0.28)}`,
              background: kind === 1 ? `radial-gradient(${mix(p.fg, 0.5)} 1.5px, transparent 2px) 0 0 / 14px 14px` : kind === 2 ? mix(p.accent, 0.12) : undefined,
            }}
          />
        ))}
        <svg width={cell * 4} height={cell * 3} style={{ position: "absolute", inset: 0 }}>
          {fan.map((i) => (
            <path
              key={i}
              d={`M ${cell * 3} ${cell} L ${cell * 0.4 + i * 14} ${cell * 0.4 + i * 4} L ${cell * 0.4 + i * 14} ${cell * 3}`}
              fill="none"
              stroke={mix(p.fg, 0.32)}
              strokeWidth={1.2}
            />
          ))}
        </svg>
        <Cross x={cell * 3} y={cell} color={p.accent} />
      </div>
      </Part>
      )}
      <Cross x={splitX} y={baseY} color={p.fg} />
      {data.length ? (
        <div style={{ position: "absolute", right: 56, top: 64, display: "flex", flexDirection: "column", gap: 4, padding: "10px 14px", background: p.bg }}>
          {data.map((d, i) => (
            <Text key={i} font={bodyFont} size={bodySize - 2} color={i === 0 ? p.fg : p.muted} lines={1}>
              {d}
            </Text>
          ))}
        </div>
      ) : null}
      <div style={{ position: "relative", width: splitX, height: baseY, display: "flex", flexDirection: "column", padding: "56px 56px 44px 64px" }}>
        {style.hidden.has("mark") ? <div style={{ height: 26 }} /> : <Part name="mark"><div style={{ width: 36, height: 18, borderRadius: "36px 36px 0 0", background: p.fg, marginTop: 8 }} /></Part>}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 18, minHeight: 0 }}>
          {content.eyebrow ? (
            <Text field="eyebrow" font={bodyFont} size={bodySize - 2} uppercase tracking="0.08em" color={p.accent} lines={1}>
              {content.eyebrow}
            </Text>
          ) : null}
          <Fit field="title" text={content.title} max={style.titleSize} lines={3} font={titleFont} weight={700} lineHeight={1} tracking="-0.05em" />
        </div>
      </div>
      <div style={{ position: "absolute", left: 64, right: 56, top: baseY, height: height - baseY, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <Text field="site" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
          {content.site}
        </Text>
        <Text field="date" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
          {content.date}
        </Text>
      </div>
    </CardRoot>
  );
}

export const technical: TemplateDef = {
  id: "technical",
  name: "Technical",
  description: "Stark black-and-white engineering card with dashed blueprint cells and crosshairs.",
  category: "Featured",
  fields: [
    { key: "eyebrow", label: "Label" },
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Data lines", multiline: true, hint: "Short mono lines, up to five." },
    { key: "site", label: "Site" },
    { key: "date", label: "Date" },
  ],
  palettes: [
    palette("black", "Black", { bg: "#000000", fg: "#ffffff", muted: "#8f8f8f", accent: "#3b82f6", line: "#2a2a2a" }),
    palette("white", "White", { bg: "#fafafa", fg: "#0a0a0a", muted: "#6f6f6f", accent: "#2054d2", line: "#e2e2e2" }),
    palette("signal", "Signal", { bg: "#000000", fg: "#ffffff", muted: "#8f8f8f", accent: "#ff4d2e", line: "#2a2a2a" }),
  ],
  defaults: { titleFont: "geist", bodyFont: "geist-mono", titleSize: 92, bodySize: 20 },
  titleRange: [48, 130],
  bodyRange: [14, 26],
  parts: [{ key: "mark", label: "Corner mark" }, { key: "art", label: "Blueprint art" }],
  sample: { eyebrow: "Engineering", title: "Ship previews on every push", subtitle: "[build]   2.4s\n[cold]    38ms\n[regions] 18\n[status]  ready" },
  Component: Technical,
};
