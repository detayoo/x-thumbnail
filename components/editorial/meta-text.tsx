import * as React from "react";
import { cn } from "@/lib/utils";

interface MetaTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div" | "p";
}

const MetaText = React.forwardRef<HTMLElement, MetaTextProps>(
  ({ className, as: Tag = "span", ...props }, ref) => {
    const classes = cn(
      "font-avant-garde font-light",
      "text-[14px] leading-[1.4]",
      className
    );
    
    return React.createElement(Tag, { ref, className: classes, ...props });
  }
);

MetaText.displayName = "MetaText";

export { MetaText };