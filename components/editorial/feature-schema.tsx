import { generateFeatureJsonLd, type FeatureMetadata } from "@/lib/metadata";

interface FeatureSchemaProps {
  feature: FeatureMetadata;
}

export function FeatureSchema({ feature }: FeatureSchemaProps) {
  const jsonLd = generateFeatureJsonLd(feature);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}