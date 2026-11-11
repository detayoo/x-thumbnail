import { Absolute, CardRoot, Fit, Part, Text } from "@/components/card/primitives";
import { resolveWeight } from "@/lib/fonts";
import { mix } from "@/lib/thumbnail/color";
import { lines } from "@/lib/thumbnail/content";
import { palette } from "@/lib/thumbnail/style";
import type { Palette, TemplateDef, TemplateProps } from "@/lib/thumbnail/types";
import { highlight } from "./code";
import { Photo } from "@/components/card/scenes";

function Ruler({ color, width }: { color: string; width: number }) {
  const ticks = Math.floor(width / 24);
  return (
    <div aria-hidden style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26, borderBottom: `1px solid ${color}` }}>
      {Array.from({ length: ticks }, (_, i) => (
        <span key={i} style={{ position: "absolute", left: i * 24 + 12, bottom: 0, width: 1, height: i % 5 === 0 ? 12 : 6, background: color }} />
      ))}
    </div>
  );
}

function Isometric({ p }: { p: Palette }) {
  const ink = mix(p.fg, 0.75);
  const faint = mix(p.fg, 0.25);
  const layer = (y: number, i: number) => (
    <g key={i} transform={`translate(0 ${y})`}>
      <path d="M260 60 L420 140 L260 220 L100 140 Z" fill={i === 0 ? mix(p.accent, 0.16) : p.bg} stroke={ink} strokeWidth="1.6" />
      <path d="M100 140 L100 160 L260 240 L420 160 L420 140" fill="none" stroke={ink} strokeWidth="1.6" />
      {i === 0
        ? [0, 1, 2, 3].map((k) => <path key={k} d={`M${150 + k * 30} ${140 - k * 15} L${270 + k * 30} ${200 - k * 15}`} stroke={faint} strokeWidth="1.2" />)
        : null}
    </g>
  );
  return (
    <svg viewBox="0 0 520 420" width="100%" height="100%" aria-hidden>
      <g stroke={faint} strokeWidth="1" fill="none" strokeDasharray="4 6">
        <path d="M260 20 L260 400" />
        <path d="M40 140 L480 140" />
      </g>
      {[120, 70, 20].map((y, i) => layer(y, 2 - i))}
      <g stroke={ink} strokeWidth="1.2" fill="none">
        <path d="M420 160 L470 130 L500 130" />
        <path d="M100 210 L54 240 L24 240" />
        <path d="M260 340 L260 380 L320 380" />
        <circle cx="500" cy="130" r="3.5" fill={p.accent} stroke="none" />
        <circle cx="24" cy="240" r="3.5" fill={p.accent} stroke="none" />
        <circle cx="320" cy="380" r="3.5" fill={p.accent} stroke="none" />
      </g>
      <g fill="none" stroke={ink} strokeWidth="1.4">
        <rect x="380" y="30" width="44" height="30" />
        <rect x="430" y="44" width="44" height="30" />
        <rect x="60" y="300" width="56" height="36" />
      </g>
    </svg>
  );
}

function Schematic({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  return (
    <CardRoot width={width} height={height} style={style}>
      <Ruler color={p.line} width={width} />
      {content.image || style.hidden.has("drawing") ? null : (
        <Part name="drawing">
          <div style={{ position: "absolute", right: 48, top: 64, width: 560, height: height - 120 }}>
            <Isometric p={p} />
          </div>
        </Part>
      )}
      {content.image && !style.hidden.has("drawing") ? (
        <Part name="drawing">
          <div style={{ position: "absolute", right: 56, top: 70, width: 540, height: height - 130, borderRadius: 6, overflow: "hidden" }}>
            <Photo src={content.image} defaultFit="contain" />
          </div>
        </Part>
      ) : null}
      <div style={{ position: "relative", flex: 1, width: 620, display: "flex", flexDirection: "column", padding: "58px 0 60px 64px" }}>
        <Text field="site" font={bodyFont} size={bodySize - 2} weight={600} lines={1}>
          {content.site}
        </Text>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 20, minHeight: 0 }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={3} font={titleFont} weight={400} italic lineHeight={1} tracking="-0.02em" />
        </div>
      </div>
    </CardRoot>
  );
}

