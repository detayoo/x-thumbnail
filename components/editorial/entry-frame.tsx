import * as React from "react";
import { cn } from "@/lib/utils";
import { Headline } from "./headline";
import { MetaText } from "./meta-text";

interface EntryFrameProps extends React.HTMLAttributes<HTMLElement> {
  headline: string;
  subheading?: string;
  author?: string;
  date?: string;
  readingTime?: string;
  media?: React.ReactNode;
}

const EntryFrame = React.forwardRef<HTMLElement, EntryFrameProps>(
  (
    {
      className,
      headline,
      subheading,
      author,
      date,
      readingTime,
      media,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "flex flex-col justify-end",
          "pt-[120px] pb-[80px] md:pb-[120px]",
          className
        )}
        {...props}
      >
        {media && <div className="mb-8 md:mb-12">{media}</div>}

        <div className="max-w-[720px] mx-auto w-full px-4 md:px-0">
          <Headline className="mb-6 md:mb-8">{headline}</Headline>

          {subheading && (
            <p className="text-[18px] md:text-[22px] leading-[1.4] font-normal mb-8 md:mb-12">
              {subheading}
            </p>
          )}

          {(author || date || readingTime) && (
            <div className="flex flex-wrap gap-4 md:gap-6 text-muted-foreground">
              {author && <MetaText>By {author}</MetaText>}
              {date && <MetaText>{date}</MetaText>}
              {readingTime && <MetaText>{readingTime} min read</MetaText>}
            </div>
          )}
        </div>
      </section>
    );
  }
);

EntryFrame.displayName = "EntryFrame";

export { EntryFrame };
