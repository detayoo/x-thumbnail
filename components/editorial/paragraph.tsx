import * as React from "react";
import { cn } from "@/lib/utils";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "font-avant-garde font-normal",
          "text-[16px] leading-[1.6]",
          "md:text-[18px]",
          className
        )}
        {...props}
      />
    );
  }
);

Paragraph.displayName = "Paragraph";

export { Paragraph };