export const schematic: TemplateDef = {
  id: "schematic",
  name: "Schematic",
  description: "Engineering-notebook card: a line-art diagram, a ruler edge and an italic serif title.",
  category: "Developer",
  fields: [
    { key: "title", label: "Title" },
    { key: "site", label: "Brand" },
    { key: "image", label: "Your image", hint: "Optional. Drop, paste (⌘V) or choose one." },
  ],
  imageFit: "contain",
  parts: [{ key: "drawing", label: "Diagram" }],
  palettes: [
    palette("paper", "Paper", { bg: "#ffffff", fg: "#121417", muted: "#5c6370", accent: "#2054d2", line: "#e6e8ec" }),
    palette("drafting", "Drafting", { bg: "#f4f1ea", fg: "#1d1b17", muted: "#6b655a", accent: "#c2410c", line: "#e2ddd1" }),
    palette("blueprint", "Blueprint", { bg: "#0d2a5c", fg: "#e7efff", muted: "#9db3dd", accent: "#7cc4ff", line: "#22427a" }),
  ],
  defaults: { titleFont: "instrument-serif", bodyFont: "geist", titleSize: 104, bodySize: 22 },
  titleRange: [56, 140],
  bodyRange: [16, 28],
  sample: { site: "Northwind Cloud", title: "Persistent volumes, explained" },
  Component: Schematic,
};

function Terminal({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  return (
    <CardRoot width={width} height={height} style={style}>
      <div
        style={{
          position: "absolute",
          inset: 40,
          borderRadius: 20,
          border: `1.5px solid ${p.line}`,
          background: p.surface,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: `0 0 120px ${mix(p.accent, 0.08)}`,
        }}
      >
        <div style={{ height: 52, display: "flex", alignItems: "center", gap: 10, padding: "0 20px", borderBottom: `1.5px solid ${p.line}` }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} style={{ width: 13, height: 13, borderRadius: 13, background: c }} />
          ))}
          <div style={{ flex: 1, display: "flex", justifyContent: "center", paddingRight: 60 }}>
            <Text field="site" font={bodyFont} size={18} color={p.muted} lines={1}>
              {content.site}
            </Text>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "34px 44px", gap: 20, minHeight: 0 }}>
          {content.eyebrow ? (
            <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
              <span style={{ fontFamily: bodyFont.family, fontSize: bodySize + 2, color: p.accent }}>$</span>
              <Text field="eyebrow" font={bodyFont} size={bodySize + 2} color={mix(p.fg, 0.8)} lines={1}>
                {content.eyebrow}
              </Text>
            </div>
          ) : null}
          <Fit
            field="title"
            text={content.title}
            max={style.titleSize}
            fill
            align="center"
            font={titleFont}
            weight={700}
            lineHeight={1.1}
            tracking="-0.02em"
            color={p.accent}
            suffix={<span style={{ display: "inline-block", width: "0.5em", height: "0.95em", marginLeft: "0.15em", verticalAlign: "-0.12em", background: p.accent }} />}
          />
          {content.subtitle ? (
            <Text field="subtitle" font={bodyFont} size={bodySize} color={p.muted} lines={2}>
              {content.subtitle}
            </Text>
          ) : null}
        </div>
      </div>
    </CardRoot>
  );
}

const term = { bg: "#060606", fg: "#e8e8e8", muted: "#7c7c7c", surface: "#0e0e0e", line: "#232323" };

export const terminal: TemplateDef = {
  id: "terminal",
  name: "Terminal",
  description: "A command, its output as the headline and a blinking cursor.",
  category: "Developer",
  fields: [
    { key: "eyebrow", label: "Command" },
    { key: "title", label: "Output" },
    { key: "subtitle", label: "Comment" },
    { key: "site", label: "Window title" },
  ],
  palettes: [
    palette("phosphor", "Phosphor", { ...term, accent: "#39ff88" }),
    palette("amber", "Amber", { ...term, accent: "#ffb000" }),
    palette("ice", "Ice", { ...term, accent: "#7dd3fc" }),
    palette("mono", "Mono", { ...term, accent: "#f5f5f5" }),
  ],
  defaults: { titleFont: "geist-mono", bodyFont: "geist-mono", titleSize: 72, bodySize: 22 },
  titleRange: [40, 110],
  bodyRange: [16, 30],
  sample: { eyebrow: "npx create-store@latest my-shop", title: "Your store is live in 9 seconds", subtitle: "# Payments, inventory and a dashboard, ready to go", site: "~/projects/my-shop" },
  Component: Terminal,
};

function Docs({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const widths = [70, 54, 82, 62, 48, 76, 58];
  return (
    <CardRoot width={width} height={height} style={style}>
      {style.hidden.has("sidebar") ? null : (
        <Part name="sidebar">
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 250, background: p.surface, borderRight: `1px solid ${p.line}`, padding: "64px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
            {widths.map((w, i) => (
              <div key={i} style={{ height: 12, width: `${w}%`, borderRadius: 6, background: i === 2 ? p.accent : p.line }} />
            ))}
          </div>
        </Part>
      )}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: `60px 72px 60px ${style.hidden.has("sidebar") ? 72 : 320}px`, gap: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Text field="site" font={bodyFont} size={bodySize} weight={600} lines={1}>
            {content.site}
          </Text>
          {content.site && content.eyebrow ? <span style={{ color: p.muted, fontSize: bodySize }}>›</span> : null}
          <Text field="eyebrow" font={bodyFont} size={bodySize} color={p.muted} lines={1}>
            {content.eyebrow}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22, minHeight: 0 }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={3} font={titleFont} weight={700} lineHeight={1.08} tracking="-0.03em" />
          {content.subtitle ? (
            <Text field="subtitle" font={bodyFont} size={bodySize + 4} color={p.muted} lines={2}>
              {content.subtitle}
            </Text>
          ) : null}
        </div>
        <div aria-hidden style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[92, 78].map((w, i) => (
            <div key={i} style={{ height: 10, width: `${w}%`, borderRadius: 5, background: p.line }} />
          ))}
        </div>
      </div>
    </CardRoot>
  );
}

