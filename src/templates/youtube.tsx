import { Absolute, CardRoot, Fit, Grain, Part, Text } from "@/components/card/primitives";
import { Hills, Photo, Sky, Studio } from "@/components/card/scenes";
import { resolveWeight } from "@/lib/fonts";
import { mix } from "@/lib/thumbnail/color";
import { palette } from "@/lib/thumbnail/style";
import type { TemplateDef, TemplateProps } from "@/lib/thumbnail/types";

const shadow = "0 2px 4px rgba(0,0,0,0.25), 0 8px 40px rgba(0,0,0,0.35)";

function Documentary({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont } = style;
  const centred = style.options.position === "centre";
  const [skyTop, skyBottom, h1, h2, h3] = p.colors;
  return (
    <CardRoot width={width} height={height} style={style}>
      {content.image ? <Photo src={content.image} focus={style.options.focus} /> : <Hills sky={[skyTop, skyBottom]} layers={[h1, h2, h3]} sun={p.accent} />}
      <Absolute
        style={{
          inset: 0,
          background: centred
            ? "radial-gradient(70% 60% at 50% 50%, rgba(0,0,0,0.38), rgba(0,0,0,0.08))"
            : "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.62) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: centred ? "center" : "flex-end",
          alignItems: centred ? "center" : "flex-start",
          padding: centred ? "80px 120px" : "72px 84px",
        }}
      >
        <div style={{ width: centred ? "100%" : 900 }}>
          <Fit
            field="title" text={content.title}
            max={style.titleSize}
            lines={2}
            font={titleFont}
            weight={800}
            lineHeight={1}
            tracking="-0.025em"
            color="#ffffff"
            textAlign={centred ? "center" : "left"}
            style={{ textShadow: shadow }}
          />
        </div>
      </div>
    </CardRoot>
  );
}

export const documentary: TemplateDef = {
  id: "documentary",
  name: "Documentary",
  description: "Full-bleed photo with a big, heavy white headline. Made for video thumbnails.",
  category: "YouTube",
  preferredFormat: "youtube",
  fields: [
    { key: "image", label: "Photo" },
    { key: "title", label: "Headline" },
  ],
  palettes: [
    palette("alpine", "Alpine", { bg: "#2b4a6b", fg: "#ffffff", accent: "#ffe2b0", colors: ["#6f9fd2", "#d9e4ee", "#5d7896", "#3e5872", "#22364a"] }),
    palette("desert", "Desert", { bg: "#7a4a2a", fg: "#ffffff", accent: "#ffd27a", colors: ["#f2a25c", "#ffe0b0", "#c47a45", "#93512c", "#5c2f18"] }),
    palette("forest", "Forest", { bg: "#1f3a2a", fg: "#ffffff", accent: "#fff3c4", colors: ["#9cc7b5", "#e6f0dd", "#4f7a5f", "#2f5340", "#173022"] }),
    palette("night", "Night", { bg: "#0b1424", fg: "#ffffff", accent: "#f4f1d0", colors: ["#0d1b33", "#2b4470", "#1b2b47", "#121e34", "#080f1d"] }),
  ],
  defaults: { titleFont: "figtree", bodyFont: "figtree", titleSize: 132, bodySize: 28 },
  titleRange: [72, 180],
  bodyRange: [18, 40],
  options: [
    {
      key: "position",
      label: "Headline",
      choices: [
        { label: "Bottom left", value: "bottom" },
        { label: "Centre", value: "centre" },
      ],
      defaultValue: "bottom",
    },
    {
      key: "focus",
      label: "Photo focus",
      choices: [
        { label: "Top", value: "top" },
        { label: "Centre", value: "center" },
        { label: "Bottom", value: "bottom" },
      ],
      defaultValue: "center",
    },
  ],
  sample: { title: "Inside the studio that builds tiny tools" },
  Component: Documentary,
};

function SerifSky({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const plain = style.options.backdrop === "plain";
  const [top, bottom, glow] = p.colors;
  return (
    <CardRoot width={width} height={height} style={style}>
      {plain ? null : content.image ? <Photo src={content.image} /> : <Sky top={top} bottom={bottom} glow={glow} />}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 22, padding: "0 120px" }}>
        {content.eyebrow ? (
          <Text field="eyebrow" font={bodyFont} size={bodySize} weight={500} uppercase tracking="0.18em" color={plain ? p.muted : mix(p.fg, 0.85)} lines={1}>
            {content.eyebrow}
          </Text>
        ) : null}
        <div style={{ width: "100%" }}>
          <Fit
            field="title" text={content.title}
            max={style.titleSize}
            lines={2}
            font={titleFont}
            weight={400}
            lineHeight={1.02}
            tracking="-0.02em"
            textAlign="center"
            color={p.fg}
            style={plain ? undefined : { textShadow: "0 2px 30px rgba(0,0,0,0.18)" }}
          />
        </div>
      </div>
    </CardRoot>
  );
}

