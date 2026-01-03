import * as React from "react";
import { cn } from "@/lib/utils";
import { MetaText } from "./meta-text";

interface InlineReferenceProps extends React.HTMLAttributes<HTMLDivElement> {
  expandable?: boolean;
}

const InlineReference = React.forwardRef<HTMLDivElement, InlineReferenceProps>(
  ({ className, expandable = false, children, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(!expandable);

    return (
      <div
        ref={ref}
        className={cn(
          "lg:hidden",
          "border-l-2 border-muted pl-4 my-4",
          className
        )}
        {...props}
      >
        {expandable && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-primary mb-2"
          >
            {isExpanded ? "Hide reference" : "Show reference"}
          </button>
        )}
        {isExpanded && (
          <MetaText as="div" className="text-muted-foreground">
            {children}
          </MetaText>
        )}
      </div>
    );
  }
);

InlineReference.displayName = "InlineReference";

export { InlineReference };