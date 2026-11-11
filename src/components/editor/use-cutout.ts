"use client";

import * as React from "react";
import { toast } from "sonner";

import { useEditor } from "@/store/editor";
import { contentFor } from "@/lib/thumbnail/content";
import { cutoutEnabled, removeBackground } from "@/lib/thumbnail/cutout";

const running = new Set<string>();
const listeners = new Set<() => void>();
let version = 0;

function mark(src: string, busy: boolean) {
  if (busy) running.add(src);
  else running.delete(src);
  version += 1;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useCutoutBusy(src: string | null | undefined) {
  React.useSyncExternalStore(subscribe, () => version, () => 0);
  return Boolean(src && running.has(src));
}

export function useCutoutSync() {
  const templateId = useEditor((s) => s.doc.templateId);
  const wanted = useEditor((s) => Boolean(s.doc.styles[s.doc.templateId]?.image?.cutout));
  const image = useEditor((s) => contentFor(s.doc, s.doc.templateId).image ?? null);
  const cutout = useEditor((s) => contentFor(s.doc, s.doc.templateId).cutout ?? null);

  React.useEffect(() => {
    if (!cutoutEnabled || !wanted || !image || cutout || running.has(image)) return;
    mark(image, true);
    const id = toast.loading("Removing background…", { description: "Runs in the background. The first run downloads a small model." });
    removeBackground(image)
      .then((result) => {
        useEditor.getState().applyCutout(templateId, image, result);
        toast.success("Background removed", { id });
      })
      .catch((error: Error) => {
        const { doc, setStyle } = useEditor.getState();
        if (doc.templateId === templateId) setStyle({ image: { ...doc.styles[templateId]?.image, cutout: false } });
        toast.error("Couldn't remove the background", { id, description: error.message });
      })
      .finally(() => mark(image, false));
  }, [templateId, wanted, image, cutout]);
}
