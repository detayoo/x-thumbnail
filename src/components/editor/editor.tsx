"use client";

import * as React from "react";

import { Toaster, TooltipProvider } from "@/toolcraft/ui";
import { useEditor } from "@/store/editor";
import { Stage } from "./stage";
import { useCutoutSync } from "./use-cutout";
import { fileToDataUrl } from "./panel-parts";
import { getTemplate } from "@/templates";
import { toast } from "sonner";
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

const SHORTCUTS: { group: string; items: [string, string[]][] }[] = [
  {
    group: "Templates",
    items: [
      ["Previous / next", ["[", "]"]],
      ["Next palette", ["P"]],
    ],
  },
  {
    group: "Canvas",
    items: [
      ["Edit selected text", ["↵"]],
      ["Hide selected", ["⌫"]],
      ["Nudge selected", ["←", "→"]],
      ["Safe-area guides", ["G"]],
      ["Undo / redo", ["⌘", "Z"]],
    ],
  },
  {
    group: "Export",
    items: [
      ["Download PNG", ["⌘", "E"]],
      ["Download 2×", ["⇧", "⌘", "E"]],
      ["Copy image", ["⇧", "⌘", "C"]],
    ],
  },
  {
    group: "View",
    items: [
      ["Zoom to fit", ["⇧", "1"]],
      ["Zoom 100%", ["⇧", "0"]],
      ["Light / dark", ["⇧", "D"]],
    ],
  },
];

function EditorApp() {
  const [theme] = useTheme();
  const hydrated = useEditor((s) => s.hydrated);
  const [showHelp, setShowHelp] = React.useState(false);

  React.useEffect(() => {
    useEditor.getState().hydrate();
  }, []);

  useCutoutSync();

  React.useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      if (isTyping(e.target)) return;
      const file = [...(e.clipboardData?.files ?? [])].find((f) => f.type.startsWith("image/"));
      if (!file) return;
      const { doc, setContent } = useEditor.getState();
      if (!getTemplate(doc.templateId).fields.some((f) => f.key === "image")) {
        toast.message("This template has no image slot", { description: "Pick one with a photo or diagram, then paste again." });
        return;
      }
      e.preventDefault();
      setContent("image", await fileToDataUrl(file));
      toast.success("Image added");
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
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
      } else if (key.startsWith("arrow") && s.selected) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const current = s.doc.styles[s.doc.templateId]?.layout?.[s.selected] ?? {};
        const dx = key === "arrowleft" ? -step : key === "arrowright" ? step : 0;
        const dy = key === "arrowup" ? -step : key === "arrowdown" ? step : 0;
        s.setElement(s.selected, { x: (current.x ?? 0) + dx, y: (current.y ?? 0) + dy }, `nudge:${s.selected}`);
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
      className="pointer-events-auto absolute top-[60px] right-3 z-50 w-[300px] rounded-xl border bg-[color:var(--popover)] p-1.5 shadow-2xl"
      role="dialog"
      aria-label="Keyboard shortcuts"
    >
      <div className="flex items-center justify-between px-2 pt-1 pb-1.5">
        <p className="m-0 text-xs-plus font-medium">Keyboard shortcuts</p>
        <button type="button" onClick={onClose} className="rounded px-1.5 py-0.5 text-2xs text-[color:var(--muted-foreground)] hover:bg-[color:var(--tint-8)] hover:text-[color:var(--foreground)]">
          Esc
        </button>
      </div>
      {SHORTCUTS.map((section) => (
        <div key={section.group} className="border-t border-[color:var(--tint-8)] px-2 py-2">
          <p className="m-0 mb-1.5 text-2xs text-[color:var(--muted-foreground)]">{section.group}</p>
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {section.items.map(([label, keys]) => (
              <li key={label} className="flex h-6 items-center justify-between text-xs-plus">
                <span>{label}</span>
                <span className="flex gap-0.5">
                  {keys.map((k) => (
                    <kbd key={k} className="grid h-5 min-w-5 place-items-center rounded bg-[color:var(--tint-8)] px-1 font-sans text-2xs text-[color:var(--muted-foreground)]">
                      {k}
                    </kbd>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
