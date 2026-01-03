import * as React from "react";
import { cn } from "@/lib/utils";
import { MetaText } from "./meta-text";

interface MetaFooterProps extends React.HTMLAttributes<HTMLElement> {
  publication?: string;
  year?: number | string;
}

const MetaFooter = React.forwardRef<HTMLElement, MetaFooterProps>(
  ({ className, publication, year, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "border-t border-border",
          "py-8 md:py-12",
          "max-w-[720px] mx-auto w-full px-4 md:px-0",
          className
        )}
        {...props}
      >
        <div className="flex justify-between items-center text-muted-foreground">
          {publication && <MetaText>{publication}</MetaText>}
          {year && <MetaText>© {year}</MetaText>}
        </div>
      </footer>
    );
  }
);

MetaFooter.displayName = "MetaFooter";

export { MetaFooter };