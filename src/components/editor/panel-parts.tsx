"use client";

import * as React from "react";
import { CheckIcon, ClipboardTextIcon, CopyIcon, DownloadSimpleIcon, ImageSquareIcon, TrashIcon } from "@phosphor-icons/react";

import {
  ControlFieldLabel,
  Field,
  PanelSection,
  Textarea,
  TextInputControl,
} from "@/toolcraft/ui";
import { cn } from "@/toolcraft/ui/lib/utils";
import { useEditor } from "@/store/editor";
import { FORMATS } from "@/lib/thumbnail/formats";
import type { Content, FieldSpec, TextKey } from "@/lib/thumbnail/types";
import { useThumbnail } from "./use-thumbnail";
import { copyMetaTags, copyPng, exportPng } from "./export-actions";
import { Hint } from "./hint";

const MAX_IMAGE_SIDE = 2000;

export async function fileToDataUrl(file: File) {
  const bitmap = await createImageBitmap(file);
  const ratio = Math.min(1, MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * ratio);
  canvas.height = Math.round(bitmap.height * ratio);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.9);
}

function MultilineField({ name, value, hint, onChange }: { name: string; value: string; hint?: string; onChange: (v: string) => void }) {
  return (
    <Field className="min-w-0 gap-2">
      <ControlFieldLabel>{name}</ControlFieldLabel>
      <Textarea aria-label={name} value={value} onChange={(e) => onChange(e.target.value)} className="max-h-40 min-h-[68px] overflow-y-auto" spellCheck />
      {hint ? <p className="m-0 text-2xs text-[color:var(--muted-foreground)]">{hint}</p> : null}
    </Field>
  );
}

export function ImageField({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const read = async (file?: File) => {
    if (file && file.type.startsWith("image/")) onChange(await fileToDataUrl(file));
  };
  return (
    <Field className="min-w-0 gap-2">
      <ControlFieldLabel>Image</ControlFieldLabel>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          read(e.dataTransfer.files[0]);
        }}
        className={cn(
          "flex items-center gap-2 rounded-md bg-[color:var(--tint-5)] p-1.5 ring-1 ring-transparent transition-shadow",
          dragging && "ring-[color:var(--accent)]",
        )}
      >
        <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-[5px] bg-[color:var(--tint-8)] text-[color:var(--muted-foreground)]">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <ImageSquareIcon className="size-4" />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <button type="button" onClick={() => inputRef.current?.click()} className="w-fit text-xs-plus font-medium hover:underline">
            {value ? "Replace image" : "Choose image"}
          </button>
          <span className="truncate text-2xs text-[color:var(--muted-foreground)]">{value ? "Adjust it in the Image section below" : "Or drop or paste (⌘V) one"}</span>
        </div>
        {value ? (
          <Hint label="Remove image">
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => onChange(null)}
              className="grid size-7 place-items-center rounded-md text-[color:var(--muted-foreground)] hover:bg-[color:var(--tint-10)] hover:text-[color:var(--foreground)]"
            >
              <TrashIcon className="size-3.5" />
            </button>
          </Hint>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          read(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </Field>
  );
}

export function ContentField({ field, content }: { field: FieldSpec; content: Content }) {
  const setContent = useEditor((s) => s.setContent);
  if (field.key === "image") return <ImageField value={content.image} onChange={(v) => setContent("image", v)} />;
  const key = field.key as TextKey;
  if (field.multiline) return <MultilineField name={field.label} value={content[key]} hint={field.hint} onChange={(v) => setContent(key, v)} />;
  return <TextInputControl name={field.label} value={content[key]} onValueChange={(v) => setContent(key, v)} />;
}

export function PaletteSwatches() {
  const { template, style } = useThumbnail();
  const setStyle = useEditor((s) => s.setStyle);
  return (
    <Field className="min-w-0 gap-2">
      <ControlFieldLabel>Palette</ControlFieldLabel>
      <div className="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="Palette">
        {template.palettes.map((p) => {
          const active = p.id === style.palette.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setStyle({ paletteId: p.id, accent: undefined })}
              className={cn(
                "flex h-10 items-center gap-2 rounded-lg border px-1.5 text-left transition-colors active:scale-[0.98]",
                active ? "border-[color:var(--accent)] bg-[color:color-mix(in_oklab,var(--accent)_10%,transparent)]" : "border-transparent bg-[color:var(--tint-5)] hover:bg-[color:var(--tint-8)]",
              )}
            >
              <span className="relative grid size-7 shrink-0 place-items-center overflow-hidden rounded-md ring-1 ring-black/10" style={{ background: p.bg }}>
                <span className="absolute right-0 bottom-0 size-3.5 rounded-tl-md" style={{ background: p.accent }} />
                {active ? <CheckIcon weight="bold" className="relative size-3.5" style={{ color: p.fg }} /> : null}
              </span>
              <span className="min-w-0 flex-1 truncate text-xs-plus">{p.name}</span>
            </button>
          );
        })}
      </div>
    </Field>
  );
}

