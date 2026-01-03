import * as React from "react";
import { cn } from "@/lib/utils";

interface ReadingFlowProps extends React.HTMLAttributes<HTMLDivElement> {}

const ReadingFlow = React.forwardRef<HTMLDivElement, ReadingFlowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <article
        ref={ref}
        className={cn(
          "max-w-[720px] mx-auto w-full",
          "px-4 md:px-0",
          "space-y-[24px] md:space-y-[48px]",
          className
        )}
        {...props}
      >
        {children}
      </article>
    );
  }
);

ReadingFlow.displayName = "ReadingFlow";

export { ReadingFlow };