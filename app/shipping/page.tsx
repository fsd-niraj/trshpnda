
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Delivery | TRSHPNDA",
  description:
    "Learn about TRSHPNDA order processing, shipping, delivery estimates, and tracking.",
};

const sections = [
  {
    title: "Order Processing",
    content: (
      <p>
        Orders are processed within <strong>1–3 business days</strong>.
        Processing times may vary during product launches and peak periods.
        Once your order ships, you’ll receive a confirmation email with
        tracking information where available.
      </p>
    ),
  },
  {
    title: "Shipping & Delivery",
    content: (
      <>
        <p>
          Available shipping methods, costs, and estimated delivery times
          are displayed at checkout before you complete your purchase.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Standard shipping: estimated delivery shown at checkout.</li>
          <li>Express shipping: available where offered.</li>
          <li>
            International shipping: destinations and rates are shown at
            checkout where available.
          </li>
        </ul>
        <p className="mt-4">
          Delivery estimates are not guaranteed. Carrier disruptions,
          weather, customs, and other circumstances may cause delays.
        </p>
      </>
    ),
  },
  {
    title: "Track Your Order",
    content: (
      <p>
        When tracking is available, you’ll find the tracking link in your
        shipping confirmation email. Updates may take some time to appear
        after dispatch.
      </p>
    ),
  },
  {
    title: "Duties & Taxes",
    content: (
      <p>
        Applicable taxes are calculated at checkout. International orders
        may be subject to customs duties, import taxes, or other fees
        depending on the destination.
      </p>
    ),
  },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#EDE8DC] text-[#15140F]">
      {/* Page heading */}
      <section className="border-b border-[#15140F]/15 px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-[0.2em] opacity-60 hover:opacity-100"
          >
            TRSHPNDA / Support
          </Link>

          <p className="mt-12 text-xs font-bold uppercase tracking-[0.25em] text-[#B3492F]">
            The essentials
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
            Shipping
            <br />
            & Delivery.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 opacity-75 sm:text-lg">
            Good headwear is worth the wait. Here’s what to know about
            getting your TRSHPNDA order to your door.
          </p>
        </div>
      </section>

      {/* Policy content */}
      <section className="px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[220px_1fr] md:gap-20">
          <aside className="h-fit md:sticky md:top-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              On this page
            </p>

            <nav className="mt-5 flex flex-wrap gap-3 md:flex-col md:gap-4">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#section-${index}`}
                  className="text-sm opacity-65 transition-opacity hover:opacity-100"
                >
                  {section.title}
                </a>
              ))}
            </nav>

            <div className="mt-8 hidden border-t border-[#15140F]/15 pt-5 md:block">
              <p className="text-sm leading-6 opacity-65">
                Need a hand with an order?
              </p>
              <Link
                href="/faqs"
                className="mt-2 inline-block text-sm font-bold underline underline-offset-4"
              >
                Visit FAQs
              </Link>
            </div>
          </aside>

          <div className="max-w-3xl">
            <p className="mb-10 text-sm leading-7 opacity-70">
              Last updated: October 2026
            </p>

            {sections.map((section, index) => (
              <article
                key={section.title}
                id={`section-${index}`}
                className="scroll-mt-8 border-t border-[#15140F]/20 py-8 sm:py-10"
              >
                <div className="grid gap-4 sm:grid-cols-[44px_1fr] sm:gap-6">
                  <span className="text-xs font-bold tracking-widest text-[#B3492F]">
                    0{index + 1}
                  </span>

                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight sm:text-2xl">
                      {section.title}
                    </h2>

                    <div className="mt-4 text-sm leading-7 opacity-80 sm:text-base">
                      {section.content}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="mt-4 border-t border-[#15140F]/20 py-8">
              <h2 className="text-xl font-black uppercase tracking-tight">
                Need help?
              </h2>
              <p className="mt-3 text-sm leading-7 opacity-75">
                Contact our team with your order number and we’ll help
                you find the next step.
              </p>
              <Link
                href="/faqs"
                className="mt-5 inline-flex items-center justify-center bg-[#15140F] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#EDE8DC] transition-colors hover:bg-[#B3492F]"
              >
                Get support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom navigation */}
      <footer className="border-t border-[#15140F]/15 px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="text-sm font-black uppercase tracking-[0.2em]"
          >
            TRSHPNDA
          </Link>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs opacity-70">
            <Link href="/returns" className="hover:opacity-100">
              Returns
            </Link>
            <Link href="/faqs" className="hover:opacity-100">
              FAQs
            </Link>
            <Link href="/size-guide" className="hover:opacity-100">
              Size Guide
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
