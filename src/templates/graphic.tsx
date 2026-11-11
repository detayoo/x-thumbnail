import { Absolute, CardRoot, Fit, Grain, Monogram, Part, Text } from "@/components/card/primitives";
import { Photo } from "@/components/card/scenes";
import { mix, readableOn } from "@/lib/thumbnail/color";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Newsletter({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  return (
    <CardRoot width={width} height={height} style={style}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "44px 80px 52px" }}>
        <div style={{ borderTop: `4px solid ${p.fg}`, paddingTop: 4 }}>
          <div style={{ borderTop: `1px solid ${p.fg}` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0 12px" }}>
          <Text field="site" font={titleFont} size={60} weight={800} tracking="-0.01em" lines={1}>
            {content.site}
          </Text>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: `1px solid ${p.fg}`, borderBottom: `1px solid ${p.fg}` }}>
          <Text field="eyebrow" font={bodyFont} size={bodySize - 4} weight={600} uppercase tracking="0.16em" lines={1}>
            {content.eyebrow}
          </Text>
          <Text field="date" font={bodyFont} size={bodySize - 4} weight={600} uppercase tracking="0.16em" lines={1}>
            {content.date}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 16, minHeight: 0, padding: "0 30px" }}>
          <div style={{ width: "100%" }}>
            <Fit field="title" text={content.title} max={style.titleSize} lines={2} font={titleFont} weight={700} lineHeight={1.04} tracking="-0.015em" textAlign="center" />
          </div>
          {content.subtitle ? (
            <div style={{ maxWidth: 860 }}>
              <Text field="subtitle" font={bodyFont} size={bodySize + 4} italic color={p.muted} lines={2} style={{ textAlign: "center" }}>
                {content.subtitle}
              </Text>
            </div>
          ) : null}
        </div>
      </div>
    </CardRoot>
  );
}

export const newsletter: TemplateDef = {
  id: "newsletter",
  name: "Newsletter",
  description: "Broadsheet masthead, issue line and a classic serif headline.",
  category: "Editorial",
  fields: [
    { key: "site", label: "Masthead" },
    { key: "eyebrow", label: "Issue" },
    { key: "date", label: "Date" },
    { key: "title", label: "Headline" },
    { key: "subtitle", label: "Deck" },
  ],
  palettes: [
    palette("newsprint", "Newsprint", { bg: "#f4efe4", fg: "#161412", muted: "#5f574c", accent: "#8a1c1c" }),
    palette("blush", "Blush", { bg: "#fbe9e4", fg: "#3a0d0d", muted: "#7a4a44", accent: "#c0392b" }),
    palette("night", "Night", { bg: "#14130f", fg: "#ede6d6", muted: "#a59c8a", accent: "#e0b354" }),
    palette("harbour", "Harbour", { bg: "#e9f1f4", fg: "#0e2a35", muted: "#4f6b76", accent: "#0e7490" }),
  ],
  defaults: { titleFont: "eb-garamond", bodyFont: "eb-garamond", titleSize: 84, bodySize: 26 },
  titleRange: [48, 120],
  bodyRange: [18, 34],
  sample: { site: "The Sunday Draft", eyebrow: "Issue No. 42", date: "Nov 16, 2026", title: "Why small teams ship better software", subtitle: "Notes on focus, fewer meetings and the courage to say no." },
  Component: Newsletter,
};

function Mesh({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const [a, b, c, d] = p.colors;
  return (
    <CardRoot
      width={width}
      height={height}
      style={style}
      background={`radial-gradient(60% 80% at 8% 12%, ${a}, transparent 70%), radial-gradient(55% 75% at 92% 8%, ${b}, transparent 70%), radial-gradient(60% 80% at 85% 95%, ${c}, transparent 70%), radial-gradient(55% 70% at 15% 92%, ${d}, transparent 70%), ${p.bg}`}
    >
      {style.options.grain === "off" ? null : <Grain opacity={0.6} />}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: "60px 72px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
          <Text field="site" font={bodyFont} size={bodySize} weight={600} lines={1}>
            {content.site}
          </Text>
          <Text field="eyebrow" font={bodyFont} size={bodySize} color={mix(p.fg, 0.8)} lines={1}>
            {content.eyebrow}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 18, minHeight: 0 }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={3} font={titleFont} weight={700} lineHeight={1.02} tracking="-0.035em" />
          {content.subtitle ? (
            <Text field="subtitle" font={bodyFont} size={bodySize + 4} color={mix(p.fg, 0.85)} lines={2}>
              {content.subtitle}
            </Text>
          ) : null}
        </div>
      </div>
    </CardRoot>
  );
}

