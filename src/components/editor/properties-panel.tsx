"use client";

import * as React from "react";

import { ColorControl, Panel, PanelSection, SegmentedControl, SliderControl, SwitchControl } from "@/toolcraft/ui";
import { useEditor } from "@/store/editor";
import { FontPicker } from "./font-picker";
import { useThumbnail } from "./use-thumbnail";
import { ContentField, ExportSections, PaletteSwatches } from "./panel-parts";
import { LayersSection } from "./layers-section";
import { contentFor } from "@/lib/thumbnail/content";

const isCompactScreen = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-[color:var(--tint-10)] bg-[color:var(--tint-5)] px-1 py-px font-sans text-2xs text-[color:var(--foreground)]">{children}</kbd>
  );
}

export function PropertiesPanel() {
  const { template, content, style, override } = useThumbnail();
  const { setStyle, setOption, resetStyle, resetContent, setSyncText } = useEditor.getState();
  const touchedContent = useEditor((s) => Object.keys(contentFor(s.doc, s.doc.templateId)).length > 0);
  const syncText = useEditor((s) => s.doc.syncText);

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
          description={syncText ? "This text shows on every template." : "Each template keeps its own text. Click text on the canvas to edit it there."}
          action={
            touchedContent ? (
              <button type="button" onClick={resetContent} className="text-2xs text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]">
                Reset
              </button>
            ) : undefined
          }
        >
          <SwitchControl name="Use this text on every template" checked={syncText} onCheckedChange={setSyncText} />
          {template.fields
            .filter((field) => !style.hidden.has(field.key))
            .map((field) => (
              <ContentField key={field.key} field={field} content={content} />
            ))}
        </PanelSection>

        <LayersSection />

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

        <ExportSections />
      </Panel>
    </div>
  );
}
