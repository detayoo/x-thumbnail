import * as React from "react";
import { cn } from "@/lib/utils";

interface CaptionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "figcaption" | "span" | "p";
}

const Caption = React.forwardRef<HTMLElement, CaptionProps>(
  ({ className, as: Tag = "figcaption", ...props }, ref) => {
    const classes = cn(
      "font-avant-garde font-normal",
      "text-[14px] leading-[1.4]",
      className
    );
    
    return React.createElement(Tag, { ref, className: classes, ...props });
  }
);

Caption.displayName = "Caption";

export { Caption };