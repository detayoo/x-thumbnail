import * as React from "react";
import { cn } from "@/lib/utils";
import { DisruptionText } from "./disruption-text";

interface DisruptionBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  weight?: "medium" | "bold";
}

const DisruptionBlock = React.forwardRef<HTMLDivElement, DisruptionBlockProps>(
  ({ className, text, weight = "bold", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "max-w-[900px] mx-auto w-full px-4 md:px-0",
          className
        )}
        {...props}
      >
        <DisruptionText weight={weight} className="text-center">
          {text}
        </DisruptionText>
      </div>
    );
  }
);

DisruptionBlock.displayName = "DisruptionBlock";

export { DisruptionBlock };