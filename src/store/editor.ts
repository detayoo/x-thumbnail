"use client";

import { create } from "zustand";
import { get as idbGet, set as idbSet } from "idb-keyval";

import { LOCAL_FONT_FILES } from "@/lib/fonts";
import type { Content, ElementLayout, FormatId, StyleOverride, ThumbnailDoc } from "@/lib/thumbnail/types";
import { contentFor, resolveContent } from "@/lib/thumbnail/content";
import { DEFAULT_TEMPLATE_ID, getTemplate, TEMPLATES } from "@/templates";

const STORAGE_KEY = "x-thumbnail:doc:v3";
const HISTORY_LIMIT = 100;
const COALESCE_MS = 900;

export type Zoom = "fit" | number;

const initialDoc: ThumbnailDoc = {
  templateId: DEFAULT_TEMPLATE_ID,
  formatId: "og",
  content: {},
  contents: {},
  syncText: false,
  styles: {},
};

type EditorState = {
  doc: ThumbnailDoc;
  hydrated: boolean;
  past: ThumbnailDoc[];
  future: ThumbnailDoc[];
  zoom: Zoom;
  fitScale: number;
  safeArea: boolean;
  selected: string | null;
  select: (key: string | null) => void;
  setHidden: (key: string, hidden: boolean) => void;
  setElement: (key: string, patch: ElementLayout | null, coalesce?: string) => void;
  localFonts: Record<string, boolean>;
  hydrate: () => Promise<void>;
  setTemplate: (id: string) => void;
  stepTemplate: (delta: number) => void;
  setFormat: (id: FormatId) => void;
  setContent: <K extends keyof Content>(key: K, value: Content[K]) => void;
  resetContent: () => void;
  setSyncText: (on: boolean) => void;
  applyCutout: (templateId: string, src: string, cutout: string | null) => void;
  setStyle: (patch: StyleOverride, coalesce?: string) => void;
  setOption: (key: string, value: string) => void;
  resetStyle: () => void;
  shufflePalette: () => void;
  undo: () => void;
  redo: () => void;
  setZoom: (zoom: Zoom) => void;
  setFitScale: (scale: number) => void;
  toggleSafeArea: () => void;
};

let lastCommit = { key: "", at: 0 };

function withTemplate(doc: ThumbnailDoc, id: string): ThumbnailDoc {
  const next = getTemplate(id);
  const previous = getTemplate(doc.templateId);
  let formatId = doc.formatId;
  if (next.preferredFormat) formatId = next.preferredFormat;
  else if (previous.preferredFormat && doc.formatId === previous.preferredFormat) formatId = "og";
  return { ...doc, templateId: next.id, formatId };
}
let saveTimer: ReturnType<typeof setTimeout> | undefined;

function persist(doc: ThumbnailDoc) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    idbSet(STORAGE_KEY, doc).catch(() => {
      idbSet(STORAGE_KEY, { ...doc, content: { ...doc.content, image: null } }).catch(() => undefined);
    });
  }, 300);
}

async function detectLocalFonts() {
  const entries = await Promise.all(
    Object.entries(LOCAL_FONT_FILES).map(async ([id, url]) => {
      try {
        const res = await fetch(url, { method: "HEAD", cache: "no-store" });
        return [id, res.ok && !(res.headers.get("content-type") ?? "").includes("text/html")] as const;
      } catch {
        return [id, false] as const;
      }
    }),
  );
  return Object.fromEntries(entries);
}

