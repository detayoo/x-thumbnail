"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/toolcraft/ui/lib/utils";

export type MenuItem =
  | { kind: "item"; label: string; shortcut?: string; danger?: boolean; disabled?: boolean; onSelect: () => void }
  | { kind: "separator" };

export function CanvasContextMenu({ x, y, items, onClose }: { x: number; y: number; items: MenuItem[]; onClose: () => void }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ left: x, top: y });

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setPos({ left: Math.min(x, window.innerWidth - width - 8), top: Math.min(y, window.innerHeight - height - 8) });
    el.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus();
  }, [x, y]);

  React.useEffect(() => {
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e.type === "pointerdown" && ref.current?.contains(e.target as Node)) return;
      onClose();
    };
    window.addEventListener("pointerdown", close, true);
    window.addEventListener("keydown", close);
    window.addEventListener("blur", onClose);
    return () => {
      window.removeEventListener("pointerdown", close, true);
      window.removeEventListener("keydown", close);
      window.removeEventListener("blur", onClose);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      role="menu"
      className="floating-popup-surface pointer-events-auto fixed z-[1000] min-w-52 [--floating-popup-surface-background:var(--popover)] rounded-lg border p-1 shadow-2xl"
      style={pos}
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
        e.preventDefault();
        const buttons = [...(ref.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? [])];
        const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
        buttons[(i + (e.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length]?.focus();
      }}
    >
      {items.map((item, i) =>
        item.kind === "separator" ? (
          <div key={i} className="my-1 h-px bg-[color:var(--tint-8)]" />
        ) : (
          <button
            key={i}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={() => {
              item.onSelect();
              onClose();
            }}
            className={cn(
              "flex h-7 w-full items-center justify-between gap-6 rounded-md px-2 text-left text-xs-plus outline-none",
              "hover:bg-[color:var(--accent)] hover:text-white focus-visible:bg-[color:var(--accent)] focus-visible:text-white disabled:opacity-40 disabled:hover:bg-transparent",
            )}
            style={item.danger ? { color: "var(--destructive)" } : undefined}
          >
            <span>{item.label}</span>
            {item.shortcut ? <span className="text-2xs opacity-55">{item.shortcut}</span> : null}
          </button>
        ),
      )}
    </div>,
    document.body,
  );
}
