import * as React from "react";
import { cn } from "@/lib/utils";

interface ClosingSectionProps extends React.HTMLAttributes<HTMLElement> {}

const ClosingSection = React.forwardRef<HTMLElement, ClosingSectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "max-w-[720px] mx-auto w-full",
          "px-4 md:px-0",
          "py-[32px] md:py-[80px]",
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

ClosingSection.displayName = "ClosingSection";

export { ClosingSection };