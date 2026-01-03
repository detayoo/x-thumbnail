import * as React from "react";
import { cn } from "@/lib/utils";
import { MetaText } from "./meta-text";

interface MarginaliaRailProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "left" | "right";
}

const MarginaliaRail = React.forwardRef<HTMLDivElement, MarginaliaRailProps>(
  ({ className, position = "right", children, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "hidden lg:block",
          "fixed top-1/2 -translate-y-1/2",
          "w-[200px]",
          position === "right"
            ? "right-8 xl:right-[calc((100vw-1440px)/2+40px)]"
            : "left-8 xl:left-[calc((100vw-1440px)/2+40px)]",
          className
        )}
        {...props}
      >
        <MetaText as="div" className="text-muted-foreground">
          {children}
        </MetaText>
      </aside>
    );
  }
);

MarginaliaRail.displayName = "MarginaliaRail";

export { MarginaliaRail };
