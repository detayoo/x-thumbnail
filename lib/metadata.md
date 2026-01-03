# Feature Metadata Generator

A comprehensive metadata generation system for feature articles in the avantmag editorial platform.

## Overview

The metadata generator provides automatic SEO optimization, Open Graph tags, Twitter Cards, and JSON-LD structured data for all feature articles.

## Usage

### Basic Setup

1. Import the metadata generator in your feature page:

```tsx
import { generateFeatureMetadata } from "@/lib/metadata";
```

2. Define your feature data:

```tsx
const featureData = {
  title: "The Geometry of Innovation",
  description: "How Africa's Designers are Shaping the Future",
  author: "Maya Roberts",
  date: "July 14, 2021",
  readingTime: "8",
  slug: "geometry-of-innovation",
  image: "https://images.pexels.com/photos/20525039/pexels-photo-20525039.jpeg",
  keywords: ["African design", "innovation", "fashion"],
};
```

3. Export the generated metadata:

```tsx
export const metadata = generateFeatureMetadata(featureData);
```

### Complete Example

```tsx
import { PageContainer } from "@/components/ui/page-container";
import { Headline, Paragraph } from "@/components/editorial";
import { generateFeatureMetadata, FeatureMetadata } from "@/lib/metadata";
import { FeatureSchema } from "@/components/editorial";

// Feature metadata
const featureData: FeatureMetadata = {
  title: "The Future of Design",
  description: "Exploring new frontiers in creative expression",
  author: "Jane Doe",
  date: "January 15, 2026",
  readingTime: "12",
  slug: "future-of-design",
  image: "/features/future-of-design.jpg", // or external URL
  keywords: ["design", "innovation", "creativity", "future"],
};

// Generate metadata
export const metadata = generateFeatureMetadata(featureData);

export default function FeaturePage() {
  return (
    <>
      <PageContainer>
        <Headline>{featureData.title}</Headline>
        <Paragraph>Your article content...</Paragraph>
      </PageContainer>
      
      {/* Add JSON-LD structured data (optional but recommended) */}
      <FeatureSchema feature={featureData} />
    </>
  );
}
```

## Feature Data Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `string` | ✅ | Article headline |
| `description` | `string` | ✅ | Article summary/subtitle |
| `author` | `string` | ✅ | Author name |
| `date` | `string` | ✅ | Publication date (any valid date format) |
| `readingTime` | `string` | ✅ | Estimated reading time (e.g., "8", "12") |
| `slug` | `string` | ✅ | URL slug (e.g., "geometry-of-innovation") |
| `image` | `string` | ❌ | Feature image URL (defaults to site OG image) |
| `keywords` | `string[]` | ❌ | SEO keywords (auto-includes base keywords) |

## Generated Metadata

The generator automatically creates:

### 1. Page Metadata
- Title with site name template
- Meta description
- Keywords (custom + auto-generated)
- Author information
- Publisher information

### 2. Open Graph Tags
- `og:type` - "article"
- `og:url` - Canonical URL
- `og:title` - Full title
- `og:description` - Article description
- `og:image` - Feature image (1200x630)
- `og:site_name` - Site name
- `article:published_time` - ISO 8601 timestamp
- `article:author` - Author name

### 3. Twitter Card
- `twitter:card` - "summary_large_image"
- `twitter:site` - Site handle
- `twitter:creator` - Site handle
- `twitter:title` - Full title
- `twitter:description` - Article description
- `twitter:image` - Feature image

### 4. Canonical URL
- Automatically generated from slug
- Format: `https://avantmag.com/features/{slug}`

## JSON-LD Structured Data

The `FeatureSchema` component adds rich structured data for search engines:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Geometry of Innovation",
  "description": "How Africa's Designers are Shaping the Future",
  "image": "https://images.pexels.com/photos/...",
  "author": {
    "@type": "Person",
    "name": "Maya Roberts"
  },
  "publisher": {
    "@type": "Organization",
    "name": "avantmag",
    "logo": {
      "@type": "ImageObject",
      "url": "https://avantmag.com/logo.png"
    }
  },
  "datePublished": "2021-07-14T00:00:00.000Z",
  "dateModified": "2021-07-14T00:00:00.000Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://avantmag.com/features/geometry-of-innovation"
  }
}
```

## Best Practices

### Image Requirements
- **Dimensions**: 1200x630px (recommended for OG images)
- **Format**: JPG or PNG
- **File size**: < 1MB
- **Aspect ratio**: 1.91:1 (for Twitter Large Image Card)

### Title Guidelines
- Keep titles under 60 characters for optimal display
- Be descriptive and engaging
- Avoid clickbait

### Description Guidelines
- Keep descriptions between 120-160 characters
- Include primary keywords naturally
- Write compelling copy that encourages clicks

### Keywords
- Include 5-10 relevant keywords
- Mix broad and specific terms
- Include author name and site name (auto-added)
- Avoid keyword stuffing

### Date Format
- Any valid JavaScript date string works
- ISO 8601 recommended: "2026-01-15"
- Human-readable: "January 15, 2026"
- Will be automatically converted to ISO 8601 for structured data

## SEO Benefits

Using this metadata generator provides:

1. **Better Search Rankings**: Proper structured data helps search engines understand your content
2. **Rich Snippets**: Article cards in search results with image, author, and date
3. **Social Sharing**: Attractive previews when shared on social media
4. **Click-Through Rate**: Professional metadata increases clicks
5. **Accessibility**: Proper semantic markup for screen readers

## Migration Guide

### Existing Feature Pages

To add metadata to existing feature pages:

1. Import the generator at the top of your file
2. Extract existing article data into a `featureData` object
3. Export the generated metadata
4. Optionally add `FeatureSchema` component

### Example Migration

**Before:**
```tsx
export default function MyFeaturePage() {
  return (
    <PageContainer>
      <Headline>My Article</Headline>
      {/* ... */}
    </PageContainer>
  );
}
```

**After:**
```tsx
import { generateFeatureMetadata } from "@/lib/metadata";

const featureData = {
  title: "My Article",
  description: "Article description",
  author: "Author Name",
  date: "2026-01-01",
  readingTime: "8",
  slug: "my-article",
};

export const metadata = generateFeatureMetadata(featureData);

export default function MyFeaturePage() {
  return (
    <PageContainer>
      <Headline>{featureData.title}</Headline>
      {/* ... */}
    </PageContainer>
  );
}
```

## Troubleshooting

### Metadata Not Showing
- Verify `slug` matches the folder name
- Check that `SITE_URL` is correct in constants
- Ensure metadata is exported before the component

### Images Not Loading
- Use absolute URLs for external images
- For local images, ensure they're in the `public` folder
- Verify image dimensions meet requirements

### Date Format Issues
- Use a standard date format
- Test with `new Date(yourDate)` in console
- ISO 8601 is most reliable: "YYYY-MM-DD"

## Future Enhancements

Potential additions:
- Auto-generated reading time calculation
- Multiple author support
- Category/tag management
- Series/collection metadata
- Multi-language support