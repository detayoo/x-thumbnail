import * as React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps extends React.ComponentProps<"div"> {
  withPadding?: boolean;
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, withPadding = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-[1440px]",
          withPadding && "px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      />
    );
  }
);

PageContainer.displayName = "PageContainer";

export { PageContainer };
