"use client";

import { toast } from "sonner";

import { slug } from "@/lib/thumbnail/content";
import { downloadBlob, renderPng } from "@/lib/thumbnail/export";
import { getFormat } from "@/lib/thumbnail/formats";
import { contentFor, resolveContent } from "@/lib/thumbnail/content";
import { useEditor } from "@/store/editor";
import type { FormatId } from "@/lib/thumbnail/types";
import { getTemplate } from "@/templates";
import { getCardNode } from "./stage";

function current() {
  const { doc } = useEditor.getState();
  const template = getTemplate(doc.templateId);
  return { format: getFormat(doc.formatId), content: resolveContent(template, contentFor(doc, template.id), doc.styles[template.id]), template };
}

let busy = false;

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

async function ensureFormat(formatId?: FormatId) {
  const { doc, setFormat } = useEditor.getState();
  if (!formatId || doc.formatId === formatId) return;
  setFormat(formatId);
  await nextFrame();
  await nextFrame();
  await new Promise((resolve) => setTimeout(resolve, 60));
}

export async function exportPng(pixelRatio = 1, formatId?: FormatId) {
  if (busy) return;
  await ensureFormat(formatId);
  const node = getCardNode();
  if (!node) return;
  busy = true;
  const { format, content } = current();
  const width = format.width * pixelRatio;
  const height = format.height * pixelRatio;
  const id = toast.loading("Rendering PNG…");
  const started = performance.now();
  try {
    const blob = await renderPng(node, format.width, format.height, pixelRatio);
    downloadBlob(blob, `${slug(content.title)}-${width}x${height}.png`);
    const secs = ((performance.now() - started) / 1000).toFixed(1);
    toast.success("PNG downloaded", { id, description: `${width} × ${height} · ${(blob.size / 1e6).toFixed(2)} MB · ${secs}s` });
  } catch (error) {
    toast.error("Export failed", { id, description: error instanceof Error ? error.message : String(error) });
  } finally {
    busy = false;
  }
}

export async function copyPng(formatId?: FormatId) {
  await ensureFormat(formatId);
  const node = getCardNode();
  if (!node) return;
  const { format } = current();
  const id = toast.loading("Copying image…");
  try {
    const blob = renderPng(node, format.width, format.height, 1);
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    toast.success("Image copied", { id, description: "Paste it straight into a post or a design file." });
  } catch (error) {
    toast.error("Couldn't copy the image", { id, description: error instanceof Error ? error.message : String(error) });
  }
}

export async function copyMetaTags() {
  const { format, content } = current();
  const file = `/${slug(content.title)}-${format.width}x${format.height}.png`;
  const alt = content.title.replace(/"/g, "&quot;");
  const tags = [
    `<meta property="og:image" content="${file}" />`,
    `<meta property="og:image:width" content="${format.width}" />`,
    `<meta property="og:image:height" content="${format.height}" />`,
    `<meta property="og:image:alt" content="${alt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${file}" />`,
  ].join("\n");
  try {
    await navigator.clipboard.writeText(tags);
    toast.success("Meta tags copied", { description: "Upload the PNG and point the paths at its public URL." });
  } catch {
    toast.error("Couldn't copy the meta tags.");
  }
}