export const serifSky: TemplateDef = {
  id: "serif-sky",
  name: "Serif Sky",
  description: "Calm launch thumbnail: a centred serif title over a painterly sky.",
  category: "YouTube",
  preferredFormat: "youtube",
  fields: [
    { key: "eyebrow", label: "Label" },
    { key: "title", label: "Title" },
    { key: "image", label: "Backdrop" },
  ],
  palettes: [
    palette("day", "Day", { bg: "#5e93d1", fg: "#ffffff", muted: "#e8f0fa", accent: "#ffffff", colors: ["#3f7fcf", "#b9d4ef", "rgba(255,214,170,0.55)"] }),
    palette("golden", "Golden", { bg: "#d98a5c", fg: "#ffffff", muted: "#fff1e6", accent: "#ffffff", colors: ["#6b8fc7", "#f2b48a", "rgba(255,190,120,0.7)"] }),
    palette("ivory", "Ivory", { bg: "#f0eee6", fg: "#141413", muted: "#6b6a64", accent: "#d97757", colors: ["#f0eee6", "#f0eee6", "transparent"] }),
    palette("night", "Night", { bg: "#0d1b33", fg: "#f3f6ff", muted: "#b9c6e4", accent: "#ffffff", colors: ["#081226", "#24426e", "rgba(120,160,230,0.35)"] }),
  ],
  defaults: { titleFont: "newsreader", bodyFont: "dm-sans", titleSize: 136, bodySize: 24 },
  titleRange: [72, 190],
  bodyRange: [16, 36],
  options: [
    {
      key: "backdrop",
      label: "Backdrop",
      choices: [
        { label: "Sky", value: "sky" },
        { label: "Plain", value: "plain" },
      ],
      defaultValue: "sky",
    },
  ],
  sample: { eyebrow: "", title: "What the tide leaves behind" },
  Component: SerifSky,
};

