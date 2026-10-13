
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "../lib/products";
import { CREAM, INK, PAPER, GOLD, siteUrl } from "@/app/data";

export const metadata: Metadata = {
  title: "Shop Caps | TRSHPNDA",
  description:
    "Explore the TRSHPNDA collection. Discover premium everyday headwear.",
  alternates: {
    canonical: `${siteUrl}/products`,
  },
  openGraph: {
    title: "Shop Caps | TRSHPNDA",
    description:
      "Explore the TRSHPNDA collection. Discover premium everyday headwear.",
    url: `${siteUrl}/products`,
    type: "website",
  },
};

function formatPrice(price: number, currency: "CAD" | "USD") {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
  }).format(price);
}

export default function ProductsPage() {
  const availableProducts = products.filter(
    (product) => product.variants.length > 0
  );

  return (
    <main
      className="min-h-screen px-5 py-12 sm:px-8 lg:py-16"
      style={{ background: PAPER, color: INK }}
    >
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-block font-[family-name:var(--font-anton)] text-xl tracking-tight"
          >
            TRSHPNDA
          </Link>

          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] opacity-60">
            The collection
          </p>

          <h1 className="font-[family-name:var(--font-anton)] text-4xl tracking-tight sm:text-6xl">
            Shop caps.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 opacity-70 sm:text-base">
            Everyday headwear. Clean design. Made to wear your way.
          </p>
        </header>

        {availableProducts.length === 0 ? (
          <section
            className="border-y py-20 text-center"
            style={{ borderColor: "rgba(21,20,15,0.2)" }}
          >
            <h2 className="font-[family-name:var(--font-anton)] text-2xl">
              New headwear coming soon
            </h2>
            <p className="mt-3 text-sm opacity-65">
              Our collection is being prepared. Check back soon.
            </p>
          </section>
        ) : (
          <section
            aria-label="Cap designs"
            className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4"
          >
            {availableProducts.map((product) => {
              const variant = product.variants[0];

              return (
                <article key={product.id} className="min-w-0">
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block"
                  >
                    <div
                      className="relative aspect-[4/5] overflow-hidden"
                      style={{ background: CREAM }}
                    >
                      <Image
                        src={variant.image}
                        alt={`${product.name} ${product.style} cap — ${variant.name}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />

                      {product.featured && (
                        <span
                          className="absolute left-3 top-3 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em]"
                          style={{ background: GOLD, color: INK }}
                        >
                          Featured
                        </span>
                      )}
                    </div>

                    <div
                      className="flex items-start justify-between gap-3 border-t border-dashed pt-3"
                      style={{ borderColor: "rgba(21,20,15,0.25)" }}
                    >
                      <div className="min-w-0">
                        <h2 className="text-sm font-medium sm:text-base">
                          {product.name}
                        </h2>

                        <p className="mt-1 text-xs opacity-60">
                          {product.style}
                        </p>

                        <p className="mt-2 text-xs opacity-60">
                          {product.variants.length}{" "}
                          {product.variants.length === 1
                            ? "variant"
                            : "variants"}
                        </p>
                      </div>

                      <p className="whitespace-nowrap text-sm">
                        {formatPrice(variant.price, variant.currency)}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </section>
        )}

        <div
          className="mt-16 border-t pt-6"
          style={{ borderColor: "rgba(21,20,15,0.2)" }}
        >
          <Link
            href="/"
            className="text-sm underline underline-offset-4"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
