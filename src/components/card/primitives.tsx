"use client";

import * as React from "react";

import { resolveWeight, type FontDef } from "@/lib/fonts";
import { initials } from "@/lib/thumbnail/content";
import type { ResolvedStyle, TextKey } from "@/lib/thumbnail/types";

export type EditApi = { commit: (field: TextKey, value: string) => void };

export const EditContext = React.createContext<EditApi | null>(null);

function useEditable(field: TextKey | undefined, value: string) {
  const api = React.useContext(EditContext);
  const [version, setVersion] = React.useState(0);
  if (!api || !field) return { version, props: null };
  const finish = (el: HTMLElement, save: boolean) => {
    const next = el.innerText.replace(/\u00a0/g, " ").replace(/\n+$/, "");
    el.contentEditable = "false";
    el.removeAttribute("data-editing");
    if (save && next !== value) api.commit(field, next);
    setVersion((v) => v + 1);
  };
  const props = {
    "data-field": field,
    "data-editable": "",
    title: "Click to edit",
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      if (el.isContentEditable) return;
      e.stopPropagation();
      el.contentEditable = "plaintext-only";
      el.setAttribute("data-editing", "");
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (e.currentTarget.isContentEditable) finish(e.currentTarget, true);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      if (!e.currentTarget.isContentEditable) return;
      e.stopPropagation();
      if (e.key === "Escape") {
        e.preventDefault();
        const el = e.currentTarget;
        finish(el, false);
        el.blur();
      } else if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
  };
  return { version, props };
}

type Align = "start" | "center" | "end";

type FitProps = {
  text: string;
  max: number;
  min?: number;
  lines?: number;
  fill?: boolean;
  align?: Align;
  font: FontDef;
  weight?: number;
  italic?: boolean;
  lineHeight?: number;
  tracking?: string;
  balance?: boolean;
  uppercase?: boolean;
  color?: string;
  textAlign?: "left" | "center" | "right";
  style?: React.CSSProperties;
  suffix?: React.ReactNode;
  field?: TextKey;
};

const INK_PAD = 0.2;

const justify: Record<Align, string> = { start: "flex-start", center: "center", end: "flex-end" };

export function Fit({
  text,
  max,
  min,
  lines,
  fill = false,
  align = "start",
  font,
  weight = 400,
  italic = false,
  lineHeight = 1.05,
  tracking,
  balance = true,
  uppercase,
  color,
  textAlign,
  style,
  suffix,
  field,
}: FitProps) {
  const editable = useEditable(field, text);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const floor = Math.max(10, Math.round(min ?? max * 0.4));

  const fit = React.useCallback(() => {
    const box = boxRef.current;
    const el = textRef.current;
    if (!box || !el) return;
    const fits = (size: number) => {
      el.style.fontSize = `${size}px`;
      const overflowX = el.scrollWidth > el.clientWidth + 1;
      if (lines) return !overflowX && el.scrollHeight <= Math.ceil((lines * lineHeight + INK_PAD) * size) + 2;
      return !overflowX && el.scrollHeight <= box.clientHeight + 1;
    };
    if (fits(max)) return;
    let lo = floor;
    let hi = max;
    while (hi - lo > 1) {
      const mid = Math.floor((lo + hi) / 2);
      if (fits(mid)) lo = mid;
      else hi = mid;
    }
    el.style.fontSize = `${lo}px`;
  }, [max, floor, lines, lineHeight]);

  React.useLayoutEffect(() => {
    fit();
  }, [fit, text, font.family, weight, italic, tracking, uppercase, editable.version]);

  React.useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(() => fit());
    observer.observe(box);
    document.fonts.addEventListener("loadingdone", fit);
    return () => {
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", fit);
    };
  }, [fit]);

  const clamp = lines
    ? ({ display: "-webkit-box", WebkitLineClamp: lines, WebkitBoxOrient: "vertical", overflow: "hidden" } as const)
    : null;

  return (
    <div
      ref={boxRef}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: justify[align],
        minWidth: 0,
        minHeight: 0,
        ...(fill ? { flex: "1 1 0" } : null),
      }}
    >
      <div
        key={editable.version}
        ref={textRef}
        {...editable.props}
        style={{
          fontFamily: font.family,
          fontWeight: resolveWeight(font, weight),
          fontStyle: italic && font.italic ? "italic" : "normal",
          fontSize: max,
          lineHeight,
          letterSpacing: tracking,
          textWrap: balance ? "balance" : "pretty",
          overflowWrap: "break-word",
          textTransform: uppercase ? "uppercase" : undefined,
          textAlign,
          color,
          whiteSpace: "pre-line",
          paddingTop: `${INK_PAD / 2}em`,
          paddingBottom: `${INK_PAD / 2}em`,
          marginTop: `${-INK_PAD / 2}em`,
          marginBottom: `${-INK_PAD / 2}em`,
          ...clamp,
          ...style,
        }}
      >
        {text}
        {suffix}
      </div>
    </div>
  );
}

