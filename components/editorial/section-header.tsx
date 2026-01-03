import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
}

const SectionHeader = React.forwardRef<HTMLHeadingElement, SectionHeaderProps>(
  ({ className, as: Tag = "h2", ...props }, ref) => {
    const classes = cn(
      "font-avant-garde font-medium",
      "text-[24px] leading-[1.3]",
      "md:text-[32px]",
      className
    );
    
    return React.createElement(Tag, { ref, className: classes, ...props });
  }
);

SectionHeader.displayName = "SectionHeader";

export { SectionHeader };