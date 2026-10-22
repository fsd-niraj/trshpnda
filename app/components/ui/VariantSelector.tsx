"use client";

import { useMemo, useState } from "react";
import CheckoutButton from "./CheckoutButton";
import type { ShopifyProduct } from "@/app/lib/shopify";

type Props = {
  product: ShopifyProduct;
};

type Variant = ShopifyProduct["variants"]["nodes"][number];
type VariantOption = Variant["selectedOptions"][number];

function getVariantOptions(variants: Variant[]): string[] {
  return Array.from(
    new Set(
      variants.flatMap((variant) =>
        variant.selectedOptions.map((option) => option.name),
      ),
    ),
  );
}

function formatMoney(amount: string, currencyCode: string): string {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${currencyCode} ${amount}`;
  }

  try {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: currencyCode,
    }).format(numericAmount);
  } catch {
    return `${currencyCode} ${amount}`;
  }
}

export default function ProductVariantSelector({ product }: Props) {
  const variants: Variant[] = product.variants.nodes;

  const initialVariant = useMemo(
    () => variants.find((variant) => variant.availableForSale) ?? variants[0],
    [variants],
  );

  const optionGroups = useMemo(() => {
    const optionNames = getVariantOptions(variants);

    return optionNames.map((name) => ({
      name,
      values: Array.from(
        new Set(
          variants.flatMap((variant) =>
            variant.selectedOptions
              .filter((option) => option.name === name)
              .map((option) => option.value),
          ),
        ),
      ),
    }));
  }, [variants]);

  const [selection, setSelection] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (initialVariant?.selectedOptions ?? []).map((option: VariantOption) => [
        option.name,
        option.value,
      ]),
    ),
  );

  const selectedVariant = useMemo(
    () =>
      variants.find(
        (variant) =>
          variant.selectedOptions.every(
            (option) => selection[option.name] === option.value,
          ) &&
          optionGroups.every((group) =>
            variant.selectedOptions.some(
              (option) =>
                option.name === group.name &&
                option.value === selection[group.name],
            ),
          ),
      ),
    [variants, selection, optionGroups],
  );

  function updateOption(name: string, value: string): void {
    setSelection((current) => ({
      ...current,
      [name]: value,
    }));
  }

  if (variants.length === 0) {
    return (
      <p className="text-sm text-muted">
        This product has no available variants.
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      {optionGroups.map((group) => (
        <fieldset key={group.name} className="min-w-0 border-0 p-0">
          <legend className="mb-3 text-xs font-bold">
            {group.name}:{" "}
            <span className="font-medium text-muted">
              {selection[group.name] ?? "Select an option"}
            </span>
          </legend>

          <div className="flex flex-wrap gap-2">
            {group.values.map((value) => {
              const nextSelection = {
                ...selection,
                [group.name]: value,
              };

              const matchingVariant = variants.find(
                (variant) =>
                  variant.selectedOptions.every(
                    (option) => nextSelection[option.name] === option.value,
                  ) &&
                  optionGroups.every((optionGroup) =>
                    variant.selectedOptions.some(
                      (option) =>
                        option.name === optionGroup.name &&
                        option.value === nextSelection[optionGroup.name],
                    ),
                  ),
              );

              const unavailable =
                !matchingVariant || !matchingVariant.availableForSale;

              const active = selection[group.name] === value;

              return (
                <button
                  key={value}
                  type="button"
                  disabled={unavailable}
                  onClick={() => updateOption(group.name, value)}
                  aria-pressed={active}
                  className={`min-h-10 rounded-full border px-4 py-2 text-xs transition disabled:cursor-not-allowed disabled:opacity-30 ${
                    active
                      ? "border-ink bg-ink text-surface"
                      : "border-line bg-transparent text-ink hover:border-ink"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      {selectedVariant && (
        <p className="m-0 text-xl font-semibold tracking-[-.04em]">
          {formatMoney(
            selectedVariant.price.amount,
            selectedVariant.price.currencyCode,
          )}
        </p>
      )}

      <CheckoutButton
        items={
          selectedVariant?.availableForSale
            ? [{ variantId: selectedVariant.id, quantity: 1 }]
            : []
        }
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        className="min-h-[54px] w-full"
      >
        {selectedVariant?.availableForSale
          ? "Buy now"
          : "Select an available variant"}
      </CheckoutButton>
    </div>
  );
}