export const docs: TemplateDef = {
  id: "docs",
  name: "Docs",
  description: "Documentation page card with a breadcrumb and a sidebar sketch.",
  category: "Developer",
  fields: [
    { key: "site", label: "Product" },
    { key: "eyebrow", label: "Section" },
    { key: "title", label: "Page title" },
    { key: "subtitle", label: "Summary" },
  ],
  parts: [{ key: "sidebar", label: "Sidebar" }],
  palettes: [
    palette("light", "Light", { bg: "#ffffff", fg: "#0b0d12", muted: "#5f6675", accent: "#2054d2", surface: "#f6f7f9", line: "#e5e7eb" }),
    palette("dark", "Dark", { bg: "#0b0d12", fg: "#f1f5f9", muted: "#8a93a6", accent: "#38bdf8", surface: "#11141b", line: "#1f2430" }),
    palette("warm", "Warm", { bg: "#fdfbf7", fg: "#1c1917", muted: "#6f665d", accent: "#ea580c", surface: "#f5f1ea", line: "#e8e1d6" }),
  ],
  defaults: { titleFont: "geist", bodyFont: "geist", titleSize: 68, bodySize: 22 },
  titleRange: [40, 96],
  bodyRange: [16, 30],
  sample: { site: "Northwind Docs", eyebrow: "Guides", title: "Authenticate requests with API keys", subtitle: "Create a key, scope it to a project and send it with every request." },
  Component: Docs,
};

const METHOD_COLORS: Record<string, string> = { GET: "#22c55e", POST: "#3b82f6", PUT: "#f59e0b", PATCH: "#a3a3a3", DELETE: "#ef4444" };

function Api({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const method = content.eyebrow.trim().toUpperCase();
  const methodColor = METHOD_COLORS[method] ?? p.accent;
  return (
    <CardRoot width={width} height={height} style={style}>
      <Absolute style={{ inset: 0, background: `radial-gradient(${mix(p.fg, 0.06)} 1.2px, transparent 1.6px) 0 0 / 26px 26px` }} />
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: "60px 72px", gap: 28 }}>
        <Text field="site" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
          {content.site}
        </Text>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {method ? (
            <div style={{ padding: "8px 16px", borderRadius: 10, background: mix(methodColor, 0.16), border: `1.5px solid ${mix(methodColor, 0.5)}`, flexShrink: 0 }}>
              <Text field="eyebrow" font={bodyFont} size={bodySize + 2} weight={700} color={methodColor} lines={1}>
                {method}
              </Text>
            </div>
          ) : null}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Fit field="title" text={content.title} max={style.titleSize} lines={1} font={titleFont} weight={500} lineHeight={1.1} tracking="-0.02em" balance={false} />
          </div>
        </div>
        {content.subtitle ? (
          <Text field="subtitle" font={bodyFont} size={bodySize + 2} color={p.muted} lines={1}>
            {content.subtitle}
          </Text>
        ) : null}
        <div style={{ flex: 1, minHeight: 0, borderRadius: 16, border: `1.5px solid ${p.line}`, background: p.surface, padding: "22px 26px", overflow: "hidden", position: "relative" }}>
          <pre style={{ margin: 0, fontFamily: bodyFont.family, fontWeight: resolveWeight(bodyFont, 400), fontSize: bodySize - 1, lineHeight: 1.55, color: p.fg, whiteSpace: "pre" }}>
            {highlight(content.code, p)}
          </pre>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 60, background: `linear-gradient(transparent, ${p.surface})` }} />
        </div>
      </div>
    </CardRoot>
  );
}

