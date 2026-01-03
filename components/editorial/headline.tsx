import * as React from "react";
import { cn } from "@/lib/utils";

interface HeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Headline = React.forwardRef<HTMLHeadingElement, HeadlineProps>(
  ({ className, level = 1, ...props }, ref) => {
    const classes = cn(
      "font-avant-garde font-bold",
      "text-[36px] leading-[1.1] tracking-tight",
      "md:text-[64px]",
      className
    );
    
    return React.createElement(
      `h${level}` as keyof React.JSX.IntrinsicElements,
      { ref, className: classes, ...props }
    );
  }
);

Headline.displayName = "Headline";

export { Headline };