export const mesh: TemplateDef = {
  id: "mesh",
  name: "Mesh",
  description: "Soft four-colour mesh gradient with film grain.",
  category: "Graphic",
  fields: [
    { key: "eyebrow", label: "Label" },
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Subtitle" },
    { key: "site", label: "Brand" },
  ],
  palettes: [
    palette("lagoon", "Lagoon", { bg: "#0b5be0", fg: "#ffffff", accent: "#38f9d7", colors: ["#00c6fb", "#005bea", "#38f9d7", "#1e3a8a"] }),
    palette("peach", "Peach", { bg: "#ff6a5c", fg: "#ffffff", accent: "#ffc46b", colors: ["#ff8a65", "#ff3d7f", "#ffc46b", "#e11d48"] }),
    palette("citrus", "Citrus", { bg: "#f59e0b", fg: "#1a1203", accent: "#fde047", colors: ["#fde047", "#fb923c", "#a3e635", "#f97316"] }),
    palette("sorbet", "Sorbet", { bg: "#eaf6ff", fg: "#10223a", accent: "#7cc4ff", colors: ["#c8f0ff", "#ffd6e8", "#fff3b0", "#bde7d6"] }),
  ],
  defaults: { titleFont: "sora", bodyFont: "sora", titleSize: 86, bodySize: 22 },
  titleRange: [48, 120],
  bodyRange: [16, 30],
  options: [
    {
      key: "grain",
      label: "Grain",
      choices: [
        { label: "On", value: "on" },
        { label: "Off", value: "off" },
      ],
      defaultValue: "on",
    },
  ],
  sample: { site: "Lumen Studio", eyebrow: "Case study", title: "Rebranding a fintech in six weeks", subtitle: "From workshop to launch, with a team of three." },
  Component: Mesh,
};

function Grainy({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const [top, mid, bottom, sun] = p.colors;
  return (
    <CardRoot width={width} height={height} style={style} background={`linear-gradient(180deg, ${top} 0%, ${mid} 58%, ${bottom} 100%)`}>
      {style.hidden.has("sun") ? null : (
        <Part name="sun">
          <div style={{ position: "absolute", right: 140, bottom: -160, width: 440, height: 440, borderRadius: "50%", background: `radial-gradient(circle, ${sun} 0%, ${mix(sun, 0.4)} 45%, transparent 70%)` }} />
        </Part>
      )}
      <Grain opacity={0.95} />
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: "56px 72px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
          <Text field="eyebrow" font={bodyFont} size={bodySize} weight={500} uppercase tracking="0.14em" lines={1}>
            {content.eyebrow}
          </Text>
          <Text field="site" font={bodyFont} size={bodySize} color={mix(p.fg, 0.8)} lines={1}>
            {content.site}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 0, maxWidth: 860 }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={3} font={titleFont} weight={500} lineHeight={1.02} tracking="-0.02em" />
        </div>
      </div>
    </CardRoot>
  );
}

export const grain: TemplateDef = {
  id: "grain",
  name: "Grain",
  description: "Two-tone dusk gradient, a low sun and heavy film grain.",
  category: "Graphic",
  fields: [
    { key: "eyebrow", label: "Label" },
    { key: "title", label: "Title" },
    { key: "site", label: "Brand" },
  ],
  parts: [{ key: "sun", label: "Sun" }],
  palettes: [
    palette("tide", "Tide", { bg: "#16425b", fg: "#f2fbff", accent: "#f4e3b1", colors: ["#06141f", "#16425b", "#7ab8b0", "#f4e3b1"] }),
    palette("sunset", "Sunset", { bg: "#7a2e2e", fg: "#fff6ec", accent: "#ffd29b", colors: ["#1b1430", "#8a3a3a", "#f08a5d", "#ffd29b"] }),
    palette("clay", "Clay", { bg: "#8c3b22", fg: "#fff3ea", accent: "#ffe2c4", colors: ["#2a120b", "#8c3b22", "#e6a57e", "#ffe2c4"] }),
    palette("moss", "Moss", { bg: "#2f4f3a", fg: "#f7f9ef", accent: "#f2efc9", colors: ["#0f1d14", "#2f4f3a", "#a3b18a", "#f2efc9"] }),
  ],
  defaults: { titleFont: "fraunces", bodyFont: "geist", titleSize: 96, bodySize: 20 },
  titleRange: [56, 130],
  bodyRange: [14, 28],
  sample: { eyebrow: "Field notes", title: "Slow mornings, fast software", site: "Driftwood Journal" },
  Component: Grainy,
};

