
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQs | TRSHPNDA",
  description:
    "Find answers about TRSHPNDA orders, products, shipping, sizing, and returns.",
};

const faqs = [
  {
    category: "Orders",
    questions: [
      {
        q: "How do I place an order?",
        a: "Choose your preferred cap, select any available options, and add it to your bag. Follow the checkout steps to complete your purchase.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Contact us as soon as possible. We'll do our best to help, but changes and cancellations cannot be guaranteed once an order enters processing or ships.",
      },
      {
        q: "How do I know my order went through?",
        a: "You'll receive an order confirmation email after completing your purchase. If it doesn't arrive, check your spam folder before contacting us.",
      },
    ],
  },
  {
    category: "Products & Fit",
    questions: [
      {
        q: "How do I choose the right fit?",
        a: "Visit our Size Guide for measuring instructions and general fit guidance. Check each product page for style-specific fit details.",
      },
      {
        q: "Will the colours look exactly as shown?",
        a: "We aim to represent our products accurately. Colours may appear slightly different depending on your screen settings and lighting.",
      },
      {
        q: "Will a sold-out cap return?",
        a: "Some styles may be restocked, while others may be released in limited quantities. Follow TRSHPNDA for updates on releases and restocks.",
      },
    ],
  },
  {
    category: "Shipping",
    questions: [
      {
        q: "How long will my order take to arrive?",
        a: "Processing times, available shipping methods, and estimated delivery times are outlined in our Shipping policy and at checkout.",
      },
      {
        q: "Will I receive tracking information?",
        a: "When tracking is available, you'll receive a link in your shipping confirmation email. Updates may take some time to appear.",
      },
      {
        q: "Do you ship internationally?",
        a: "Available destinations and shipping rates are displayed at checkout. International orders may be subject to import duties or taxes.",
      },
    ],
  },
  {
    category: "Returns",
    questions: [
      {
        q: "What is your return policy?",
        a: "Eligible items can be returned within 30 days of delivery, subject to the conditions in our Returns policy.",
      },
      {
        q: "When will I receive my refund?",
        a: "Approved refunds are issued to your original payment method. The time it takes to appear depends on your payment provider.",
      },
      {
        q: "What if my order arrives damaged or incorrect?",
        a: "Contact our support team with your order number and photos of the issue so we can review it and help with the next steps.",
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-[#EDE8DC] text-[#15140F]">
      <section className="border-b border-[#15140F]/15 px-6 py-16 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-[0.2em] opacity-60 hover:opacity-100"
          >
            TRSHPNDA / Support
          </Link>

          <p className="mt-12 text-xs font-bold uppercase tracking-[0.25em] text-[#B3492F]">
            Need to know
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
            Frequently
            <br />
            Asked Questions.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 opacity-75 sm:text-lg">
            Straight answers. Everything you need to know about your
            TRSHPNDA order, fit, and delivery.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-[220px_1fr] md:gap-20">
            <aside className="h-fit md:sticky md:top-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Browse topics
              </p>

              <nav className="mt-5 flex flex-wrap gap-4 md:flex-col">
                {faqs.map((group, index) => (
                  <a
                    key={group.category}
                    href={`#faq-${index}`}
                    className="text-sm opacity-65 transition-opacity hover:opacity-100"
                  >
                    {group.category}
                  </a>
                ))}
              </nav>
            </aside>

            <div className="max-w-3xl">
              {faqs.map((group, index) => (
                <section
                  key={group.category}
                  id={`faq-${index}`}
                  className="scroll-mt-8 border-t border-[#15140F]/20 py-8 sm:py-10"
                >
                  <p className="text-xs font-bold tracking-widest text-[#B3492F]">
                    0{index + 1}
                  </p>

                  <h2 className="mt-3 text-2xl font-black uppercase tracking-tight">
                    {group.category}
                  </h2>

                  <div className="mt-5">
                    {group.questions.map((item) => (
                      <details
                        key={item.q}
                        className="group border-t border-[#15140F]/15 py-5"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold sm:text-base">
                          <span>{item.q}</span>
                          <span className="text-xl font-normal transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>

                        <p className="mt-4 max-w-2xl pr-6 text-sm leading-7 opacity-75">
                          {item.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}

              <div className="border-t border-[#15140F]/20 py-8">
                <h2 className="text-xl font-black uppercase">
                  Still have questions?
                </h2>
                <p className="mt-3 text-sm leading-7 opacity-75">
                  Reach out to our team for help with your order or product.
                </p>
                <Link
                  href="/shipping"
                  className="mt-5 inline-flex bg-[#15140F] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#EDE8DC] transition-colors hover:bg-[#B3492F]"
                >
                  Shipping information
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#15140F]/15 px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="text-sm font-black uppercase tracking-[0.2em]"
          >
            TRSHPNDA
          </Link>
          <div className="flex flex-wrap gap-5 text-xs opacity-70">
            <Link href="/shipping">Shipping</Link>
            <Link href="/returns">Returns</Link>
            <Link href="/size-guide">Size Guide</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
