import type { TemplateDef } from "@/lib/thumbnail/types";
import { article } from "./article";
import { changelog } from "./changelog";
import { classic } from "./classic";
import { code } from "./code";
import { editorial } from "./editorial";
import { ivory } from "./ivory";
import { launch } from "./launch";
import { metric } from "./metric";
import { midnight } from "./midnight";
import { quote } from "./quote";
import { slope } from "./slope";
import { spotlight } from "./spotlight";
import { technical } from "./technical";
import { documentary, hotTake, serifSky, sticker } from "./youtube";
import { api, diff, docs, schematic, terminal } from "./developer";
import { event, hiring, milestone, version } from "./announcement";

export const TEMPLATES: readonly TemplateDef[] = [
  midnight,
  ivory,
  technical,
  spotlight,
  slope,
  documentary,
  serifSky,
  hotTake,
  sticker,
  launch,
  version,
  event,
  hiring,
  milestone,
  schematic,
  terminal,
  code,
  api,
  diff,
  docs,
  classic,
  changelog,
  metric,
  editorial,
  article,
  quote,
];

export const DEFAULT_TEMPLATE_ID = midnight.id;

export function getTemplate(id: string): TemplateDef {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}
