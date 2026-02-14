"use client";

import { ChevronDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MetaText } from "../editorial";
import { categories } from "@/lib/content-data";

export function EnhancedAside() {
  const quickBrowseItems = [
    {
      ...categories[0],
      subtitle: "unlimited articles",
    },
  ];

  return (
    <aside className="hidden xl:block fixed top-[20vh] left-[max(2rem,calc((100vw-1440px)/2-280px))] w-[220px] max-h-[60vh] overflow-y-auto">
      <div>
        <MetaText
          as="div"
          className="font-medium text-foreground mb-5 tracking-wide"
        >
          Quick Browse
        </MetaText>
        <div className="space-y-1.5">
          {quickBrowseItems?.length > 0 &&
            quickBrowseItems?.map((item, index) => (
              <div key={index} className="relative group">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-all group/button cursor-pointer">
                  <div className="size-9 rounded-lg bg-background border border-border flex items-center justify-center shrink-0 group-hover/button:border-primary/30 transition-colors">
                    {item?.icon && (
                      <item.icon className="size-4 text-muted-foreground group-hover/button:text-primary transition-colors" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <MetaText
                      as="p"
                      className="text-sm font-medium text-foreground leading-tight group-hover/button:text-primary transition-colors"
                    >
                      {item.name}
                    </MetaText>
                    <MetaText
                      as="p"
                      className="text-[11px] text-muted-foreground leading-tight mt-0.5 truncate"
                    >
                      {item.subtitle}
                    </MetaText>
                  </div>
                  <HugeiconsIcon
                    icon={ChevronDown}
                    strokeWidth={2}
                    className="pointer-events-none"
                  />
                </button>
                {item?.name?.toLowerCase() === "science" && (
                  <div className="absolute left-0 top-full mt-1 w-full z-10">
                    <div className="opacity-0 group-hover/button:opacity-100 transition-opacity duration-200 px-4 py-2 bg-background border border-border rounded-lg shadow-xl text-xs font-medium text-foreground whitespace-nowrap pointer-events-auto">
                      DeSci NG
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
}