function Poster({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont } = style;
  const marquee = content.eyebrow ? Array.from({ length: 10 }, () => content.eyebrow.toUpperCase()).join("  ✦  ") : "";
  return (
    <CardRoot width={width} height={height} style={style}>
      {marquee && !style.hidden.has("strip") ? (
        <Part name="strip">
          <div style={{ height: 64, background: p.fg, color: p.bg, display: "flex", alignItems: "center", overflow: "hidden", whiteSpace: "nowrap", flexShrink: 0 }}>
            <span style={{ fontFamily: bodyFont.family, fontWeight: 700, fontSize: 26, letterSpacing: "0.06em", paddingLeft: 24 }}>{marquee}</span>
          </div>
        </Part>
      ) : null}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "34px 64px 0", minHeight: 0 }}>
        <Fit field="title" text={content.title} max={style.titleSize} fill align="center" font={titleFont} weight={400} lineHeight={0.92} tracking="-0.005em" uppercase balance={false} />
      </div>
      <div style={{ margin: "0 64px", padding: "18px 0 30px", borderTop: `4px solid ${p.fg}`, display: "flex", justifyContent: "space-between", gap: 24 }}>
        <Text field="date" font={bodyFont} size={26} weight={700} uppercase lines={1}>
          {content.date}
        </Text>
        <Text field="site" font={bodyFont} size={26} weight={700} uppercase lines={1}>
          {content.site}
        </Text>
      </div>
    </CardRoot>
  );
}

export const poster: TemplateDef = {
  id: "poster",
  name: "Poster",
  description: "Loud condensed headline on a bold colour with a ticker strip.",
  category: "Graphic",
  fields: [
    { key: "eyebrow", label: "Ticker" },
    { key: "title", label: "Headline" },
    { key: "date", label: "Date" },
    { key: "site", label: "Site" },
  ],
  parts: [{ key: "strip", label: "Ticker strip" }],
  palettes: [
    palette("acid", "Acid", { bg: "#d4ff3a", fg: "#0a0a0a", accent: "#0a0a0a" }),
    palette("safety", "Safety", { bg: "#ff5f1f", fg: "#111111", accent: "#111111" }),
    palette("cobalt", "Cobalt", { bg: "#2054d2", fg: "#ffffff", accent: "#ffffff" }),
    palette("mono", "Mono", { bg: "#0a0a0a", fg: "#f5f5f5", accent: "#f5f5f5" }),
  ],
  defaults: { titleFont: "anton", bodyFont: "space-grotesk", titleSize: 200, bodySize: 26 },
  titleRange: [100, 260],
  bodyRange: [18, 32],
  sample: { eyebrow: "Live this Friday", title: "Design systems at scale", date: "Fri, Nov 20", site: "devcircle.io" },
  Component: Poster,
};

