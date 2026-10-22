import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getShopifyProductByHandle } from "../../lib/shopify";
import ProductVariantSelector from "@/app/components/ui/VariantSelector";

type PageProps = { params: Promise<{ handle: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { handle } = await params;
  try {
    const product = await getShopifyProductByHandle(handle);
    if (!product) return { title: "Product Not Found" };
    return {
      title: product.title,
      description:
        product.description?.slice(0, 160) ||
        `Shop ${product.title} at TRSHPNDA.`,
      openGraph: {
        title: `${product.title} | TRSHPNDA`,
        description: product.description,
        images: product.featuredImage ? [product.featuredImage.url] : [],
      },
    };
  } catch {
    return { title: "TRSHPNDA" };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getShopifyProductByHandle(handle);
  if (!product) notFound();
  const image = product.featuredImage;
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1600px] bg-paper px-4 sm:px-6 lg:px-16">
      <div className="py-8 sm:py-16">
        <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(300px,.75fr)] md:gap-12 lg:gap-24">
          <div className="relative aspect-square overflow-hidden rounded-2xl sm:rounded-[20px]">
            {image ? (
              <Image
                className="object-contain p-[8%] mix-blend-multiply"
                src={image.url}
                alt={image.altText || product.title}
                fill
                priority
                sizes="(max-width: 650px) 100vw, 55vw"
              />
            ) : (
              <div className="grid h-full min-h-72 place-items-center text-muted">
                No product image available
              </div>
            )}
          </div>
          <section className="pt-1 md:pt-8">
            <Link
              className="text-[10px] font-bold uppercase tracking-[.16em]"
              href="/products"
            >
              TRSHPNDA / Headwear ↗
            </Link>
            <h1 className="mt-4 font-display text-5xl leading-none tracking-[-.07em] sm:text-7xl">
              {product.title}
            </h1>
            <p className="mt-6 whitespace-pre-line text-[13px] leading-7 text-muted">
              {product.description || "A statement cap for your own frequency."}
            </p>
            <div className="mt-8 w-full">
              <ProductVariantSelector product={product} />
            </div>
            {!product.availableForSale && (
              <p className="mt-4 text-xs text-[#9a3d75]">
                This cap is currently unavailable.
              </p>
            )}
          </section>
        </div>
      </div>
      <footer className="flex flex-col items-start justify-between gap-3 border-t border-line py-6 sm:flex-row sm:items-center">
        <Link className="text-[13px] font-bold tracking-[-.06em]" href="/">
          TRSHPNDA®
        </Link>
        <p className="text-[10px] text-muted">Small runs. Big personality.</p>
        <div className="flex flex-wrap gap-4 text-[10px] font-semibold">
          <Link href="/products">Shop all caps</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/shipping">Shipping</Link>
        </div>
      </footer>
    </main>
  );
}
