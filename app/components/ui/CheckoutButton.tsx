"use client";

import { useState } from "react";

export type CheckoutItem = { variantId: string; quantity: number };
type CheckoutButtonProps = {
  items: CheckoutItem[];
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function CheckoutButton({
  items,
  children = "Continue to checkout",
  className = "",
  disabled = false,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    if (loading || disabled || items.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const result = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };
      if (!response.ok || !result.checkoutUrl)
        throw new Error(result.error || "Checkout could not be started.");
      window.location.assign(result.checkoutUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to start checkout. Please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={startCheckout}
        disabled={disabled || loading || items.length === 0}
        aria-busy={loading}
        className={`inline-flex min-h-[46px] items-center justify-center gap-4 rounded-full border border-ink bg-ink px-5 py-3 text-[10px] font-bold uppercase tracking-[.06em] text-surface transition hover:-translate-y-0.5 hover:border-brand-green hover:bg-brand-green hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        {loading ? "Redirecting to checkout…" : children}
      </button>
      {error && (
        <p role="alert" className="text-xs leading-6 text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
