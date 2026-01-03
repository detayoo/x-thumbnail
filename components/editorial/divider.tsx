import * as React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  spacing?: "small" | "medium" | "large";
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, spacing = "medium", ...props }, ref) => {
    const spacingClasses = {
      small: "my-6 md:my-8",
      medium: "my-8 md:my-12",
      large: "my-12 md:my-20",
    };

    return (
      <hr
        ref={ref}
        className={cn(
          "border-t border-foreground/10 w-full",
          spacingClasses[spacing],
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider };