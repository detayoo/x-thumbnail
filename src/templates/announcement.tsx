import { Absolute, CardRoot, Fit, Grain, Monogram, Part, Text } from "@/components/card/primitives";
import { resolveWeight } from "@/lib/fonts";
import { mix } from "@/lib/thumbnail/color";
import { lines } from "@/lib/thumbnail/content";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

function Version({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  return (
    <CardRoot width={width} height={height} style={style}>
      <Absolute style={{ inset: 0, background: `radial-gradient(80% 90% at 85% 50%, ${mix(p.accent, 0.35)}, transparent 70%)` }} />
      <Grain opacity={0.3} />
      {style.hidden.has("number") ? null : (
        <Part name="number">
          <div style={{ position: "absolute", right: 40, top: 0, bottom: 0, width: width - 580, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Fit field="stat" text={content.stat} max={style.titleSize} lines={1} font={titleFont} weight={800} lineHeight={0.9} tracking="-0.06em" color={mix(p.fg, 0.95)} textAlign="right" balance={false} />
          </div>
        </Part>
      )}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", width: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {content.site ? <span style={{ width: 14, height: 14, borderRadius: 4, background: p.accent }} /> : null}
          <Text field="site" font={bodyFont} size={bodySize} weight={600} lines={1}>
            {content.site}
          </Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Text field="eyebrow" font={bodyFont} size={bodySize - 2} weight={600} uppercase tracking="0.14em" color={p.accent} lines={1}>
            {content.eyebrow}
          </Text>
          <Fit field="title" text={content.title} max={64} min={34} lines={3} font={bodyFont} weight={650} lineHeight={1.08} tracking="-0.03em" />
          <Text field="date" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
            {content.date}
          </Text>
        </div>
      </div>
    </CardRoot>
  );
}

export const version: TemplateDef = {
  id: "version",
  name: "Version",
  description: "Major release announcement with a huge glowing version number.",
  category: "Announcement",
  fields: [
    { key: "stat", label: "Version" },
    { key: "eyebrow", label: "Label" },
    { key: "title", label: "Headline" },
    { key: "date", label: "Date" },
    { key: "site", label: "Product" },
  ],
  parts: [{ key: "number", label: "Version number" }],
  palettes: [
    palette("cobalt", "Cobalt", { bg: "#050a1a", fg: "#f2f6ff", muted: "#8d9bc0", accent: "#2f6bff" }),
    palette("ember", "Ember", { bg: "#120805", fg: "#fff4ee", muted: "#b59383", accent: "#ff5a1f" }),
    palette("jade", "Jade", { bg: "#04140f", fg: "#ecfff7", muted: "#86b3a2", accent: "#10b981" }),
    palette("paper", "Paper", { bg: "#f5f6f8", fg: "#0b0f19", muted: "#5b6475", accent: "#2054d2" }),
  ],
  defaults: { titleFont: "geist", bodyFont: "geist", titleSize: 340, bodySize: 22 },
  titleRange: [160, 440],
  bodyRange: [16, 30],
  sample: { stat: "3.0", eyebrow: "Major release", title: "Rebuilt from the ground up, twice as fast", date: "Available today", site: "Northwind" },
  Component: Version,
};

function Hiring({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const chips = lines(content.subtitle, 4);
  return (
    <CardRoot width={width} height={height} style={style}>
      {style.hidden.has("shapes") ? null : (
        <Part name="shapes">
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 360 }}>
            <div style={{ position: "absolute", right: 60, top: 70, width: 220, height: 220, borderRadius: "50%", background: p.accent }} />
            <div style={{ position: "absolute", right: 170, top: 250, width: 180, height: 180, borderRadius: 32, background: p.colors[1] ?? p.accent, transform: "rotate(12deg)" }} />
            <div style={{ position: "absolute", right: 40, bottom: 60, width: 150, height: 150, borderRadius: "0 0 150px 0", background: p.colors[2] ?? p.accent }} />
          </div>
        </Part>
      )}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: "60px 72px", width: 820, gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Monogram name={content.site} size={44} bg={p.fg} fg={p.bg} font={bodyFont} />
          <Text field="site" font={bodyFont} size={bodySize} weight={600} lines={1}>
            {content.site}
          </Text>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18, minHeight: 0 }}>
          <Text field="eyebrow" font={bodyFont} size={bodySize} weight={600} color={p.muted} lines={1}>
            {content.eyebrow}
          </Text>
          <Fit field="title" text={content.title} max={style.titleSize} lines={2} font={titleFont} weight={800} lineHeight={1.02} tracking="-0.04em" />
        </div>
        {chips.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {chips.map((chip, i) => (
              <div key={i} style={{ padding: "10px 18px", borderRadius: 999, border: `1.5px solid ${p.line}`, background: p.surface }}>
                <Text font={bodyFont} size={bodySize - 2} weight={500} lines={1}>
                  {chip}
                </Text>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </CardRoot>
  );
}

export const hiring: TemplateDef = {
  id: "hiring",
  name: "Hiring",
  description: "Open role card with tags for location, type and team.",
  category: "Announcement",
  fields: [
    { key: "eyebrow", label: "Intro" },
    { key: "title", label: "Role" },
    { key: "subtitle", label: "Tags", multiline: true, hint: "One per line, up to four." },
    { key: "site", label: "Company" },
  ],
  parts: [{ key: "shapes", label: "Shapes" }],
  palettes: [
    palette("sunny", "Sunny", { bg: "#fffaf0", fg: "#1c1408", muted: "#7a6a4f", accent: "#ffb703", surface: "#ffffff", colors: ["#ffb703", "#fb5607", "#219ebc"] }),
    palette("cool", "Cool", { bg: "#f2f7ff", fg: "#0b1a33", muted: "#5b6b85", accent: "#2054d2", surface: "#ffffff", colors: ["#2054d2", "#38bdf8", "#22c55e"] }),
    palette("night", "Night", { bg: "#0d0f14", fg: "#f4f5f7", muted: "#8b90a0", accent: "#22d3ee", surface: "#151821", colors: ["#22d3ee", "#f59e0b", "#ef4444"] }),
  ],
  defaults: { titleFont: "bricolage-grotesque", bodyFont: "geist", titleSize: 96, bodySize: 22 },
  titleRange: [48, 130],
  bodyRange: [16, 30],
  sample: { eyebrow: "We're hiring", title: "Senior Frontend Engineer", subtitle: "Remote · Africa & Europe\nFull-time\nDesign systems team", site: "Northwind" },
  Component: Hiring,
};

function parseDate(text: string) {
  const d = new Date(text);
  if (Number.isNaN(d.getTime())) return null;
  return {
    day: String(d.getDate()),
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    rest: `${d.toLocaleString("en-US", { weekday: "long" })} · ${d.getFullYear()}`,
  };
}

function EventCard({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const date = parseDate(content.date);
  const stub = 300;
  return (
    <CardRoot width={width} height={height} style={style}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: stub, background: p.accent, color: p.accentFg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
        {date ? (
          <>
            <span style={{ fontFamily: bodyFont.family, fontWeight: resolveWeight(bodyFont, 600), fontSize: 30, letterSpacing: "0.2em" }}>{date.month}</span>
            <span style={{ fontFamily: titleFont.family, fontWeight: resolveWeight(titleFont, 800), fontSize: 168, lineHeight: 0.9, letterSpacing: "-0.04em" }}>{date.day}</span>
            <span style={{ fontFamily: bodyFont.family, fontSize: 22, opacity: 0.8 }}>{date.rest}</span>
          </>
        ) : (
          <div style={{ padding: "0 28px", width: "100%" }}>
            <Fit field="date" text={content.date} max={60} lines={3} font={titleFont} weight={800} lineHeight={1} textAlign="center" color={p.accentFg} />
          </div>
        )}
      </div>
      <div aria-hidden style={{ position: "absolute", left: stub - 1, top: 30, bottom: 30, borderLeft: `3px dashed ${mix(p.fg, 0.18)}` }} />
      {[-26, height - 26].map((top) => (
        <div key={top} aria-hidden style={{ position: "absolute", left: stub - 26, top, width: 52, height: 52, borderRadius: "50%", background: p.bg }} />
      ))}
      <div style={{ position: "relative", marginLeft: stub, flex: 1, display: "flex", flexDirection: "column", padding: "56px 64px", gap: 18 }}>
        <Text field="eyebrow" font={bodyFont} size={bodySize} weight={600} uppercase tracking="0.14em" color={p.accent} lines={1}>
          {content.eyebrow}
        </Text>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0 }}>
          <Fit field="title" text={content.title} max={style.titleSize} lines={3} font={titleFont} weight={700} lineHeight={1.04} tracking="-0.03em" />
        </div>
        {content.author ? (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Monogram name={content.author} size={52} bg={p.fg} fg={p.bg} font={bodyFont} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
              <Text field="author" font={bodyFont} size={bodySize + 2} weight={600} lines={1}>
                {content.author}
              </Text>
              <Text field="role" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
                {content.role}
              </Text>
            </div>
          </div>
        ) : null}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, paddingTop: 16, borderTop: `1.5px solid ${p.line}` }}>
          <Text field="subtitle" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
            {content.subtitle}
          </Text>
          <Text field="site" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
            {content.site}
          </Text>
        </div>
      </div>
    </CardRoot>
  );
}

export const event: TemplateDef = {
  id: "event",
  name: "Event",
  description: "Ticket-style talk or meetup card with a big date stub and speaker.",
  category: "Announcement",
  fields: [
    { key: "date", label: "Date" },
    { key: "eyebrow", label: "Event" },
    { key: "title", label: "Talk title" },
    { key: "author", label: "Speaker" },
    { key: "role", label: "Speaker role" },
    { key: "subtitle", label: "Venue" },
    { key: "site", label: "Tickets link" },
  ],
  palettes: [
    palette("ticket", "Ticket", { bg: "#f4ecdc", fg: "#1b1712", muted: "#6f6455", accent: "#e4572e", accentFg: "#fff7ee" }),
    palette("night", "Night", { bg: "#0e0e10", fg: "#f4f4f5", muted: "#8f8f99", accent: "#c6ff3d", accentFg: "#0e0e10" }),
    palette("ocean", "Ocean", { bg: "#0d2b45", fg: "#eaf4ff", muted: "#9ab4cc", accent: "#ffb84d", accentFg: "#2b1700" }),
    palette("cobalt", "Cobalt", { bg: "#f1f5ff", fg: "#0b1a33", muted: "#5b6b85", accent: "#2054d2", accentFg: "#ffffff" }),
  ],
  defaults: { titleFont: "space-grotesk", bodyFont: "geist", titleSize: 72, bodySize: 22 },
  titleRange: [40, 100],
  bodyRange: [16, 28],
  sample: {
    date: "Dec 5, 2026",
    eyebrow: "Frontend Lagos 2026",
    title: "Building interfaces that feel instant",
    author: "Tobi Lawal",
    role: "Staff Engineer, Northwind",
    subtitle: "Landmark Centre, Lagos",
    site: "frontendlagos.dev",
  },
  Component: EventCard,
};

function Milestone({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const confetti = Array.from({ length: 60 }, (_, i) => ({
    x: (i * 137) % 100,
    y: (i * 61) % 100,
    r: (i * 47) % 360,
    c: p.colors[i % p.colors.length],
    w: 12 + (i % 3) * 6,
  }))
    .filter((c) => c.x < 14 || c.x > 86 || c.y < 12 || c.y > 88)
    .slice(0, 30);
  return (
    <CardRoot width={width} height={height} style={style}>
      {style.hidden.has("confetti") ? null : (
        <Part name="confetti">
          <div style={{ position: "absolute", inset: 0 }}>
            {confetti.map((c, i) => (
              <span key={i} style={{ position: "absolute", left: `${c.x}%`, top: `${c.y}%`, width: c.w, height: c.w / 2.4, borderRadius: 2, background: c.c, transform: `rotate(${c.r}deg)`, opacity: 0.9 }} />
            ))}
          </div>
        </Part>
      )}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "56px 120px", gap: 10 }}>
        <Text field="eyebrow" font={bodyFont} size={bodySize} weight={600} uppercase tracking="0.16em" color={p.muted} lines={1}>
          {content.eyebrow}
        </Text>
        <div style={{ width: "100%" }}>
          <Fit field="stat" text={content.stat} max={style.titleSize} lines={1} font={titleFont} weight={800} lineHeight={1} tracking="-0.05em" color={p.accent} textAlign="center" balance={false} />
        </div>
        <div style={{ width: "100%" }}>
          <Fit field="title" text={content.title} max={52} min={30} lines={2} font={bodyFont} weight={600} lineHeight={1.12} tracking="-0.02em" textAlign="center" />
        </div>
        <div style={{ marginTop: 18 }}>
          <Text field="site" font={bodyFont} size={bodySize - 2} color={p.muted} lines={1}>
            {content.site}
          </Text>
        </div>
      </div>
    </CardRoot>
  );
}

