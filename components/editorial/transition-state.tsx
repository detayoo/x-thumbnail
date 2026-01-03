import * as React from "react";
import { cn } from "@/lib/utils";

interface TransitionStateProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "small" | "medium" | "large";
}

const TransitionState = React.forwardRef<HTMLDivElement, TransitionStateProps>(
  ({ className, spacing = "medium", ...props }, ref) => {
    const spacingClasses = {
      small: "h-[24px] md:h-[48px]",
      medium: "h-[48px] md:h-[80px]",
      large: "h-[80px] md:h-[160px]",
    };

    return (
      <div
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

TransitionState.displayName = "TransitionState";

export { TransitionState };