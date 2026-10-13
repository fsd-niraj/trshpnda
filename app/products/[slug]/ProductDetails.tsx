
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ProductDesign } from "../../lib/products";

type Props = {
  product: ProductDesign;
  colors: {
    ink: string;
    cream: string;
    gold: string;
  };
};

export default function ProductDetails({ product, colors }: Props) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? ""
  );
  const [selectedImage, setSelectedImage] = useState(0);

  const variant = product.variants.find(
    (item) => item.id === selectedVariantId
  );

  if (!variant) {
    return <p>No variants are available for this product yet.</p>;
  }

  const images = variant.images?.length
    ? variant.images
    : [variant.image];

  const formatPrice = (price: number, currency: "CAD" | "USD") =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency,
    }).format(price);

  function chooseVariant(id: string) {
    setSelectedVariantId(id);
    setSelectedImage(0);
  }

  return (
    <section className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        <div
          className="relative aspect-[5/5] overflow-hidden"
          style={{ background: colors.cream }}
        >
          <Image
            src={images[selectedImage]}
            alt={`${product.name} - ${variant.name}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {images.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`View product image ${index + 1}`}
                aria-pressed={selectedImage === index}
                onClick={() => setSelectedImage(index)}
                className="relative aspect-square overflow-hidden border"
                style={{
                  borderColor:
                    selectedImage === index
                      ? colors.ink
                      : `${colors.ink}33`,
                  background: colors.cream,
                }}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-start py-2 md:py-8">
        {product.featured && (
          <span
            className="mb-4 px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
            style={{ background: colors.gold, color: colors.ink }}
          >
            Featured
          </span>
        )}

        <p className="text-xs uppercase tracking-[0.25em] opacity-60">
          {product.style}
        </p>

        <h1 className="mt-3 font-[family-name:var(--font-anton)] text-4xl leading-tight sm:text-6xl">
          {product.name}
        </h1>

        <p className="mt-5 text-lg">
          {formatPrice(variant.price, variant.currency)}
        </p>

        <p className="mt-6 max-w-xl text-sm leading-7 opacity-75">
          {product.description}
        </p>

        <div className="mt-8 w-full max-w-sm">
          <p className="text-xs font-bold uppercase tracking-[0.15em]">
            Variant
          </p>

          <p className="mt-2 text-sm opacity-70">{variant.name}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {product.variants.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => chooseVariant(item.id)}
                aria-pressed={item.id === variant.id}
                className="border px-4 py-3 text-xs transition-colors"
                style={{
                  borderColor:
                    item.id === variant.id
                      ? colors.ink
                      : `${colors.ink}40`,
                  background:
                    item.id === variant.id
                      ? colors.ink
                      : "transparent",
                  color:
                    item.id === variant.id
                      ? colors.cream
                      : colors.ink,
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.15em]">
          <span style={{ color: variant.available ? "#476343" : "#9b3f2d" }}>
            {variant.available ? "Available" : "Currently unavailable"}
          </span>
          <span className="ml-3 opacity-50">SKU: {variant.sku}</span>
        </p>

        <button
          type="button"
          disabled={!variant.available}
          className="mt-8 w-full max-w-sm px-6 py-4 text-sm font-medium uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-45"
          style={{ background: colors.ink, color: colors.cream }}
        >
          {variant.available ? "Add to bag" : "Out of stock"}
        </button>

        <Link
          href="/products"
          className="mt-8 text-sm underline underline-offset-4"
        >
          ← Continue shopping
        </Link>
      </div>
    </section>
  );
}
