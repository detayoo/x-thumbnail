# Cover Pages

Fullscreen cover/thumbnail pages for editorial content.

## Features

- **Fullscreen black background** with customizable gray grid pattern
- **Bold white text** using Geist Mono font
- **Responsive text sizing** across devices
- **Automatic generation** for all editorial articles

## Routes

### Main Cover Page
```
/cover
```
Displays: "avantmag"

### Article-Specific Covers
```
/cover/[slug]
```

Examples:
- `/cover/geometry-of-innovation` - "The Geometry of Innovation"
- `/cover/quantum-breakthroughs` - "Quantum Breakthroughs"
- `/cover/climate-science-2026` - "Climate Science in 2026"

## Usage

### In Components
```tsx
import { CoverGenerator } from "@/components/cover-generator";

export default function MyPage() {
  return (
    <CoverGenerator 
      title="Your Custom Title"
      gridSize={100}        // Optional: grid cell size
      gridOpacity={0.2}     // Optional: grid opacity (0-1)
    />
  );
}
```

## Difference from OG Images

- **Cover Pages** (`/cover/*`) - Full browser pages you can view/screenshot
- **OG Images** (`/api/og?title=*`) - Automatic social media preview images (1200x630)

Both use the same visual design but serve different purposes!