export const api: TemplateDef = {
  id: "api",
  name: "API",
  description: "Endpoint card: method badge, path and a response snippet.",
  category: "Developer",
  fields: [
    { key: "eyebrow", label: "Method", hint: "GET, POST, PUT, PATCH or DELETE." },
    { key: "title", label: "Path" },
    { key: "subtitle", label: "Description" },
    { key: "code", label: "Response", multiline: true },
    { key: "site", label: "API name" },
  ],
  palettes: [
    palette("night", "Night", { bg: "#0a0c10", fg: "#e7eaf0", muted: "#7f8798", surface: "#10141b", line: "#1e2430", accent: "#60a5fa", colors: ["#93c5fd", "#86efac", "#fdba74"] }),
    palette("paper", "Paper", { bg: "#fafafa", fg: "#111827", muted: "#6b7280", surface: "#ffffff", line: "#e5e7eb", accent: "#2054d2", colors: ["#2054d2", "#15803d", "#c2410c"] }),
  ],
  defaults: { titleFont: "geist-mono", bodyFont: "geist-mono", titleSize: 58, bodySize: 20 },
  titleRange: [32, 80],
  bodyRange: [14, 26],
  sample: {
    site: "Northwind API · v2",
    eyebrow: "POST",
    title: "/v2/payments/intents",
    subtitle: "Create a payment intent and confirm it in one call.",
    code: `{\n  "id": "pi_3Nx82",\n  "amount": 4900,\n  "currency": "usd",\n  "status": "succeeded"\n}`,
  },
  Component: Api,
};

function Diff({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const [added = "", removed = ""] = content.stat.split(/[\s/,]+/);
  const plus = parseInt(added.replace(/\D/g, ""), 10) || 0;
  const minus = parseInt(removed.replace(/\D/g, ""), 10) || 0;
  const total = Math.max(1, plus + minus);
  const blocks = Array.from({ length: 5 }, (_, i) => (i < Math.round((plus / total) * 5) ? "add" : "del"));
  const items = lines(content.subtitle, 3);
  return (
    <CardRoot width={width} height={height} style={style}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "60px 72px", gap: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden fill="none" stroke={p.accent} strokeWidth="2" strokeLinecap="round">
            <circle cx="6" cy="5" r="2.5" />
            <circle cx="6" cy="19" r="2.5" />
            <circle cx="18" cy="9" r="2.5" />
            <path d="M6 7.5v9M18 11.5c0 4-6 3-11 5.5" />
          </svg>
          <Text field="eyebrow" font={bodyFont} size={bodySize} color={p.muted} lines={1}>
            {content.eyebrow}
          </Text>
          <div style={{ flex: 1 }} />
          <Text field="site" font={bodyFont} size={bodySize} color={p.muted} lines={1}>
            {content.site}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, minHeight: 0 }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={2} font={titleFont} weight={650} lineHeight={1.08} tracking="-0.03em" />
          {items.length ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span style={{ fontFamily: bodyFont.family, fontSize: bodySize, color: i === 0 ? "#22c55e" : mix(p.fg, 0.4), width: 18 }}>{i === 0 ? "+" : "·"}</span>
                  <Text font={bodyFont} size={bodySize} color={mix(p.fg, 0.8)} lines={1}>
                    {item}
                  </Text>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {plus || minus ? (
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontFamily: bodyFont.family, fontSize: bodySize + 2, fontWeight: resolveWeight(bodyFont, 600), color: "#22c55e" }}>+{plus.toLocaleString()}</span>
            <span style={{ fontFamily: bodyFont.family, fontSize: bodySize + 2, fontWeight: resolveWeight(bodyFont, 600), color: "#ef4444" }}>−{minus.toLocaleString()}</span>
            <div style={{ display: "flex", gap: 4 }}>
              {blocks.map((b, i) => (
                <span key={i} style={{ width: 18, height: 18, borderRadius: 4, background: b === "add" ? "#22c55e" : "#ef4444" }} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </CardRoot>
  );
}

export const diff: TemplateDef = {
  id: "diff",
  name: "Diff",
  description: "Pull-request card with branch, headline, highlights and added/removed lines.",
  category: "Developer",
  fields: [
    { key: "eyebrow", label: "Branch or PR" },
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Highlights", multiline: true, hint: "One per line, up to three." },
    { key: "stat", label: "Lines changed", hint: "Added then removed, e.g. 1240 380." },
    { key: "site", label: "Repository" },
  ],
  palettes: [
    palette("night", "Night", { bg: "#0d1117", fg: "#e6edf3", muted: "#7d8590", accent: "#58a6ff" }),
    palette("paper", "Paper", { bg: "#ffffff", fg: "#1f2328", muted: "#656d76", accent: "#2054d2" }),
    palette("slate", "Slate", { bg: "#16181d", fg: "#eceef2", muted: "#8b909c", accent: "#f59e0b" }),
  ],
  defaults: { titleFont: "geist", bodyFont: "geist-mono", titleSize: 70, bodySize: 22 },
  titleRange: [40, 100],
  bodyRange: [16, 28],
  sample: {
    eyebrow: "feat/offline-sync · #482",
    title: "Offline mode for the mobile app",
    subtitle: "Queue writes while offline and replay them\nConflict resolution with last-write-wins\nBackground sync every 30 seconds",
    stat: "1240 380",
    site: "northwind/mobile",
  },
  Component: Diff,
};