export function Text({
  children,
  font,
  size,
  weight = 400,
  color,
  tracking,
  uppercase,
  lines,
  lineHeight = 1.35,
  italic,
  style,
  field,
}: {
  children: React.ReactNode;
  field?: TextKey;
  font: FontDef;
  size: number;
  weight?: number;
  color?: string;
  tracking?: string;
  uppercase?: boolean;
  lines?: number;
  lineHeight?: number;
  italic?: boolean;
  style?: React.CSSProperties;
}) {
  const editable = useEditable(field, typeof children === "string" ? children : "");
  return (
    <div
      key={editable.version}
      {...editable.props}
      style={{
        fontFamily: font.family,
        fontWeight: resolveWeight(font, weight),
        fontStyle: italic && font.italic ? "italic" : "normal",
        fontSize: size,
        lineHeight,
        letterSpacing: tracking,
        textTransform: uppercase ? "uppercase" : undefined,
        color,
        textWrap: "pretty",
        overflowWrap: "break-word",
        whiteSpace: "pre-line",
        minWidth: 0,
        ...(lines
          ? { display: "-webkit-box", WebkitLineClamp: lines, WebkitBoxOrient: "vertical", overflow: "hidden" }
          : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardRoot({
  width,
  height,
  style,
  background,
  children,
}: {
  width: number;
  height: number;
  style: ResolvedStyle;
  background?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="card-root"
      data-card-root
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        background: background ?? style.palette.bg,
        color: style.palette.fg,
        fontFamily: style.bodyFont.family,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

let noiseUrl: string | null = null;

function noise() {
  if (noiseUrl) return noiseUrl;
  const size = 220;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(size, size);
  let seed = 20261111;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < img.data.length; i += 4) {
    const v = rand() > 0.5 ? 255 : 0;
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = Math.round(rand() * 46);
  }
  ctx.putImageData(img, 0, 0);
  noiseUrl = canvas.toDataURL("image/png");
  return noiseUrl;
}

export function Grain({ opacity = 0.5 }: { opacity?: number }) {
  const [url] = React.useState(() => (typeof document === "undefined" ? "" : noise()));
  if (!url) return null;
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${url})`,
        backgroundSize: "220px 220px",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
}

export function Monogram({
  name,
  size = 56,
  bg,
  fg,
  font,
  ring,
}: {
  name: string;
  size?: number;
  bg: string;
  fg: string;
  font: FontDef;
  ring?: string;
}) {
  const letters = initials(name);
  if (!letters) return null;
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: size,
        background: bg,
        color: fg,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        fontFamily: font.family,
        fontWeight: resolveWeight(font, 600),
        fontSize: size * 0.38,
        letterSpacing: "0.02em",
        boxShadow: ring ? `0 0 0 3px ${ring}` : undefined,
      }}
    >
      {letters}
    </div>
  );
}

export function Absolute({ style, children }: { style: React.CSSProperties; children?: React.ReactNode }) {
  return <div aria-hidden style={{ position: "absolute", pointerEvents: "none", ...style }}>{children}</div>;
}
