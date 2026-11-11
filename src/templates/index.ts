import type { TemplateDef } from "@/lib/thumbnail/types";
import { article } from "./article";
import { changelog } from "./changelog";
import { classic } from "./classic";
import { code } from "./code";
import { editorial } from "./editorial";
import { launch } from "./launch";
import { metric } from "./metric";
import { quote } from "./quote";

export const TEMPLATES: readonly TemplateDef[] = [launch, editorial, article, changelog, quote, metric, code, classic];

export const DEFAULT_TEMPLATE_ID = launch.id;

export function getTemplate(id: string): TemplateDef {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}
