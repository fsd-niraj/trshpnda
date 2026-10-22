import { NextRequest, NextResponse } from "next/server";
import {
  createShopifyCheckout,
  validateCheckoutLines,
} from "../../lib/shopify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  // Basic origin check for browser-based same-site requests. This is not a
  // replacement for rate limiting or bot protection.
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      const allowedHosts = new Set(
        [host, request.headers.get("host")]
          .filter((value): value is string => Boolean(value))
          .map((value) => value.toLowerCase()),
      );

      if (!allowedHosts.has(originUrl.host.toLowerCase())) {
        return jsonError("Invalid request origin.", 403);
      }
    } catch {
      return jsonError("Invalid request origin.", 403);
    }
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonError("Content-Type must be application/json.", 415);
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 20_000) {
      return jsonError("Request body is too large.", 413);
    }
    body = JSON.parse(rawBody);
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  try {
    if (!body || typeof body !== "object" || !("items" in body)) {
      return jsonError("Request must include an items array.", 400);
    }

    const items = validateCheckoutLines((body as { items: unknown }).items);
    const result = await createShopifyCheckout(items);

    return NextResponse.json(
      {
        checkoutUrl: result.checkoutUrl,
        warnings: result.warnings,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout could not be created.";
    console.error("[checkout] Failed to create Shopify checkout:", message);

    // Validation errors are client errors; upstream/API failures are gateway errors.
    const isValidationError =
      /provide between|each cart item|valid Shopify product variant|quantity must|total quantity/i.test(
        message,
      );

    return jsonError(
      isValidationError
        ? message
        : "Unable to start checkout. Please try again.",
      isValidationError ? 400 : 502,
    );
  }
}
