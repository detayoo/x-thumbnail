/**
 * CoverGenerator - Generates a fullscreen cover/thumbnail with grid background
 *
 * @param title - The title text to display (e.g., article title or "avantmag")
 * @param gridSize - Size of each grid cell in pixels (default: auto-calculated) or object with responsive sizes
 * @param gridOpacity - Opacity of the grid lines (default: 0.2)
 * @param textSize - Responsive text sizes for different breakpoints (auto-calculated based on title length if not provided)
 *
 * Usage:
 * ```tsx
 * <CoverGenerator title="The Geometry of Innovation" />
 * ```
 *
 * Advanced usage with custom sizes:
 * ```tsx
 * <CoverGenerator
 *   title="Custom Title"
 *   gridSize={{ mobile: 40, tablet: 60, desktop: 80 }}
 *   textSize={{ sm: "text-[3rem]", md: "text-[6rem]", lg: "text-[10rem]" }}
 * />
 * ```
 */
interface CoverGeneratorProps {
  title: any;
  gridSize?: number | { mobile: number; tablet: number; desktop: number };
  gridOpacity?: number;
  textSize?: {
    sm: string;
    md: string;
    lg: string;
  };
}

export function CoverGenerator({
  title,
  gridSize,
  gridOpacity = 0.2,
  textSize,
}: CoverGeneratorProps) {
  // Calculate responsive grid size if not provided
  const responsiveGridSize = gridSize || {
    mobile: 50,
    tablet: 75,
    desktop: 100,
  };

  // Calculate responsive text size based on title length if not provided
  const getResponsiveTextSize = () => {
    if (textSize) return textSize;

    const titleLength = title.length;

    if (titleLength > 50) {
      return {
        sm: "text-[4rem]",
        md: "text-[10rem]",
        lg: "text-[15rem]",
      };
    } else if (titleLength > 30) {
      return {
        sm: "text-[4rem]",
        md: "text-[10rem]",
        lg: "text-[15rem]",
      };
    } else if (titleLength > 15) {
      return {
        sm: "text-[4rem]",
        md: "text-[10rem]",
        lg: "text-[15rem]",
      };
    } else {
      return {
        sm: "text-[4rem]",
        md: "text-[10rem]",
        lg: "text-[15rem]",
      };
    }
  };

  const finalTextSize = getResponsiveTextSize();

  return (
    <div className="relative h-full w-full overflow-hidden bg-black" data-cover-generator>
      {/* Grid Background using SVG for better html2canvas compatibility */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern-mobile"
            width={typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.mobile}
            height={typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.mobile}
            patternUnits="userSpaceOnUse"
            className="md:hidden"
          >
            <path
              d={`M ${typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.mobile} 0 L 0 0 0 ${typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.mobile}`}
              fill="none"
              stroke="#666"
              strokeWidth="1"
              opacity={gridOpacity}
            />
          </pattern>
          <pattern
            id="grid-pattern-tablet"
            width={typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.tablet}
            height={typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.tablet}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.tablet} 0 L 0 0 0 ${typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.tablet}`}
              fill="none"
              stroke="#666"
              strokeWidth="1"
              opacity={gridOpacity}
            />
          </pattern>
          <pattern
            id="grid-pattern-desktop"
            width={typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.desktop}
            height={typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.desktop}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.desktop} 0 L 0 0 0 ${typeof responsiveGridSize === "number" ? responsiveGridSize : responsiveGridSize.desktop}`}
              fill="none"
              stroke="#666"
              strokeWidth="1"
              opacity={gridOpacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern-desktop)" className="hidden lg:block" />
        <rect width="100%" height="100%" fill="url(#grid-pattern-tablet)" className="hidden md:block lg:hidden" />
        <rect width="100%" height="100%" fill="url(#grid-pattern-mobile)" className="md:hidden" />
      </svg>

      {/* Text Content */}
      <div className="relative flex h-full w-full items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16">
        <h1
          className="font-mono font-bold tracking-tight text-white text-center break-words hyphens-auto max-w-[90%] leading-[0.9] sm:leading-[0.95] md:leading-[1]"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
