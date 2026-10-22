import Link from "next/link";
import { getShopifyProducts } from "./lib/shopify";
import StoreHeader from "./components/ui/StoreHeader";
import ProductCard from "./components/ui/ProductCard";
import StoreFooter from "./components/ui/StoreFooter";

export default async function HomePage() {
  const products = await getShopifyProducts(4);
  return (
    <>
      <StoreHeader />
      <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <section className="grid min-h-[390px] items-end gap-8 py-12 sm:min-h-[500px] sm:grid-cols-[1.15fr_.85fr] sm:py-16 lg:min-h-[570px] lg:py-20">
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">
              TRSHPNDA · Premium everyday headwear
            </p>
            <h1 className="max-w-3xl text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">
              Made to
              <br />
              be <span className="text-muted">worn.</span>
            </h1>
          </div>
          <div className="max-w-sm pb-1 sm:justify-self-end sm:pb-2">
            <p className="max-w-xs text-sm leading-7 text-muted sm:text-base">
              Everyday headwear. Thoughtful details. A cap for wherever the day
              takes you.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-8 rounded-full bg-ink px-6 text-xs font-semibold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-neutral-700"
            >
              Shop all caps <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section
          className="border-t border-line pt-7 sm:pt-9"
          aria-labelledby="featured-title"
        >
          <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                The collection
              </p>
              <h2
                id="featured-title"
                className="text-3xl font-bold uppercase tracking-[-0.04em] sm:text-4xl"
              >
                Caps, on rotation.
              </h2>
            </div>
            <Link
              href="/products"
              className="pb-1 text-xs underline underline-offset-4 sm:text-sm"
            >
              View all
            </Link>
          </div>
          {products.length ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {products.map((p) => (
                <ProductCard
                  key={p.handle}
                  handle={p.handle}
                  name={p.title}
                  price={p.priceRange.minVariantPrice.amount}
                  currencyCode={p.priceRange.minVariantPrice.currencyCode}
                  imgUrl={p.featuredImage?.url}
                  imgAlt={p.featuredImage?.altText}
                  isAvailable={p.availableForSale}
                />
              ))}
            </div>
          ) : (
            <p className="py-12 text-sm text-muted">
              New caps are on the way. Please check back soon.
            </p>
          )}
        </section>
        <section className="my-16 rounded-2xl bg-panel px-5 py-10 sm:my-24 sm:px-10 sm:py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            The TRSHPNDA approach
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 sm:items-end">
            <h2 className="max-w-xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] sm:text-6xl">
              Less noise.
              <br />
              More you.
            </h2>
            <p className="m-0 max-w-md text-sm leading-7 text-muted sm:justify-self-end">
              Simple silhouettes and considered details, made to fit naturally
              into your everyday rotation.
            </p>
          </div>
        </section>
      </main>
      <StoreFooter />
    </>
  );
}
