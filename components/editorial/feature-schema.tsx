import { generateFeatureJsonLd, type FeatureMetadata } from "@/lib/metadata";

interface FeatureSchemaProps {
  feature: FeatureMetadata;
}

/**
 * Component that adds JSON-LD structured data to feature pages
 * Include this at the bottom of your feature page for better SEO
 */
export function FeatureSchema({ feature }: FeatureSchemaProps) {
  const jsonLd = generateFeatureJsonLd(feature);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}