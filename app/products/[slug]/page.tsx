
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "../../lib/products";
import { siteUrl, CREAM, GOLD, INK, PAPER } from "@/app/data";
import ProductDetails from "./ProductDetails";
import Link from "next/link";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Product not found | TRSHPNDA" };
  }

  const url = `${siteUrl}/products/${product.slug}`;
  const image = product.variants[0]?.image;

  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : undefined;

  return {
    title: `${product.name} | TRSHPNDA`,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} | TRSHPNDA`,
      description: product.description,
      url,
      type: "website",
      ...(absoluteImage
        ? { images: [{ url: absoluteImage, alt: product.name }] }
        : {}),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const url = `${siteUrl}/products/${product.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: product.name,
    description: product.description,
    productGroupID: product.id,
    url,
    variesBy: "https://schema.org/color",
    hasVariant: product.variants.map((variant) => ({
      "@type": "Product",
      name: `${product.name} - ${variant.name}`,
      sku: variant.sku,
      image: [
        variant.image.startsWith("http")
          ? variant.image
          : `${siteUrl}${variant.image}`,
      ],
      offers: {
        "@type": "Offer",
        url,
        price: variant.price,
        priceCurrency: variant.currency,
        availability: variant.available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    })),
  };

  return (
    <main
      className="min-h-screen px-5 py-8 sm:px-8 sm:py-12"
      style={{ background: PAPER, color: INK }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-[1400px]">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-anton)] text-2xl tracking-tight"
          >
            TRSHPNDA
          </Link>

          <Link
            href="/products"
            className="text-sm underline underline-offset-4"
          >
            All caps
          </Link>
        </header>

        <nav aria-label="Breadcrumb" className="mb-6 text-xs opacity-65">
          <Link href="/">Home</Link>
          <span className="px-2">/</span>
          <Link href="/products">Shop</Link>
          <span className="px-2">/</span>
          <span>{product.name}</span>
        </nav>

        <ProductDetails
          product={product}
          colors={{ ink: INK, cream: CREAM, gold: GOLD }}
        />
      </div>
    </main>
  );
}
