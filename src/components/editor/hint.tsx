"use client";

import * as React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/toolcraft/ui";

export function Hint({
  label,
  description,
  keys,
  side = "top",
  children,
}: {
  label: string;
  description?: string;
  keys?: string[];
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactElement;
}) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side={side} sideOffset={8} className="max-w-60 flex-col items-start gap-0.5 px-2 py-1.5">
        <span className="flex w-full items-center justify-between gap-3">
          <span className="font-medium">{label}</span>
          {keys?.length ? (
            <span className="flex items-center gap-0.5">
              {keys.map((k) => (
                <kbd
                  key={k}
                  data-slot="kbd"
                  className="grid h-[18px] min-w-[18px] place-items-center rounded-sm bg-[color:var(--tint-10)] px-1 font-sans text-2xs text-[color:var(--muted-foreground)]"
                >
                  {k}
                </kbd>
              ))}
            </span>
          ) : null}
        </span>
        {description ? <span className="text-2xs leading-snug text-[color:var(--muted-foreground)]">{description}</span> : null}
      </TooltipContent>
    </Tooltip>
  );
}