export const useEditor = create<EditorState>((set, get) => {
  const commit = (next: ThumbnailDoc, coalesce?: string) => {
    const { doc, past } = get();
    const now = Date.now();
    const merge = coalesce && lastCommit.key === coalesce && now - lastCommit.at < COALESCE_MS;
    lastCommit = { key: coalesce ?? "", at: now };
    set({ doc: next, past: merge ? past : [...past, doc].slice(-HISTORY_LIMIT), future: [] });
    persist(next);
  };

  const updateStyle = (fn: (current: StyleOverride) => StyleOverride, coalesce?: string) => {
    const { doc } = get();
    const current = doc.styles[doc.templateId] ?? {};
    commit({ ...doc, styles: { ...doc.styles, [doc.templateId]: fn(current) } }, coalesce);
  };

  return {
    doc: initialDoc,
    hydrated: false,
    past: [],
    future: [],
    zoom: "fit",
    fitScale: 1,
    safeArea: false,
    selected: null,
    select: (selected) => set({ selected }),
    setElement: (key, patch, coalesce) =>
      updateStyle((current) => {
        const layout = { ...current.layout };
        if (patch === null) delete layout[key];
        else layout[key] = { ...layout[key], ...patch };
        return { ...current, layout };
      }, coalesce),
    setHidden: (key, hidden) => {
      updateStyle((current) => {
        const list = new Set(current.hidden ?? []);
        if (hidden) list.add(key);
        else list.delete(key);
        return { ...current, hidden: [...list] };
      });
      if (hidden) set({ selected: null });
    },
    localFonts: {},

    hydrate: async () => {
      const [saved, localFonts] = await Promise.all([idbGet<ThumbnailDoc>(STORAGE_KEY).catch(() => undefined), detectLocalFonts()]);
      const doc = saved && typeof saved === "object" ? { ...initialDoc, ...saved, contents: saved.contents ?? {}, templateId: getTemplate(saved.templateId ?? "").id } : initialDoc;
      set({ doc, hydrated: true, localFonts });
    },

    setTemplate: (id) => {
      const { doc } = get();
      if (doc.templateId === id) return;
      set({ selected: null });
      commit(withTemplate(doc, id));
    },

    stepTemplate: (delta) => {
      const { doc } = get();
      const index = TEMPLATES.findIndex((t) => t.id === doc.templateId);
      const next = TEMPLATES[(index + delta + TEMPLATES.length) % TEMPLATES.length];
      set({ selected: null });
      commit(withTemplate(doc, next.id));
    },

    setFormat: (formatId) => {
      const { doc } = get();
      if (doc.formatId !== formatId) commit({ ...doc, formatId });
    },

    setContent: (key, value) => {
      const { doc } = get();
      const coalesce = `content:${String(key)}`;
      const patch: Partial<Content> = key === "image" ? { image: value as Content["image"], cutout: null } : { [key]: value };
      if (doc.syncText) commit({ ...doc, content: { ...doc.content, ...patch } }, coalesce);
      else {
        const own = doc.contents[doc.templateId] ?? {};
        commit({ ...doc, contents: { ...doc.contents, [doc.templateId]: { ...own, ...patch } } }, coalesce);
      }
    },

    resetContent: () => {
      const { doc } = get();
      if (doc.syncText) commit({ ...doc, content: {} });
      else {
        const contents = { ...doc.contents };
        delete contents[doc.templateId];
        commit({ ...doc, contents });
      }
    },

    applyCutout: (templateId, src, cutout) => {
      const { doc } = get();
      const own = doc.syncText ? doc.content : doc.contents[templateId] ?? {};
      if (own.image !== src) return;
      const next = { ...own, cutout };
      if (doc.syncText) commit({ ...doc, content: next });
      else commit({ ...doc, contents: { ...doc.contents, [templateId]: next } });
    },

    setSyncText: (on) => {
      const { doc } = get();
      if (!on) return commit({ ...doc, syncText: false });
      const template = getTemplate(doc.templateId);
      const current = resolveContent(template, contentFor(doc, template.id));
      const shared: Partial<Content> = {};
      for (const field of template.fields) (shared as Record<string, unknown>)[field.key] = current[field.key];
      commit({ ...doc, syncText: true, content: shared });
    },

    setStyle: (patch, coalesce) => updateStyle((current) => ({ ...current, ...patch }), coalesce),

    setOption: (key, value) => updateStyle((current) => ({ ...current, options: { ...current.options, [key]: value } })),

    resetStyle: () => updateStyle(() => ({})),

    shufflePalette: () => {
      const { doc } = get();
      const template = getTemplate(doc.templateId);
      const current = doc.styles[doc.templateId]?.paletteId ?? template.palettes[0].id;
      const index = template.palettes.findIndex((p) => p.id === current);
      const next = template.palettes[(index + 1) % template.palettes.length];
      updateStyle((s) => ({ ...s, paletteId: next.id, accent: undefined }));
    },

    undo: () => {
      const { past, doc, future } = get();
      const previous = past[past.length - 1];
      if (!previous) return;
      lastCommit = { key: "", at: 0 };
      set({ doc: previous, past: past.slice(0, -1), future: [doc, ...future] });
      persist(previous);
    },

    redo: () => {
      const { past, doc, future } = get();
      const next = future[0];
      if (!next) return;
      lastCommit = { key: "", at: 0 };
      set({ doc: next, past: [...past, doc], future: future.slice(1) });
      persist(next);
    },

    setZoom: (zoom) => set({ zoom }),
    setFitScale: (fitScale) => set({ fitScale }),
    toggleSafeArea: () => set((s) => ({ safeArea: !s.safeArea })),
  };
});
