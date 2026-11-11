import { getFontEmbedCSS, toBlob } from "html-to-image";

export const cardNode: { current: HTMLElement | null } = { current: null };

export async function renderPng(node: HTMLElement, width: number, height: number, pixelRatio = 1): Promise<Blob> {
  await document.fonts.ready;
  const fontEmbedCSS = await getFontEmbedCSS(node);
  const options = { width, height, pixelRatio, canvasWidth: width, canvasHeight: height, skipAutoScale: true, cacheBust: false, fontEmbedCSS };
  await toBlob(node, options);
  const blob = await toBlob(node, options);
  if (!blob) throw new Error("The browser couldn't render the image.");
  return blob;
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