function Swiss({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const shape = style.options.shape;
  return (
    <CardRoot width={width} height={height} style={style}>
      <Absolute style={{ inset: 0, background: `repeating-linear-gradient(90deg, ${mix(p.fg, 0.05)} 0 1px, transparent 1px ${width / 12}px)` }} />
      {style.hidden.has("shape") ? null : (
        <Part name="shape">
          <div
            style={{
              position: "absolute",
              right: shape === "bar" ? 0 : -60,
              top: shape === "bar" ? 0 : -120,
              width: shape === "bar" ? 220 : 500,
              height: shape === "bar" ? height : 500,
              borderRadius: shape === "circle" ? "50%" : 0,
              background: p.accent,
            }}
          />
        </Part>
      )}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: "56px 64px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Text field="eyebrow" font={titleFont} size={30} weight={700} lines={1}>
            {content.eyebrow}
          </Text>
          {content.eyebrow ? <span style={{ width: 80, height: 3, background: p.fg }} /> : null}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 0, maxWidth: 900, paddingBottom: 30 }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={3} font={titleFont} weight={800} lineHeight={0.94} tracking="-0.045em" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, paddingTop: 14, borderTop: `2px solid ${p.fg}` }}>
          {(["author", "date", "site"] as const).map((key) => (
            <Text key={key} field={key} font={bodyFont} size={bodySize} weight={500} lines={1}>
              {content[key]}
            </Text>
          ))}
        </div>
      </div>
    </CardRoot>
  );
}

export const swiss: TemplateDef = {
  id: "swiss",
  name: "Swiss",
  description: "International-style grid: a bold shape, an index and tight grotesk type.",
  category: "Graphic",
  fields: [
    { key: "eyebrow", label: "Index" },
    { key: "title", label: "Title" },
    { key: "author", label: "Column 1" },
    { key: "date", label: "Column 2" },
    { key: "site", label: "Column 3" },
  ],
  parts: [{ key: "shape", label: "Shape" }],
  palettes: [
    palette("red", "Red", { bg: "#f2f0eb", fg: "#111111", accent: "#e4002b" }),
    palette("blue", "Blue", { bg: "#f2f0eb", fg: "#111111", accent: "#2054d2" }),
    palette("yellow", "Yellow", { bg: "#111111", fg: "#f2f0eb", accent: "#ffd400" }),
    palette("green", "Green", { bg: "#eef1ea", fg: "#0d1a12", accent: "#00a368" }),
  ],
  defaults: { titleFont: "archivo", bodyFont: "archivo", titleSize: 116, bodySize: 20 },
  titleRange: [60, 160],
  bodyRange: [14, 28],
  options: [
    {
      key: "shape",
      label: "Shape",
      choices: [
        { label: "Circle", value: "circle" },
        { label: "Square", value: "square" },
        { label: "Bar", value: "bar" },
      ],
      defaultValue: "circle",
    },
  ],
  sample: { eyebrow: "04", title: "Form follows the grid", author: "Studio Raster", date: "Lecture series", site: "raster.design" },
  Component: Swiss,
};

