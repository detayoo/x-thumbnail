"use client";

import * as React from "react";

import { Toaster, TooltipProvider } from "@/toolcraft/ui";
import { useEditor } from "@/store/editor";
import { Stage } from "./stage";
import { TemplatesPanel } from "./templates-panel";
import { PropertiesPanel } from "./properties-panel";
import { MiniHeader, stepZoom } from "./mini-header";
import { Toolbar } from "./toolbar";
import { copyPng, exportPng } from "./export-actions";
import { applyTheme, useTheme } from "./use-theme";
import { MobileNotice, useIsPhone } from "./mobile-notice";

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));

const subscribeNoop = () => () => {};

function useIsClient() {
  return React.useSyncExternalStore(subscribeNoop, () => true, () => false);
}

export function Editor() {
  const isClient = useIsClient();
  const isPhone = useIsPhone();
  const [continueOnPhone, setContinueOnPhone] = React.useState(false);
  if (!isClient) return <main className="fixed inset-0" style={{ background: "var(--canvas)" }} />;
  if (isPhone && !continueOnPhone) {
    return (
      <>
        <MobileNotice onContinue={() => setContinueOnPhone(true)} />
        <Toaster position="top-center" />
      </>
    );
  }
  return <EditorApp />;
}

const SHORTCUTS: [string, string][] = [
  ["Previous / next template", "[ / ]"],
  ["Next palette", "P"],
  ["Safe area guides", "G"],
  ["Edit selected text", "Enter or double-click"],
  ["Hide selected element", "⌫"],
  ["Download PNG", "⌘ E"],
  ["Download PNG 2×", "⇧ ⌘ E"],
  ["Copy image", "⇧ ⌘ C"],
  ["Light / dark mode", "⇧ D"],
  ["Undo / redo", "⌘ Z / ⇧ ⌘ Z"],
  ["Zoom to fit", "⇧ 1"],
  ["Zoom 100%", "⇧ 0"],
  ["Zoom in / out", "⌘ + / ⌘ −"],
];

function EditorApp() {
  const [theme] = useTheme();
  const hydrated = useEditor((s) => s.hydrated);
  const [showHelp, setShowHelp] = React.useState(false);

  React.useEffect(() => {
    useEditor.getState().hydrate();
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = useEditor.getState();
      const mod = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();

      if (mod && key === "e") {
        e.preventDefault();
        exportPng(e.shiftKey ? 2 : 1);
        return;
      }
      if (mod && e.shiftKey && key === "c") {
        e.preventDefault();
        copyPng();
        return;
      }
      if (isTyping(e.target)) return;
      if (mod && key === "z") {
        e.preventDefault();
        if (e.shiftKey) s.redo();
        else s.undo();
        return;
      }
      if (mod && key === "y") {
        e.preventDefault();
        s.redo();
        return;
      }
      if (mod && (key === "=" || key === "+")) {
        e.preventDefault();
        stepZoom(1);
        return;
      }
      if (mod && key === "-") {
        e.preventDefault();
        stepZoom(-1);
        return;
      }
      if (mod || e.altKey) return;
      if (e.shiftKey && (e.code === "Digit1" || key === "!")) s.setZoom("fit");
      else if (e.shiftKey && (e.code === "Digit0" || key === ")")) s.setZoom(1);
      else if (e.shiftKey && key === "d") applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
      else if (key === "[") s.stepTemplate(-1);
      else if (key === "]") s.stepTemplate(1);
      else if (key === "p") s.shufflePalette();
      else if (key === "g") s.toggleSafeArea();
      else if (key === "?") setShowHelp((v) => !v);
      else if (key === "escape") {
        setShowHelp(false);
        s.select(null);
      } else if ((key === "backspace" || key === "delete") && s.selected) {
        e.preventDefault();
        s.setHidden(s.selected, true);
      } else if (key === "enter" && s.selected) {
        const el = document.querySelector(`[data-stage] [data-field="${s.selected}"]`);
        if (el) {
          e.preventDefault();
          el.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <TooltipProvider delay={350}>
      <main className="fixed inset-0 overflow-hidden" data-hydrated={hydrated}>
        {hydrated ? <Stage /> : <div className="absolute inset-0" style={{ background: "var(--canvas)" }} />}
        <div className="pointer-events-none absolute inset-0">
          {hydrated ? (
            <>
              <TemplatesPanel />
              <PropertiesPanel />
              <Toolbar />
            </>
          ) : null}
          <MiniHeader onHelp={() => setShowHelp((v) => !v)} />
          {showHelp ? <ShortcutSheet onClose={() => setShowHelp(false)} /> : null}
        </div>
        <Toaster position="top-center" theme={theme} />
      </main>
    </TooltipProvider>
  );
}

function ShortcutSheet({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="toolcraft-panel-surface floating-popup-surface pointer-events-auto absolute top-[60px] right-3 z-10 w-72 rounded-lg border p-3"
      role="dialog"
      aria-label="Keyboard shortcuts"
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="m-0 text-xs-plus font-medium">Keyboard shortcuts</p>
        <button type="button" onClick={onClose} className="text-2xs text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]">
          Close
        </button>
      </div>
      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
        {SHORTCUTS.map(([label, keys]) => (
          <li key={label} className="flex items-center justify-between text-2xs text-[color:var(--muted-foreground)]">
            <span>{label}</span>
            <kbd className="rounded border border-[color:var(--tint-10)] bg-[color:var(--tint-5)] px-1 py-px font-sans text-2xs text-[color:var(--foreground)]">{keys}</kbd>
          </li>
        ))}
      </ul>
    </div>
  );
}
