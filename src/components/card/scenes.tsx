import * as React from "react";

const fill: React.CSSProperties = { position: "absolute", inset: 0, pointerEvents: "none" };

export function Photo({ src, focus = "center" }: { src: string; focus?: string }) {
  return <div aria-hidden style={{ ...fill, backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: `center ${focus}` }} />;
}

const CLOUDS = [
  [8, 62, 420, 120],
  [30, 70, 520, 150],
  [62, 58, 460, 130],
  [88, 68, 380, 120],
  [18, 30, 300, 80],
  [74, 26, 340, 90],
  [48, 84, 700, 170],
  [4, 90, 520, 150],
  [96, 88, 560, 160],
] as const;

export function Sky({ top, bottom, cloud = "#ffffff", glow }: { top: string; bottom: string; cloud?: string; glow?: string }) {
  const clouds = CLOUDS.map(([x, y, w, h]) => `radial-gradient(${w / 2}px ${h / 2}px at ${x}% ${y}%, ${cloud} 0%, transparent 100%)`).join(", ");
  return (
    <div aria-hidden style={fill}>
      <div style={{ ...fill, background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)` }} />
      {glow ? <div style={{ ...fill, background: `radial-gradient(60% 50% at 50% 100%, ${glow}, transparent)` }} /> : null}
      <div style={{ ...fill, background: clouds, opacity: 0.85, filter: "blur(14px)" }} />
      <div style={{ ...fill, background: clouds, opacity: 0.55, transform: "translate(40px, 18px) scale(0.8)", filter: "blur(4px)" }} />
    </div>
  );
}

export function Hills({ sky, layers, sun }: { sky: [string, string]; layers: readonly string[]; sun?: string }) {
  const shapes = [
    "polygon(0% 62%, 14% 48%, 26% 58%, 41% 38%, 55% 55%, 68% 44%, 83% 57%, 100% 42%, 100% 100%, 0% 100%)",
    "polygon(0% 74%, 18% 62%, 33% 72%, 50% 60%, 64% 70%, 80% 58%, 100% 70%, 100% 100%, 0% 100%)",
    "polygon(0% 86%, 22% 78%, 44% 86%, 63% 76%, 82% 84%, 100% 78%, 100% 100%, 0% 100%)",
  ];
  return (
    <div aria-hidden style={fill}>
      <div style={{ ...fill, background: `linear-gradient(180deg, ${sky[0]}, ${sky[1]})` }} />
      {sun ? <div style={{ position: "absolute", left: "62%", top: "18%", width: 180, height: 180, borderRadius: "50%", background: sun, filter: "blur(2px)", boxShadow: `0 0 120px 40px ${sun}` }} /> : null}
      {layers.slice(0, 3).map((c, i) => (
        <div key={i} style={{ ...fill, background: c, clipPath: shapes[i] }} />
      ))}
    </div>
  );
}

export function Bokeh({ base, colors }: { base: string; colors: readonly string[] }) {
  const spots = [
    [18, 30, 520],
    [70, 22, 440],
    [52, 78, 620],
    [88, 70, 380],
    [30, 86, 300],
  ];
  return (
    <div aria-hidden style={{ ...fill, background: base }}>
      {spots.map(([x, y, d], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: d,
            height: d,
            marginLeft: -d / 2,
            marginTop: -d / 2,
            borderRadius: "50%",
            background: colors[i % colors.length],
            opacity: 0.85,
            filter: "blur(70px)",
          }}
        />
      ))}
    </div>
  );
}

export function Studio({ base, light }: { base: string; light: string }) {
  return (
    <div aria-hidden style={{ ...fill, background: `radial-gradient(70% 90% at 50% 20%, ${light}, ${base} 70%)` }}>
      <div style={{ position: "absolute", left: "50%", bottom: "8%", width: "70%", height: 60, marginLeft: "-35%", borderRadius: "50%", background: "rgba(0,0,0,0.35)", filter: "blur(30px)" }} />
    </div>
  );
}
