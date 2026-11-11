"use client";

import * as React from "react";
import { ClipboardTextIcon, CopyIcon, DownloadSimpleIcon, ImageSquareIcon, TrashIcon } from "@phosphor-icons/react";

import {
  ColorControl,
  ControlFieldLabel,
  Field,
  Panel,
  PanelSection,
  SegmentedControl,
  SliderControl,
  Textarea,
  TextInputControl,
} from "@/toolcraft/ui";
import { cn } from "@/toolcraft/ui/lib/utils";
import { useEditor } from "@/store/editor";
import { FORMATS } from "@/lib/thumbnail/formats";
import type { Content, FieldSpec, FormatId, TextKey } from "@/lib/thumbnail/types";
import { FontPicker } from "./font-picker";
import { useThumbnail } from "./use-thumbnail";
import { copyMetaTags, copyPng, exportPng } from "./export-actions";
import { Hint } from "./hint";

const MAX_IMAGE_SIDE = 2000;

async function fileToDataUrl(file: File) {
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
          <span className="truncate text-2xs text-[color:var(--muted-foreground)]">{value ? "Shown full-bleed in this template" : "Or drop one here. Optional."}</span>
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

function ContentField({ field, content }: { field: FieldSpec; content: Content }) {
  const setContent = useEditor((s) => s.setContent);
  if (field.key === "image") return <ImageField value={content.image} onChange={(v) => setContent("image", v)} />;
  const key = field.key as TextKey;
  if (field.multiline) return <MultilineField name={field.label} value={content[key]} hint={field.hint} onChange={(v) => setContent(key, v)} />;
  return <TextInputControl name={field.label} value={content[key]} onValueChange={(v) => setContent(key, v)} />;
}

function PaletteSwatches() {
  const { template, style } = useThumbnail();
  const setStyle = useEditor((s) => s.setStyle);
  return (
    <Field className="min-w-0 gap-2">
      <ControlFieldLabel>Palette</ControlFieldLabel>
      <div className="grid grid-cols-4 gap-1.5" role="radiogroup" aria-label="Palette">
        {template.palettes.map((p) => {
          const active = p.id === style.palette.id;
          return (
            <Hint key={p.id} label={p.name} side="bottom">
              <button
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={p.name}
                onClick={() => setStyle({ paletteId: p.id, accent: undefined })}
                className={cn(
                  "relative h-9 overflow-hidden rounded-md ring-1 ring-[color:var(--tint-12)] transition-transform active:scale-[0.96]",
                  active && "ring-2 ring-[color:var(--accent)] ring-offset-2 ring-offset-[color:var(--card)]",
                )}
                style={{ background: p.bg }}
              >
                <span className="absolute right-1.5 bottom-1.5 flex gap-0.5">
                  {[p.accent, ...p.colors.slice(1, 3)].map((c, i) => (
                    <span key={i} className="size-2.5 rounded-full ring-1 ring-black/10" style={{ background: c }} />
                  ))}
                </span>
                <span className="absolute top-1.5 left-1.5 h-1 w-4 rounded-full" style={{ background: p.fg }} />
              </button>
            </Hint>
          );
        })}
      </div>
    </Field>
  );
}

function ExportButtons() {
  const row =
    "group flex h-9 w-full items-center gap-2.5 rounded-md px-2 text-left transition-colors bg-[color:color-mix(in_oklab,var(--foreground)_4%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--foreground)_9%,transparent)]";
  const { format } = useThumbnail();
  const items = [
    { label: "Download PNG", detail: `${format.width} × ${format.height}`, icon: <DownloadSimpleIcon />, onClick: () => exportPng(1) },
    { label: "Download PNG 2×", detail: `${format.width * 2} × ${format.height * 2}`, icon: <DownloadSimpleIcon />, onClick: () => exportPng(2) },
    { label: "Copy image", detail: "⇧⌘C", icon: <CopyIcon />, onClick: copyPng },
    { label: "Copy meta tags", detail: "HTML", icon: <ClipboardTextIcon />, onClick: copyMetaTags },
  ];
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <button key={item.label} type="button" onClick={item.onClick} className={row}>
          <span className="grid size-5 place-items-center text-[color:var(--muted-foreground)] [&_svg]:size-4">{item.icon}</span>
          <span className="min-w-0 flex-1 truncate text-xs-plus">{item.label}</span>
          <span className="font-mono text-2xs text-[color:var(--muted-foreground)] tabular-nums">{item.detail}</span>
        </button>
      ))}
    </div>
  );
}

const isCompactScreen = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

export function PropertiesPanel() {
  const { template, content, style, override, format } = useThumbnail();
  const { setStyle, setOption, resetStyle, resetContent, setFormat } = useEditor.getState();
  const touchedContent = useEditor((s) => Object.keys(s.doc.content).length > 0);

  return (
    <div className="pointer-events-none absolute top-[62px] right-3 bottom-[72px] left-3 flex flex-col items-end md:bottom-3 md:left-auto" data-testid="properties">
      <Panel
        title={template.name}
        className="max-h-full w-[312px] max-w-full"
        defaultCollapsed={isCompactScreen()}
        onResetControls={resetStyle}
        contentTransitionSuppressionKey={template.id}
      >
        <PanelSection
          title="Text"
          description="Your text carries across every template."
          action={
            touchedContent ? (
              <button type="button" onClick={resetContent} className="text-2xs text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]">
                Reset
              </button>
            ) : undefined
          }
        >
          {template.fields.map((field) => (
            <ContentField key={field.key} field={field} content={content} />
          ))}
        </PanelSection>

        <PanelSection title="Type">
          <FontPicker name="Title font" value={style.titleFont.id} onChange={(id) => setStyle({ titleFont: id })} />
          <FontPicker name="Text font" value={style.bodyFont.id} onChange={(id) => setStyle({ bodyFont: id })} />
          <SliderControl
            name="Title size"
            min={template.titleRange[0]}
            max={template.titleRange[1]}
            step={1}
            unit="px"
            value={style.titleSize}
            onValueChange={(v) => setStyle({ titleSize: v }, "titleSize")}
          />
          <SliderControl
            name="Text size"
            min={template.bodyRange[0]}
            max={template.bodyRange[1]}
            step={1}
            unit="px"
            value={style.bodySize}
            onValueChange={(v) => setStyle({ bodySize: v }, "bodySize")}
          />
          <p className="m-0 text-2xs leading-relaxed text-[color:var(--muted-foreground)]">Long titles shrink to fit, so nothing gets clipped.</p>
        </PanelSection>

        <PanelSection title="Color">
          <PaletteSwatches />
          <ColorControl name="Accent" hex={override.accent ?? style.palette.accent} onValueChange={(v) => setStyle({ accent: v.hex }, "accent")} />
          {template.options?.map((opt) => (
            <SegmentedControl key={opt.key} name={opt.label} value={style.options[opt.key]} options={opt.choices} onValueChange={(v) => setOption(opt.key, v)} />
          ))}
        </PanelSection>

        <PanelSection title="Size" description={format.detail}>
          <SegmentedControl
            name="Format"
            value={format.id}
            options={FORMATS.map((f) => ({ label: f.short, value: f.id }))}
            onValueChange={(v) => setFormat(v as FormatId)}
          />
        </PanelSection>

        <PanelSection title="Export" description="Fonts are embedded, so the PNG matches the canvas exactly.">
          <ExportButtons />
        </PanelSection>
      </Panel>
    </div>
  );
}