export function ExportSections() {
  const formatId = useEditor((s) => s.doc.formatId);
  const row =
    "group flex h-10 w-full items-center gap-2.5 rounded-lg px-2.5 text-left transition-colors bg-[color:var(--tint-5)] hover:bg-[color:var(--tint-10)]";
  return (
    <>
      <PanelSection title="Size">
        <div className="flex flex-col gap-1" role="radiogroup" aria-label="Size">
          {FORMATS.map((f) => {
            const active = f.id === formatId;
            return (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => useEditor.getState().setFormat(f.id)}
                className={cn(
                  "flex h-12 items-center gap-2.5 rounded-lg border px-2.5 text-left",
                  active ? "border-[color:var(--accent)] bg-[color:color-mix(in_oklab,var(--accent)_10%,transparent)]" : "border-transparent bg-[color:var(--tint-5)] hover:bg-[color:var(--tint-8)]",
                )}
              >
                <span
                  aria-hidden
                  className={cn("shrink-0 rounded-[3px] border-[1.5px]", active ? "border-[color:var(--accent)]" : "border-[color:var(--tint-25)]")}
                  style={{ width: 26, height: Math.round((26 * f.height) / f.width) }}
                />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-xs-plus font-medium">{f.label}</span>
                  <span className="truncate text-2xs text-[color:var(--muted-foreground)]">{f.detail}</span>
                </span>
                <span className="font-mono text-2xs text-[color:var(--muted-foreground)] tabular-nums">
                  {f.width}×{f.height}
                </span>
              </button>
            );
          })}
        </div>
      </PanelSection>
      <PanelSection title="Download" description="Fonts are embedded, so the PNG matches the canvas exactly.">
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => exportPng(1)}
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[color:var(--accent)] text-xs-plus font-medium text-white hover:brightness-110 [&_svg]:size-4"
          >
            <DownloadSimpleIcon weight="bold" />
            Download PNG
          </button>
          <button type="button" onClick={() => exportPng(2)} className={row}>
            <DownloadSimpleIcon className="size-4 text-[color:var(--muted-foreground)]" />
            <span className="flex-1 text-xs-plus">Download at 2×</span>
            <span className="font-mono text-2xs text-[color:var(--muted-foreground)]">⇧⌘E</span>
          </button>
          <button type="button" onClick={() => copyPng()} className={row}>
            <CopyIcon className="size-4 text-[color:var(--muted-foreground)]" />
            <span className="flex-1 text-xs-plus">Copy image</span>
            <span className="font-mono text-2xs text-[color:var(--muted-foreground)]">⇧⌘C</span>
          </button>
          <button type="button" onClick={copyMetaTags} className={row}>
            <ClipboardTextIcon className="size-4 text-[color:var(--muted-foreground)]" />
            <span className="flex-1 text-xs-plus">Copy meta tags</span>
            <span className="font-mono text-2xs text-[color:var(--muted-foreground)]">HTML</span>
          </button>
        </div>
      </PanelSection>
    </>
  );
}
