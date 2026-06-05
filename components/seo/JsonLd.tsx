import { buildSiteJsonLd } from "@/lib/seo/jsonLd";

export default function JsonLd() {
  const jsonLd = buildSiteJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
