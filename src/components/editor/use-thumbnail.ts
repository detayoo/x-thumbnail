"use client";

import * as React from "react";

import { useEditor } from "@/store/editor";
import { resolveContent } from "@/lib/thumbnail/content";
import { getFormat } from "@/lib/thumbnail/formats";
import { resolveStyle } from "@/lib/thumbnail/style";
import { getTemplate } from "@/templates";

export function useThumbnail() {
  const doc = useEditor((s) => s.doc);
  const localFonts = useEditor((s) => s.localFonts);
  return React.useMemo(() => {
    const template = getTemplate(doc.templateId);
    return {
      doc,
      template,
      format: getFormat(doc.formatId),
      content: resolveContent(template, doc.content),
      style: resolveStyle(template, doc.styles[template.id], localFonts),
      override: doc.styles[template.id] ?? {},
    };
  }, [doc, localFonts]);
}
