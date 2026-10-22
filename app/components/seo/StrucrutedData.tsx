import { siteUrl } from "@/app/data";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "TRSHPNDA",
        url: siteUrl,
        logo: `${siteUrl}/logo.jpeg`,
        description:
          "TRSHPNDA is a modern headwear brand creating premium caps designed for everyday wear.",
      }}
    />
  );
}

export function WebsiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "TRSHPNDA",
        url: siteUrl,
        inLanguage: "en-CA",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      }}
    />
  );
}

export type ProductSchemaProps = {
  name: string;
  description: string;
  image: string;
  url: string;
  sku?: string;
  price: number;
  currency: "CAD" | "USD";
  availability: "InStock" | "OutOfStock";
};

export function ProductJsonLd({
  name,
  description,
  image,
  url,
  sku,
  price,
  currency,
  availability,
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: [image],
    url,
    brand: {
      "@type": "Brand",
      name: "TRSHPNDA",
    },
    ...(sku ? { sku } : {}),
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: currency,
      price: price.toFixed(2),
      availability: `https://schema.org/${availability}`,
    },
  };

  return <JsonLd data={schema} />;
}
