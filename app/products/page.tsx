import type { Metadata } from "next";
import { getShopifyProducts } from "../lib/shopify";
import StoreHeader from "../components/ui/StoreHeader";
import ProductCard from "../components/ui/ProductCard";
import StoreFooter from "../components/ui/StoreFooter";
export const metadata: Metadata = {
  title: "Shop Caps | TRSHPNDA",
  description: "Explore the TRSHPNDA premium everyday headwear collection.",
};
export default async function ProductsPage() {
  const products = await getShopifyProducts(50);
  return (
    <>
      <StoreHeader />
      <main className="mx-auto min-h-[60vh] w-full max-w-[1440px] px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="mb-8 border-b border-line pb-7 sm:mb-10 sm:flex sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
              TRSHPNDA / Collection
            </p>
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-7xl">
              Shop caps.
            </h1>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted sm:mt-0">
            Premium everyday headwear, made to fit your rotation.
          </p>
        </div>
        {products.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
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
          <p className="py-16 text-sm text-muted">
            No caps are available right now. Check back for the next drop.
          </p>
        )}
      </main>
      <StoreFooter />
    </>
  );
}