function HotTake({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont } = style;
  const words = content.title.trim().split(/\n|\s+/).filter(Boolean);
  const half = Math.ceil(words.length / 2);
  const rows = words.length > 1 ? [words.slice(0, half).join(" "), words.slice(half).join(" ")] : [content.title];
  const textWidth = content.image ? 700 : 1000;

  return (
    <CardRoot width={width} height={height} style={style}>
      <Absolute style={{ inset: 0, background: `radial-gradient(${mix(p.fg, 0.07)} 1.5px, transparent 2px) 0 0 / 22px 22px` }} />
      {content.image ? (
        <Absolute style={{ top: 0, right: 0, bottom: 0, width: width * 0.5 }}>
          <Photo src={content.image} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${p.bg} 0%, transparent 45%)` }} />
        </Absolute>
      ) : (
        <Absolute style={{ right: -160, top: "50%", width: 720, height: 720, marginTop: -360, borderRadius: "50%", background: `radial-gradient(closest-side, ${mix(p.accent, 0.45)}, transparent)` }} />
      )}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 72px", gap: 6 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ width: textWidth }}>
            <Fit
              text={row.toUpperCase()}
              max={style.titleSize}
              lines={1}
              font={titleFont}
              weight={900}
              lineHeight={0.95}
              tracking="-0.01em"
              color={p.colors[i % p.colors.length]}
              balance={false}
              style={{ textShadow: `6px 6px 0 ${mix("#000000", 0.55)}` }}
            />
          </div>
        ))}
        {content.subtitle ? (
          <div style={{ marginTop: 14, marginLeft: 12, transform: "rotate(-3deg)", transformOrigin: "left center", fontFamily: bodyFont.family, fontWeight: resolveWeight(bodyFont, 700), fontSize: style.bodySize, color: p.fg, lineHeight: 1 }}>
            {content.subtitle}
          </div>
        ) : null}
      </div>
      {content.site ? (
        <div style={{ position: "absolute", left: 72, bottom: 44, padding: "8px 14px", borderRadius: 10, border: `2px solid ${mix(p.fg, 0.5)}`, background: mix("#000000", 0.4) }}>
          <Text field="site" font={titleFont} size={22} weight={700} uppercase tracking="0.04em" color={p.fg} lines={1}>
            {content.site}
          </Text>
        </div>
      ) : null}
    </CardRoot>
  );
}

export const hotTake: TemplateDef = {
  id: "hot-take",
  name: "Hot Take",
  description: "Loud two-colour stacked words, a scribbled aside and an optional photo.",
  category: "YouTube",
  preferredFormat: "youtube",
  fields: [
    { key: "title", label: "Big words", hint: "Two to four words work best." },
    { key: "subtitle", label: "Scribble" },
    { key: "image", label: "Photo" },
    { key: "site", label: "Badge" },
  ],
  palettes: [
    palette("signal", "Signal", { bg: "#101114", fg: "#ffffff", accent: "#ff4d4d", colors: ["#ff4d4d", "#ffd23f"] }),
    palette("terminal", "Terminal", { bg: "#0b120d", fg: "#ffffff", accent: "#39ff88", colors: ["#39ff88", "#ffffff"] }),
    palette("ice", "Ice", { bg: "#0b1220", fg: "#ffffff", accent: "#4cc9f0", colors: ["#4cc9f0", "#ffffff"] }),
    palette("sun", "Sun", { bg: "#140e07", fg: "#ffffff", accent: "#ff8a00", colors: ["#ff8a00", "#ffd23f"] }),
  ],
  defaults: { titleFont: "archivo-black", bodyFont: "caveat", titleSize: 190, bodySize: 64 },
  titleRange: [96, 240],
  bodyRange: [32, 96],
  sample: { title: "Frontend is back", subtitle: "...or is it?", site: "Code report" },
  Component: HotTake,
};

function Sticker({ content, style, width, height }: TemplateProps) {
  const { palette: p, titleFont, bodyFont, bodySize } = style;
  const right = style.options.side === "right";
  const fullBleed = style.options.photo === "full";
  const frameWidth = 480;
  const frameHeight = Math.round(height * 0.72);
  return (
    <CardRoot width={width} height={height} style={style}>
      {fullBleed && content.image ? <Photo src={content.image} /> : <Studio base={p.bg} light={p.colors[0]} />}
      {fullBleed || style.hidden.has("frame") ? null : (
        <Part name="frame">
          <div
            style={{
              position: "absolute",
              left: right ? 96 : width - 96 - frameWidth,
              top: (height - frameHeight) / 2,
              width: frameWidth,
              height: frameHeight,
              borderRadius: 40,
              overflow: "hidden",
              background: content.image ? mix(p.fg, 0.06) : `linear-gradient(160deg, ${mix(p.fg, 0.22)}, ${mix(p.fg, 0.04)})`,
              border: `2px solid ${mix(p.fg, 0.2)}`,
              boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
            }}
          >
            {content.image ? <Photo src={content.image} /> : null}
          </div>
        </Part>
      )}
      <div style={{ position: "absolute", top: 0, bottom: 0, [right ? "right" : "left"]: 72, width: 620, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: right ? "flex-end" : "flex-start", gap: 24 }}>
        <div style={{ transform: `rotate(${right ? 4 : -5}deg)`, width: "100%" }}>
          <Fit
            field="stat" text={content.stat}
            max={style.titleSize}
            lines={1}
            font={titleFont}
            weight={900}
            lineHeight={1}
            tracking="-0.02em"
            color={p.accent}
            textAlign={right ? "right" : "left"}
            balance={false}
            style={{ WebkitTextStroke: "12px #ffffff", paintOrder: "stroke fill", filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.35))" }}
          />
        </div>
        {content.title ? (
          <div style={{ padding: "10px 18px", borderRadius: 12, background: "rgba(0,0,0,0.6)", maxWidth: "100%" }}>
            <Text field="title" font={bodyFont} size={bodySize} weight={700} color="#ffffff" lines={1}>
              {content.title}
            </Text>
          </div>
        ) : null}
      </div>
      <Grain opacity={0.15} />
    </CardRoot>
  );
}

export const sticker: TemplateDef = {
  id: "sticker",
  name: "Sticker",
  description: "Photo-first thumbnail with one big outlined number or price.",
  category: "YouTube",
  preferredFormat: "youtube",
  fields: [
    { key: "image", label: "Photo" },
    { key: "stat", label: "Sticker", hint: "A price, score or number." },
    { key: "title", label: "Caption" },
  ],
  palettes: [
    palette("red", "Red", { bg: "#14161c", fg: "#ffffff", accent: "#ff3b30", colors: ["#3a4256"] }),
    palette("yellow", "Yellow", { bg: "#1a1710", fg: "#ffffff", accent: "#ffcc00", colors: ["#4f4630"] }),
    palette("green", "Green", { bg: "#0f1a14", fg: "#ffffff", accent: "#22c55e", colors: ["#2f4f3d"] }),
    palette("blue", "Blue", { bg: "#0d1526", fg: "#ffffff", accent: "#2f7bff", colors: ["#2d4269"] }),
  ],
  defaults: { titleFont: "archivo-black", bodyFont: "figtree", titleSize: 210, bodySize: 34 },
  titleRange: [100, 280],
  bodyRange: [20, 48],
  options: [
    {
      key: "side",
      label: "Sticker side",
      choices: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
      defaultValue: "left",
    },
    {
      key: "photo",
      label: "Photo",
      choices: [
        { label: "In frame", value: "frame" },
        { label: "Full bleed", value: "full" },
      ],
      defaultValue: "frame",
    },
  ],
  parts: [{ key: "frame", label: "Photo frame" }],
  sample: { stat: "$299", title: "Worth it?" },
  Component: Sticker,
};

