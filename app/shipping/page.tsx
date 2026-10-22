import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Learn about TRSHPNDA order processing, shipping, delivery estimates, and tracking.",
};

const sections = [
  {
    title: "Order Processing",
    content: (
      <>
        <p>
          Orders are processed within <strong>1–3 business days</strong>.
          Processing times may vary during product launches and peak periods.
          Once your order ships, you’ll receive a confirmation email with
          tracking information where available.
        </p>
      </>
    ),
  },
  {
    title: "Shipping & Delivery",
    content: (
      <>
        <p>
          Available shipping methods, costs, and estimated delivery times are
          displayed at checkout before you complete your purchase.
        </p>
        <ul>
          <li>Standard shipping: estimated delivery shown at checkout.</li>
          <li>Express shipping: available where offered.</li>
          <li>
            International shipping: destinations and rates are shown at checkout
            where available.
          </li>
        </ul>
        <p>
          Delivery estimates are not guaranteed. Carrier disruptions, weather,
          customs, and other circumstances may cause delays.
        </p>
      </>
    ),
  },
  {
    title: "Track Your Order",
    content: (
      <p>
        When tracking is available, you’ll find the tracking link in your
        shipping confirmation email. Updates may take some time to appear after
        dispatch.
      </p>
    ),
  },
  {
    title: "Duties & Taxes",
    content: (
      <p>
        Applicable taxes are calculated at checkout. International orders may be
        subject to customs duties, import taxes, or other fees depending on the
        destination.
      </p>
    ),
  },
];

export default function ShippingPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1600px] bg-paper px-4 sm:px-6 lg:px-16">
      <header className="border-b border-line py-10 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <Link
            className="text-[10px] font-bold uppercase tracking-[.16em]"
            href="/"
          >
            TRSHPNDA / Support ↗
          </Link>
          <p className="mt-10 text-[10px] font-bold uppercase tracking-[.16em] text-[#9a3d75]">
            The essentials
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[.95] tracking-[-.07em] sm:text-8xl">
            Shipping
            <br />
            &amp; Delivery.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-base">
            Good headwear is worth the wait. Here’s what to know about getting
            your TRSHPNDA order to your door.
          </p>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-10 sm:py-16 lg:grid-cols-[220px_minmax(0,760px)] lg:gap-24">
        <aside className="self-start lg:sticky lg:top-6">
          <p className="text-[10px] font-bold uppercase tracking-[.16em]">
            On this page
          </p>
          <nav className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-4">
            {sections.map((section, index) => (
              <a
                key={section.title}
                className="rounded-full bg-surface px-3 py-2 text-xs text-muted hover:text-ink lg:bg-transparent lg:px-0"
                href={`#section-${index}`}
              >
                {section.title}
              </a>
            ))}
          </nav>
          <p className="mt-7 text-xs leading-6 text-muted">
            Need a hand with an order?{" "}
            <Link className="underline" href="/faqs">
              Visit FAQs
            </Link>
          </p>
        </aside>
        <div>
          <p className="mb-6 text-[11px] text-muted">
            Shipping options and prices are confirmed at checkout.
          </p>
          {sections.map((section, index) => (
            <article
              key={section.title}
              id={`section-${index}`}
              className="scroll-mt-6 border-t border-line py-7"
            >
              <div className="grid grid-cols-[36px_1fr] gap-4">
                <span className="pt-1.5 text-[10px] font-bold tracking-[.12em] text-[#9a3d75]">
                  0{index + 1}
                </span>
                <h2 className="text-xl font-semibold tracking-[-.04em] sm:text-2xl">
                  {section.title}
                </h2>
              </div>
              <div className="ml-0 mt-4 space-y-3 text-[13px] leading-7 text-muted sm:ml-[52px] [&_li]:ml-5 [&_li]:list-disc [&_ol_li]:list-decimal [&_ul]:my-3">
                {section.content}
              </div>
            </article>
          ))}
        </div>
      </div>
      <footer className="flex flex-col items-start justify-between gap-3 border-t border-line py-6 sm:flex-row sm:items-center">
        <Link className="text-[13px] font-bold tracking-[-.06em]" href="/">
          TRSHPNDA®
        </Link>
        <p className="text-[10px] text-muted">
          Headwear for your own frequency.
        </p>
        <div className="flex flex-wrap gap-4 text-[10px] font-semibold">
          <Link href="/faqs">FAQs</Link>
          <Link href="/returns">Returns</Link>
          <Link href="/size-guide">Size guide</Link>
        </div>
      </footer>
    </main>
  );
}
