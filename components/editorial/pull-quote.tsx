import * as React from "react";
import { cn } from "@/lib/utils";

interface PullQuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  weight?: "italic" | "medium";
}

const PullQuote = React.forwardRef<HTMLQuoteElement, PullQuoteProps>(
  ({ className, weight = "italic", ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          "font-avant-garde tracking-slight",
          "text-[22px] leading-[1.3]",
          "md:text-[28px]",
          weight === "italic" ? "italic" : "font-medium",
          "my-[32px] md:my-[120px]",
          className
        )}
        {...props}
      />
    );
  }
);

PullQuote.displayName = "PullQuote";

export { PullQuote };