export const milestone: TemplateDef = {
  id: "milestone",
  name: "Milestone",
  description: "Celebrate a number: users, stars, revenue or a funding round.",
  category: "Announcement",
  fields: [
    { key: "eyebrow", label: "Label" },
    { key: "stat", label: "Number" },
    { key: "title", label: "Message" },
    { key: "site", label: "Brand" },
  ],
  parts: [{ key: "confetti", label: "Confetti" }],
  palettes: [
    palette("cream", "Cream", { bg: "#fffaf2", fg: "#1a1410", muted: "#7a6c5c", accent: "#2054d2", colors: ["#2054d2", "#ffb703", "#fb5607", "#22c55e"] }),
    palette("night", "Night", { bg: "#0a0b10", fg: "#f5f6fa", muted: "#8b8fa3", accent: "#fbbf24", colors: ["#fbbf24", "#38bdf8", "#f87171", "#34d399"] }),
    palette("mint", "Mint", { bg: "#ecfdf5", fg: "#062b1f", muted: "#4d7466", accent: "#059669", colors: ["#059669", "#2054d2", "#f59e0b", "#ef4444"] }),
  ],
  defaults: { titleFont: "bricolage-grotesque", bodyFont: "geist", titleSize: 220, bodySize: 22 },
  titleRange: [100, 300],
  bodyRange: [16, 30],
  sample: { eyebrow: "Thank you", stat: "100,000", title: "developers now ship with Northwind", site: "northwind.dev" },
  Component: Milestone,
};
