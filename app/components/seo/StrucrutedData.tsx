export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TRSHPNDA",
    url: "https://trshpnda.ca",
    logo: "https://trshpnda.ca/trshpndajpeg.jpeg",
    description:
      "TRSHPNDA is a modern headwear brand creating premium caps designed for everyday wear.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TRSHPNDA",
    url: "https://trshpnda.ca",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}