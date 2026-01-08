/**
 * CoverGenerator - Generates a fullscreen cover/thumbnail with grid background
 * This component uses only hex colors to ensure html2canvas compatibility
 *
 * @param title - The title text to display
 * @param subtitle - The subtitle text to display below title
 * @param gridSize - Size of each grid cell in pixels or responsive object
 * @param gridOpacity - Opacity of the grid lines (default: 0.2)
 * @param textSize - Responsive text sizes (auto-calculated if not provided)
 * @param useFullGrid - Whether to use full grid or border-only grid (default: true)
 * @param fontFamily - Custom font family for the title text
 */
interface CoverGeneratorProps {
  title: any;
  subtitle?: string;
  fontSize?: number;
  subtitleFontSize?: number;
  gridSize?: number | { mobile: number; tablet: number; desktop: number };
  gridOpacity?: number;
  textSize?: {
    sm: string;
    md: string;
    lg: string;
  };
  useFullGrid?: boolean;
  fontFamily?: string;
}

export function CoverGenerator({
  title,
  subtitle,
  fontSize = 60,
  subtitleFontSize = 24,
  gridSize,
  gridOpacity = 0.2,
  textSize,
  useFullGrid = true,
  fontFamily,
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
    <div
      className="relative h-full w-full overflow-hidden"
      data-cover-generator
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
    >
      {/* Grid Background using SVG for better html2canvas compatibility */}
      {useFullGrid ? (
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern-mobile"
              width={
                typeof responsiveGridSize === "number"
                  ? responsiveGridSize
                  : responsiveGridSize.mobile
              }
              height={
                typeof responsiveGridSize === "number"
                  ? responsiveGridSize
                  : responsiveGridSize.mobile
              }
              patternUnits="userSpaceOnUse"
              className="md:hidden"
            >
              <path
                d={`M ${
                  typeof responsiveGridSize === "number"
                    ? responsiveGridSize
                    : responsiveGridSize.mobile
                } 0 L 0 0 0 ${
                  typeof responsiveGridSize === "number"
                    ? responsiveGridSize
                    : responsiveGridSize.mobile
                }`}
                fill="none"
                stroke="#ffff"
                strokeWidth="3"
                opacity={gridOpacity}
              />
            </pattern>
            <pattern
              id="grid-pattern-tablet"
              width={
                typeof responsiveGridSize === "number"
                  ? responsiveGridSize
                  : responsiveGridSize.tablet
              }
              height={
                typeof responsiveGridSize === "number"
                  ? responsiveGridSize
                  : responsiveGridSize.tablet
              }
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${
                  typeof responsiveGridSize === "number"
                    ? responsiveGridSize
                    : responsiveGridSize.tablet
                } 0 L 0 0 0 ${
                  typeof responsiveGridSize === "number"
                    ? responsiveGridSize
                    : responsiveGridSize.tablet
                }`}
                fill="none"
                stroke="#ffff"
                strokeWidth="3"
                opacity={gridOpacity}
              />
            </pattern>
            <pattern
              id="grid-pattern-desktop"
              width={
                typeof responsiveGridSize === "number"
                  ? responsiveGridSize
                  : responsiveGridSize.desktop
              }
              height={
                typeof responsiveGridSize === "number"
                  ? responsiveGridSize
                  : responsiveGridSize.desktop
              }
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${
                  typeof responsiveGridSize === "number"
                    ? responsiveGridSize
                    : responsiveGridSize.desktop
                } 0 L 0 0 0 ${
                  typeof responsiveGridSize === "number"
                    ? responsiveGridSize
                    : responsiveGridSize.desktop
                }`}
                fill="none"
                stroke="#ffff"
                strokeWidth="3"
                opacity={gridOpacity}
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid-pattern-desktop)"
            className="hidden lg:block"
          />
          <rect
            width="100%"
            height="100%"
            fill="url(#grid-pattern-tablet)"
            className="hidden md:block lg:hidden"
          />
          <rect
            width="100%"
            height="100%"
            fill="url(#grid-pattern-mobile)"
            className="md:hidden"
          />
        </svg>
      ) : (
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 675"
          preserveAspectRatio="none"
        >
          {/* Border-only grid with padding - lines running full length */}
          <g stroke="#ffffff" strokeWidth="3" opacity={gridOpacity} fill="none">
            {/* Left vertical line - full height */}
            <line x1="80" y1="0" x2="80" y2="675" />
            {/* Right vertical line - full height */}
            <line x1="1120" y1="0" x2="1120" y2="675" />
            {/* Top horizontal line - full width */}
            <line x1="0" y1="80" x2="1200" y2="80" />
            {/* Bottom horizontal line - full width */}
            <line x1="0" y1="595" x2="1200" y2="595" />
          </g>
        </svg>
      )}

      {/* Text Content */}
      <div className="relative flex h-full w-full items-center justify-start pl-8 pr-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-[90%]">
          <h1
            className="font-mono font-bold tracking-tight text-left break-words hyphens-auto leading-[1.2] sm:leading-[0.95] md:leading-[1]"
            style={{
              fontFamily: fontFamily || "var(--font-geist-mono)",
              fontSize: `${fontSize}px`,
              color: "#ffffff",
            }}
          >
            {title}
          </h1>
          {subtitle && subtitle.trim() && (
            <p
              className="font-mono text-left break-words hyphens-auto mt-[15px]"
              style={{
                fontFamily: fontFamily || "var(--font-geist-mono)",
                fontSize: `${subtitleFontSize}px`,
                color: "#f4f4f4",
              }}
            >
              {subtitle.trim()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
