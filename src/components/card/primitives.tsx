"use client";

import * as React from "react";

import { resolveWeight, type FontDef } from "@/lib/fonts";
import { initials } from "@/lib/thumbnail/content";
import type { ElementLayout, ResolvedStyle, TextKey } from "@/lib/thumbnail/types";

export type EditApi = {
  commit: (field: TextKey, value: string) => void;
  select: (key: string | null) => void;
  move: (key: string, to: { x: number; y: number }) => void;
  selected: string | null;
  scale: number;
};

export const EditContext = React.createContext<EditApi | null>(null);

export const LayoutContext = React.createContext<Readonly<Record<string, ElementLayout>>>({});

function useLayoutStyle(key: string | undefined): React.CSSProperties {
  const layout = React.useContext(LayoutContext);
  const l = key ? layout[key] : undefined;
  if (!l) return {};
  return {
    ...(l.x || l.y ? { translate: `${l.x ?? 0}px ${l.y ?? 0}px` } : null),
    ...(l.align ? { textAlign: l.align } : null),
  };
}

function useDrag(key: string | undefined) {
  const api = React.useContext(EditContext);
  const layout = React.useContext(LayoutContext);
  const dragged = React.useRef(false);
  if (!api || !key) return null;
  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0 || e.currentTarget.isContentEditable) return;
    const el = e.currentTarget;
    const start = { x: e.clientX, y: e.clientY };
    const base = { x: layout[key]?.x ?? 0, y: layout[key]?.y ?? 0 };
    let last: { x: number; y: number } | null = null;
    dragged.current = false;
    const move = (ev: PointerEvent) => {
      if (!dragged.current && Math.hypot(ev.clientX - start.x, ev.clientY - start.y) < 4) return;
      if (!dragged.current) {
        dragged.current = true;
        api.select(key);
        el.setAttribute("data-dragging", "");
      }
      const dx = (ev.clientX - start.x) / api.scale;
      const dy = (ev.clientY - start.y) / api.scale;
      const lockY = ev.shiftKey && Math.abs(dx) > Math.abs(dy);
      const lockX = ev.shiftKey && !lockY;
      last = { x: Math.round(base.x + (lockX ? 0 : dx)), y: Math.round(base.y + (lockY ? 0 : dy)) };
      el.style.translate = `${last.x}px ${last.y}px`;
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      el.removeAttribute("data-dragging");
      if (dragged.current && last) api.move(key, last);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up, { once: true });
  };
  const consumeDrag = () => {
    const was = dragged.current;
    dragged.current = false;
    return was;
  };
  return { onPointerDown, consumeDrag };
}

function useEditable(field: TextKey | undefined, value: string) {
  const api = React.useContext(EditContext);
  const [version, setVersion] = React.useState(0);
  const drag = useDrag(field);
  const layoutStyle = useLayoutStyle(field);
  if (!api || !field || !drag) return { version, props: null, layoutStyle };
  const finish = (el: HTMLElement, save: boolean) => {
    const next = el.innerText.replace(/\u00a0/g, " ").replace(/\n+$/, "");
    el.contentEditable = "false";
    el.removeAttribute("data-editing");
    if (save && next !== value) api.commit(field, next);
    setVersion((v) => v + 1);
  };
  const startEdit = (el: HTMLElement) => {
    api.select(field);
    el.contentEditable = "plaintext-only";
    el.setAttribute("data-editing", "");
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };
  const props = {
    "data-field": field,
    "data-editable": "",
    "data-selected": api.selected === field ? "" : undefined,
    onPointerDown: drag.onPointerDown,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      e.stopPropagation();
      if (drag.consumeDrag() || el.isContentEditable) return;
      if (api.selected === field) startEdit(el);
      else api.select(field);
    },
    onDoubleClick: (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (!e.currentTarget.isContentEditable) startEdit(e.currentTarget);
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
  return { version, props, layoutStyle };
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

function countLines(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const tops = [...range.getClientRects()].filter((r) => r.width > 0).map((r) => r.top).sort((a, b) => a - b);
  let count = 0;
  let last = -Infinity;
  for (const top of tops) {
    if (top - last > 2) count += 1;
    last = top;
  }
  return Math.max(count, 1);
}

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
      if (lines) return !overflowX && countLines(el) <= lines;
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
          ...editable.layoutStyle,
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
        ...editable.layoutStyle,
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
      <LayoutContext.Provider value={style.layout}>{children}</LayoutContext.Provider>
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

export function Part({ name, children }: { name: string; children: React.ReactElement<{ style?: React.CSSProperties }> }) {
  const api = React.useContext(EditContext);
  const drag = useDrag(name);
  const layoutStyle = useLayoutStyle(name);
  const style = { ...children.props.style, ...layoutStyle };
  if (!api || !drag) return React.cloneElement(children, { style });
  return React.cloneElement(children, {
    style,
    "data-part": name,
    "data-selected": api.selected === name ? "" : undefined,
    onPointerDown: drag.onPointerDown,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      if (drag.consumeDrag()) return;
      api.select(name);
    },
  } as Record<string, unknown>);
}
