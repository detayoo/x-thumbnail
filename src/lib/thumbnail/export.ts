import { getFontEmbedCSS, toBlob } from "html-to-image";

function resolveFontVariables(node: HTMLElement) {
  const restore: [HTMLElement, string][] = [];
  for (const el of [node, ...node.querySelectorAll<HTMLElement>("*")]) {
    const inline = el.style.fontFamily;
    if (inline && inline.includes("var(")) {
      restore.push([el, inline]);
      el.style.fontFamily = getComputedStyle(el).fontFamily;
    }
  }
  return () => {
    for (const [el, value] of restore) el.style.fontFamily = value;
  };
}

export async function renderPng(node: HTMLElement, width: number, height: number, pixelRatio = 1): Promise<Blob> {
  await document.fonts.ready;
  const restore = resolveFontVariables(node);
  try {
    const fontEmbedCSS = await getFontEmbedCSS(node);
    const options = { width, height, pixelRatio, canvasWidth: width, canvasHeight: height, skipAutoScale: true, cacheBust: false, fontEmbedCSS };
    await toBlob(node, options);
    const blob = await toBlob(node, options);
    if (!blob) throw new Error("The browser couldn't render the image.");
    return blob;
  } finally {
    restore();
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