function Block({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const [c0, c1, c2] = p.colors;
  const gap = style.options.gaps === "bento" ? 14 : 0;
  return (
    <CardRoot width={width} height={height} style={style} background={gap ? p.bg : c0}>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.55fr 1fr", gridTemplateRows: "1.15fr 1fr", gap, padding: gap }}>
        <div style={{ gridRow: "1 / 3", background: c0, color: readableOn(c0), borderRadius: gap ? 22 : 0, padding: "56px 56px 52px", display: "flex", flexDirection: "column" }}>
          <Fit field="title" text={content.title} max={style.titleSize} fill align="end" font={titleFont} weight={800} lineHeight={0.98} tracking="-0.04em" color={readableOn(c0)} />
        </div>
        <div style={{ background: c1, color: readableOn(c1), borderRadius: gap ? 22 : 0, padding: "40px 40px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <Fit field="eyebrow" text={content.eyebrow} max={44} min={24} lines={2} font={titleFont} weight={700} lineHeight={1.05} tracking="-0.02em" color={readableOn(c1)} />
        </div>
        <div style={{ background: c2, color: readableOn(c2), borderRadius: gap ? 22 : 0, padding: "34px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 12 }}>
          <Text field="subtitle" font={bodyFont} size={bodySize} color={readableOn(c2)} lines={3}>
            {content.subtitle}
          </Text>
          <Text field="site" font={bodyFont} size={bodySize - 2} weight={600} color={readableOn(c2)} lines={1}>
            {content.site}
          </Text>
        </div>
      </div>
    </CardRoot>
  );
}

export const block: TemplateDef = {
  id: "block",
  name: "Color Block",
  description: "Three flat colour blocks, flush or bento, with a big headline.",
  category: "Graphic",
  fields: [
    { key: "title", label: "Headline" },
    { key: "eyebrow", label: "Callout" },
    { key: "subtitle", label: "Details" },
    { key: "site", label: "Site" },
  ],
  palettes: [
    palette("pop", "Pop", { bg: "#111111", fg: "#111111", accent: "#ff5a36", colors: ["#ff5a36", "#ffd23f", "#2054d2"] }),
    palette("pastel", "Pastel", { bg: "#1a1a1a", fg: "#111111", accent: "#ffb5c2", colors: ["#ffb5c2", "#b8e0d2", "#bcd4ff"] }),
    palette("earth", "Earth", { bg: "#1b1a17", fg: "#111111", accent: "#d97b29", colors: ["#d97b29", "#e8dcc2", "#2f4f4f"] }),
    palette("mono", "Mono", { bg: "#000000", fg: "#111111", accent: "#f5f5f5", colors: ["#f5f5f5", "#d4d4d4", "#111111"] }),
  ],
  defaults: { titleFont: "bricolage-grotesque", bodyFont: "geist", titleSize: 104, bodySize: 22 },
  titleRange: [56, 140],
  bodyRange: [16, 30],
  options: [
    {
      key: "gaps",
      label: "Blocks",
      choices: [
        { label: "Flush", value: "flush" },
        { label: "Bento", value: "bento" },
      ],
      defaultValue: "bento",
    },
  ],
  sample: { title: "Ship the weird idea", eyebrow: "Workshop", subtitle: "A two-day sprint on prototyping, play and taste.", site: "makers.camp" },
  Component: Block,
};

function Portfolio({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  return (
    <CardRoot width={width} height={height} style={style}>
      {style.hidden.has("browser") ? null : (
        <Part name="browser">
          <div
            style={{
              position: "absolute",
              left: 600,
              top: 84,
              width: 700,
              height: height - 40,
              borderRadius: 18,
              background: p.surface,
              border: `1.5px solid ${p.line}`,
              boxShadow: `0 40px 100px ${mix("#000000", 0.25)}`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ height: 46, display: "flex", alignItems: "center", gap: 8, padding: "0 18px", borderBottom: `1.5px solid ${p.line}`, flexShrink: 0 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 11, height: 11, borderRadius: 11, background: mix(p.fg, 0.18) }} />
              ))}
              <div style={{ marginLeft: 16, height: 24, width: 260, borderRadius: 12, background: mix(p.fg, 0.06) }} />
            </div>
            {content.image ? (
              <div style={{ position: "relative", flex: 1 }}>
                <Photo src={content.image} focus="top" />
              </div>
            ) : (
              <div style={{ flex: 1, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ width: 90, height: 14, borderRadius: 7, background: p.fg }} />
                  <div style={{ display: "flex", gap: 12 }}>
                    {[50, 60, 44].map((w, i) => (
                      <div key={i} style={{ width: w, height: 10, borderRadius: 5, background: mix(p.fg, 0.2) }} />
                    ))}
                  </div>
                </div>
                <div style={{ height: 220, borderRadius: 14, background: `linear-gradient(135deg, ${p.accent}, ${mix(p.accent, 0.5, p.surface)})` }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ height: 120, borderRadius: 12, background: mix(p.fg, 0.06) }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Part>
      )}
      <div style={{ position: "relative", width: 560, flex: 1, display: "flex", flexDirection: "column", padding: "60px 40px 60px 72px" }}>
        <Text field="eyebrow" font={bodyFont} size={bodySize - 2} weight={600} uppercase tracking="0.14em" color={p.accent} lines={1}>
          {content.eyebrow}
        </Text>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, minHeight: 0 }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={3} font={titleFont} weight={600} lineHeight={1.04} tracking="-0.035em" />
          {content.subtitle ? (
            <Text field="subtitle" font={bodyFont} size={bodySize + 2} color={p.muted} lines={3}>
              {content.subtitle}
            </Text>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {content.author ? <Monogram name={content.author} size={48} bg={p.fg} fg={p.bg} font={bodyFont} /> : null}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            <Text field="author" font={bodyFont} size={bodySize} weight={600} lines={1}>
              {content.author}
            </Text>
            <Text field="site" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
              {content.site}
            </Text>
          </div>
        </div>
      </div>
    </CardRoot>
  );
}

export const portfolio: TemplateDef = {
  id: "portfolio",
  name: "Portfolio",
  description: "Case-study card with a browser window showing your screenshot.",
  category: "Product",
  fields: [
    { key: "eyebrow", label: "Label" },
    { key: "title", label: "Project" },
    { key: "subtitle", label: "Summary" },
    { key: "author", label: "Your name" },
    { key: "site", label: "Site" },
    { key: "image", label: "Screenshot" },
  ],
  parts: [{ key: "browser", label: "Browser window" }],
  palettes: [
    palette("studio", "Studio", { bg: "#efede8", fg: "#161513", muted: "#6d685f", accent: "#ff5b2e", surface: "#ffffff", line: "#dedad2" }),
    palette("cobalt", "Cobalt", { bg: "#e9efff", fg: "#0b1a33", muted: "#56637c", accent: "#2054d2", surface: "#ffffff", line: "#d3dcf2" }),
    palette("mint", "Mint", { bg: "#e3f4ec", fg: "#0b2a20", muted: "#4d6f62", accent: "#0f766e", surface: "#ffffff", line: "#cfe5da" }),
    palette("night", "Night", { bg: "#0f0f12", fg: "#f4f4f5", muted: "#8e8e98", accent: "#38bdf8", surface: "#18181b", line: "#26262b" }),
  ],
  defaults: { titleFont: "instrument-sans", bodyFont: "instrument-sans", titleSize: 70, bodySize: 22 },
  titleRange: [40, 100],
  bodyRange: [16, 30],
  sample: { eyebrow: "Case study", title: "Redesigning checkout for Pocketbank", subtitle: "Cut drop-off by 31% with a calmer, three-step flow.", author: "Ada Okafor", site: "ada.design" },
  Component: Portfolio,
};

function Minimal({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  return (
    <CardRoot width={width} height={height} style={style}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "60px 72px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {content.site ? <span style={{ width: 10, height: 10, borderRadius: 10, background: p.accent }} /> : null}
            <Text field="site" font={bodyFont} size={bodySize} color={p.muted} lines={1}>
              {content.site}
            </Text>
          </div>
          <Text field="date" font={bodyFont} size={bodySize} color={p.muted} lines={1}>
            {content.date}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 22, minHeight: 0, maxWidth: 920 }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={3} font={titleFont} weight={500} lineHeight={1.12} tracking="-0.02em" />
          {content.subtitle ? (
            <Text field="subtitle" font={bodyFont} size={bodySize + 2} color={p.muted} lines={2}>
              {content.subtitle}
            </Text>
          ) : null}
        </div>
        <div style={{ paddingTop: 20, borderTop: `1px solid ${p.line}` }}>
          <Text field="eyebrow" font={bodyFont} size={bodySize} color={p.muted} lines={1}>
            {content.eyebrow}
          </Text>
        </div>
      </div>
    </CardRoot>
  );
}

export const minimal: TemplateDef = {
  id: "minimal",
  name: "Minimal",
  description: "Quiet mono layout: lots of space, one accent dot.",
  category: "Developer",
  fields: [
    { key: "site", label: "Site" },
    { key: "date", label: "Date" },
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Subtitle" },
    { key: "eyebrow", label: "Footer" },
  ],
  palettes: [
    palette("paper", "Paper", { bg: "#fafaf9", fg: "#0a0a0a", muted: "#737373", accent: "#2054d2" }),
    palette("ink", "Ink", { bg: "#0a0a0a", fg: "#fafafa", muted: "#8a8a8a", accent: "#4f8cff" }),
    palette("sand", "Sand", { bg: "#efe9df", fg: "#2b241c", muted: "#7a6f60", accent: "#c2410c" }),
    palette("signal", "Signal", { bg: "#ffffff", fg: "#111111", muted: "#6b6b6b", accent: "#ff3b30" }),
  ],
  defaults: { titleFont: "geist-mono", bodyFont: "geist-mono", titleSize: 62, bodySize: 20 },
  titleRange: [36, 96],
  bodyRange: [14, 28],
  sample: { site: "notes.dev", date: "2026-11-11", title: "Things I learned writing a tiny database", subtitle: "B-trees, write-ahead logs and why fsync lies.", eyebrow: "Part 1 of 3" },
  Component: Minimal,
};
