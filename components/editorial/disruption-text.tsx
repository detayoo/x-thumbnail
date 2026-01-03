import * as React from "react";
import { cn } from "@/lib/utils";

interface DisruptionTextProps extends React.HTMLAttributes<HTMLElement> {
  weight?: "medium" | "bold";
  as?: "div" | "p" | "h2" | "h3";
}

const DisruptionText = React.forwardRef<HTMLElement, DisruptionTextProps>(
  ({ className, weight = "bold", as: Tag = "div", ...props }, ref) => {
    const classes = cn(
      "font-avant-garde tracking-adjusted",
      "text-[28px] leading-[1.2]",
      "md:text-[36px]",
      weight === "bold" ? "font-bold" : "font-medium",
      "my-[40px] md:my-[160px]",
      className
    );
    
    return React.createElement(Tag, { ref, className: classes, ...props });
  }
);

DisruptionText.displayName = "DisruptionText";

export { DisruptionText };