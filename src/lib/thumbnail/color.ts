export function mix(color: string, amount: number, base = "transparent") {
  return `color-mix(in oklab, ${color} ${Math.round(amount * 100)}%, ${base})`;
}

function luminance(hex: string) {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return 0.5;
  const [r, g, b] = m.slice(1).map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function readableOn(hex: string, dark = "#111111", light = "#ffffff") {
  return luminance(hex) > 0.36 ? dark : light;
}
