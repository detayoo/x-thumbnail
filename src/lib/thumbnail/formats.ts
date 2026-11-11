import type { Format, FormatId } from "./types";

export const FORMATS: readonly Format[] = [
  { id: "og", label: "Open Graph", short: "OG", width: 1200, height: 630, ratio: "1.91 : 1", detail: "Link previews on X, LinkedIn, Slack, Discord, iMessage" },
  { id: "x", label: "X post", short: "X", width: 1200, height: 675, ratio: "16 : 9", detail: "Images attached to a post on X" },
  { id: "linkedin", label: "LinkedIn", short: "LinkedIn", width: 1200, height: 627, ratio: "1.91 : 1", detail: "LinkedIn shared-link card" },
];

export function getFormat(id: FormatId): Format {
  return FORMATS.find((f) => f.id === id) ?? FORMATS[0];
}
