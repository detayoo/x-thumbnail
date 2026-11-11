import * as React from "react";

import { Absolute, CardRoot, Fit, Text } from "@/components/card/primitives";
import { resolveWeight } from "@/lib/fonts";
import { mix } from "@/lib/thumbnail/color";
import { palette } from "@/lib/thumbnail/style";
import type { Palette, TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

const KEYWORDS = new Set(
  "const let var function return import export from default async await if else for while new class extends type interface of in as await yield def fn pub use mut struct impl match true false null undefined".split(" "),
);

const TOKEN = /(\/\/.*|#.*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[{}()[\];,.:=<>+\-*/!?&|])/g;

export function highlight(code: string, p: Palette): React.ReactNode[] {
  const [keyword, string, number] = [p.colors[0] ?? p.accent, p.colors[1] ?? p.fg, p.colors[2] ?? p.fg];
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const match of code.matchAll(TOKEN)) {
    const token = match[0];
    const at = match.index ?? 0;
    if (at > last) out.push(code.slice(last, at));
    let color: string | undefined;
    if (token.startsWith("//") || token.startsWith("#")) color = p.muted;
    else if (/^["'`]/.test(token)) color = string;
    else if (/^\d/.test(token)) color = number;
    else if (KEYWORDS.has(token)) color = keyword;
    else if (/^[{}()[\];,.:=<>+\-*/!?&|]$/.test(token)) color = mix(p.fg, 0.55);
    out.push(color ? <span key={i++} style={{ color }}>{token}</span> : token);
    last = at + token.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

function Code({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const windowBg = p.surface;

  return (
    <CardRoot width={width} height={height} style={style}>
      <Absolute style={{ right: -200, bottom: -300, width: 900, height: 900, background: `radial-gradient(closest-side, ${mix(p.accent, 0.28)}, transparent)` }} />
      <div style={{ position: "relative", flex: 1, display: "flex" }}>
        <div style={{ width: 470, flexShrink: 0, display: "flex", flexDirection: "column", padding: "60px 40px 60px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {content.site ? <span style={{ width: 14, height: 14, borderRadius: 4, background: p.accent }} /> : null}
            <Text field="site" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
              {content.site}
            </Text>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22, minHeight: 0 }}>
            <Fit field="title" text={content.title} max={style.titleSize} lines={5} font={titleFont} weight={650} lineHeight={1.08} tracking="-0.03em" />
            {content.subtitle ? (
              <Text field="subtitle" font={titleFont} size={bodySize + 2} color={p.muted} lines={3}>
                {content.subtitle}
              </Text>
            ) : null}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 520,
            right: -24,
            top: 64,
            bottom: 64,
            borderRadius: 22,
            background: windowBg,
            border: `1.5px solid ${p.line}`,
            boxShadow: `0 30px 80px ${mix("#000000", 0.35)}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ height: 56, display: "flex", alignItems: "center", gap: 10, padding: "0 22px", borderBottom: `1.5px solid ${p.line}`, flexShrink: 0 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} style={{ width: 14, height: 14, borderRadius: 14, background: c }} />
            ))}
            <div style={{ flex: 1, display: "flex", justifyContent: "center", paddingRight: 60 }}>
              <Text field="eyebrow" font={bodyFont} size={18} color={p.muted} lines={1}>
                {content.eyebrow}
              </Text>
            </div>
          </div>
          <pre
            style={{
              margin: 0,
              padding: "26px 30px",
              flex: 1,
              fontFamily: bodyFont.family,
              fontWeight: resolveWeight(bodyFont, 400),
              fontSize: bodySize,
              lineHeight: 1.6,
              color: p.fg,
              whiteSpace: "pre",
              overflow: "hidden",
              tabSize: 2,
            }}
          >
            {highlight(content.code, p)}
          </pre>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 70, background: `linear-gradient(transparent, ${windowBg})` }} />
        </div>
      </div>
    </CardRoot>
  );
}

export const code: TemplateDef = {
  id: "code",
  name: "Code",
  description: "Headline beside a syntax-highlighted editor window.",
  category: "Developer",
  fields: [
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Subtitle" },
    { key: "code", label: "Code", multiline: true },
    { key: "eyebrow", label: "File name" },
    { key: "site", label: "Site" },
  ],
  palettes: [
    palette("night", "Night", { bg: "#0b0d12", fg: "#e6e8ef", muted: "#7c8296", surface: "#12151d", line: "#232837", accent: "#7aa2f7", colors: ["#7dcfff", "#9ece6a", "#ff9e64"] }),
    palette("dawn", "Dawn", { bg: "#eef0f5", fg: "#1d2030", muted: "#6b7085", surface: "#ffffff", line: "#dfe2ea", accent: "#d6336c", colors: ["#d6336c", "#2f9e44", "#e8590c"] }),
    palette("aurora", "Aurora", { bg: "#07130f", fg: "#e7fff5", muted: "#6f9a88", surface: "#0c1d17", line: "#18342a", accent: "#34d399", colors: ["#34d399", "#facc15", "#60a5fa"] }),
  ],
  defaults: { titleFont: "geist", bodyFont: "geist-mono", titleSize: 58, bodySize: 22 },
  titleRange: [36, 84],
  bodyRange: [14, 30],
  sample: { eyebrow: "app/layout.tsx", title: "Add share images in one line", subtitle: "Point your metadata at a PNG and every link gets a card." },
  Component: Code,
};
