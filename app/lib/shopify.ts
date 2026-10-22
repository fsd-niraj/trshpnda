import "server-only";

const MAX_LINES = 20;
const MAX_QUANTITY_PER_LINE = 10;

const domain = requiredEnv("SHOPIFY_STORE_DOMAIN");
const token = requiredEnv("SHOPIFY_STOREFRONT_PRIVATE_TOKEN");
const version = getApiVersion();

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    nodes: Array<{
      id: string;
      title: string;
      availableForSale: boolean;
      price: {
        amount: string;
        currencyCode: string;
      };
      selectedOptions: Array<{
        name: string;
        value: string;
      }>;
    }>;
  };
};

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        id
        handle
        title
        description
        availableForSale
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 100) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export async function getShopifyProducts(
  first = 20,
): Promise<ShopifyProduct[]> {
  if (!Number.isInteger(first) || first < 1 || first > 50) {
    throw new Error("Product count must be between 1 and 50.");
  }

  const response = await fetch(
    `https://${domain}/api/${version}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": token,
      },
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: { first },
      }),
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`Shopify product request failed: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors?.length) {
    console.error("Shopify product query failed:", result.errors);
    throw new Error("Could not fetch Shopify products.");
  }

  return result.data?.products?.nodes ?? [];
}

export type CheckoutLineInput = {
  variantId: string;
  quantity: number;
};

type ShopifyGraphQLError = {
  message?: string;
};

type CartCreateResponse = {
  data?: {
    cartCreate?: {
      cart?: {
        checkoutUrl?: string | null;
      } | null;
      userErrors?: Array<{ message: string; field?: string[] | null }>;
      warnings?: Array<{ message: string }>;
    } | null;
  };
  errors?: ShopifyGraphQLError[];
};

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function getShopDomain(): string {
  // Restrict requests to a Shopify-managed domain; do not accept arbitrary URLs.
  const lowerCaseDomain = domain.toLowerCase();
  if (
    !/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(lowerCaseDomain) ||
    lowerCaseDomain.includes("..")
  ) {
    throw new Error(
      "SHOPIFY_STORE_DOMAIN must be a valid *.myshopify.com domain.",
    );
  }

  return lowerCaseDomain;
}

function getApiVersion(): string {
  const version = requiredEnv("SHOPIFY_API_VERSION");
  if (!/^\d{4}-\d{2}$/.test(version)) {
    throw new Error("SHOPIFY_API_VERSION must use YYYY-MM format.");
  }
  return version;
}

export function validateCheckoutLines(input: unknown): CheckoutLineInput[] {
  if (!Array.isArray(input) || input.length < 1 || input.length > MAX_LINES) {
    throw new Error(`Provide between 1 and ${MAX_LINES} cart items.`);
  }

  const lines = input.map((item: unknown) => {
    if (!item || typeof item !== "object") {
      throw new Error("Each cart item must be an object.");
    }

    const record = item as Record<string, unknown>;
    const variantId = record.variantId;
    const quantity = record.quantity;

    if (
      typeof variantId !== "string" ||
      !/^gid:\/\/shopify\/ProductVariant\/\d+$/.test(variantId)
    ) {
      throw new Error(
        "Each item must include a valid Shopify product variant ID.",
      );
    }

    if (
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY_PER_LINE
    ) {
      throw new Error(
        `Quantity must be an integer between 1 and ${MAX_QUANTITY_PER_LINE}.`,
      );
    }

    return { variantId, quantity };
  });

  // Combine duplicate variant IDs to avoid duplicate lines from a malformed client.
  const combined = new Map<string, number>();
  for (const line of lines) {
    combined.set(
      line.variantId,
      (combined.get(line.variantId) ?? 0) + line.quantity,
    );
  }

  return Array.from(combined, ([variantId, quantity]) => {
    if (quantity > MAX_QUANTITY_PER_LINE) {
      throw new Error(
        `Total quantity for a variant cannot exceed ${MAX_QUANTITY_PER_LINE}.`,
      );
    }
    return { variantId, quantity };
  });
}

function validateCheckoutUrl(rawUrl: string): string {
  const url = new URL(rawUrl);
  const shopDomain = getShopDomain();
  console.log("SHOPIFY DOMAIN", shopDomain);

  const allowedHosts = new Set([
    getShopDomain(),
    "www.trshpnda.ca",
    "trshpnda.ca",
  ]);

  if (
    url.protocol !== "https:" ||
    !allowedHosts.has(url.hostname.toLowerCase()) ||
    url.username ||
    url.password
  ) {
    throw new Error("Shopify returned an unexpected checkout URL.");
  }

  return url.toString();
}

export async function createShopifyCheckout(lines: CheckoutLineInput[]) {
  const country = (process.env.SHOPIFY_DEFAULT_COUNTRY || "CA").toUpperCase();

  if (!/^[A-Z]{2}$/.test(country)) {
    throw new Error(
      "SHOPIFY_DEFAULT_COUNTRY must be a two-letter country code.",
    );
  }

  const endpoint = `https://${domain}/api/${version}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": token,
    },
    body: JSON.stringify({
      query: `
        mutation CreateCart($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              checkoutUrl
            }
            userErrors {
              field
              message
            }
            warnings {
              message
            }
          }
        }
      `,
      variables: {
        input: {
          lines: lines.map((line) => ({
            merchandiseId: line.variantId,
            quantity: line.quantity,
          })),
          buyerIdentity: {
            countryCode: country,
          },
        },
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    // Do not return Shopify response bodies or credentials to the browser.
    throw new Error(`Shopify Storefront API returned HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as CartCreateResponse;

  if (payload.errors?.length) {
    throw new Error("Shopify could not create a cart.");
  }

  const cartCreate = payload.data?.cartCreate;
  if (!cartCreate) {
    throw new Error("Shopify returned an unexpected cart response.");
  }

  if (cartCreate.userErrors?.length) {
    const messages = cartCreate.userErrors
      .map((error) => error.message)
      .join("; ");
    throw new Error(`Shopify rejected the cart: ${messages}`);
  }

  const checkoutUrl = cartCreate.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error("Shopify did not return a checkout URL.");
  }

  return {
    checkoutUrl: validateCheckoutUrl(checkoutUrl),
    warnings: cartCreate.warnings?.map((warning) => warning.message) ?? [],
  };
}

export async function getShopifyProductByHandle(
  handle: string,
): Promise<ShopifyProduct | null> {
  if (
    !handle ||
    handle.length > 255 ||
    !/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(handle)
  ) {
    return null;
  }

  const query = `
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        availableForSale
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 100) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${domain}/api/${version}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": token,
      },
      body: JSON.stringify({
        query,
        variables: { handle },
      }),
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error(`Shopify product lookup failed: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors?.length) {
    console.error("Shopify product lookup errors:", result.errors);
    throw new Error("Could not fetch product from Shopify.");
  }

  return result.data?.product ?? null;
}
