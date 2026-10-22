import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers about TRSHPNDA orders, products, shipping, sizing, and returns.",
};

const faqs = [
  {
    category: "Orders",
    questions: [
      {
        q: "How do I place an order?",
        a: "Choose your preferred cap, select any available options, and follow the checkout steps to complete your purchase.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Contact us as soon as possible. We’ll do our best to help, but changes and cancellations cannot be guaranteed once an order enters processing or ships.",
      },
      {
        q: "How do I know my order went through?",
        a: "You’ll receive an order confirmation email after completing your purchase. If it doesn’t arrive, check your spam folder before contacting us.",
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
        a: "When tracking is available, you’ll receive a link in your shipping confirmation email. Updates may take some time to appear.",
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
        a: "Contact our support team with your order number and photos of the issue so we can review it and help with next steps.",
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1600px] bg-paper px-4 sm:px-6 lg:px-16">
      <header className="border-b border-line py-10 sm:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            className="text-[10px] font-bold uppercase tracking-[.16em]"
            href="/"
          >
            TRSHPNDA / Support ↗
          </Link>
          <p className="mt-10 text-[10px] font-bold uppercase tracking-[.16em] text-[#9a3d75]">
            Good to know
          </p>
          <h1 className="mt-5 font-display text-6xl leading-none tracking-[-.07em] sm:text-8xl">
            Questions? <em>Sorted.</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-base">
            Straight answers. Everything you need to know about your TRSHPNDA
            order, fit, and delivery.
          </p>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-10 sm:py-16 lg:grid-cols-[190px_minmax(0,760px)] lg:gap-24">
        <aside className="self-start lg:sticky lg:top-6">
          <p className="text-[10px] font-bold uppercase tracking-[.16em]">
            Browse topics
          </p>
          <nav className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-4">
            {faqs.map((group, index) => (
              <a
                className="rounded-full bg-surface px-3 py-2 text-xs text-muted hover:text-ink lg:bg-transparent lg:px-0"
                key={group.category}
                href={`#faq-${index}`}
              >
                {group.category}
              </a>
            ))}
          </nav>
        </aside>
        <div>
          {faqs.map((group, index) => (
            <section
              key={group.category}
              id={`faq-${index}`}
              className="scroll-mt-6 border-t border-line py-7"
            >
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#9a3d75]">
                0{index + 1} / Support
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-[-.05em] sm:text-4xl">
                {group.category}
              </h2>
              <div className="mt-5">
                {group.questions.map((item) => (
                  <details
                    key={item.q}
                    className="group border-t border-line py-5"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[13px] font-semibold">
                      <span>{item.q}</span>
                      <span className="text-xl font-normal transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mr-7 mt-4 text-xs leading-7 text-muted">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
          <section className="mt-4 rounded-2xl bg-brand-pink p-7 sm:rounded-[20px]">
            <h2 className="font-display text-3xl tracking-[-.05em]">
              Still wondering?
            </h2>
            <p className="my-3 text-xs leading-6">
              Find more details about delivery, returns, and getting the right
              fit.
            </p>
            <Link
              className="inline-flex items-center gap-5 rounded-full bg-ink px-5 py-3 text-[10px] font-bold uppercase text-surface transition hover:bg-brand-green hover:text-ink"
              href="/shipping"
            >
              Shipping information ↗
            </Link>
          </section>
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
          <Link href="/shipping">Shipping</Link>
          <Link href="/returns">Returns</Link>
          <Link href="/size-guide">Size guide</Link>
        </div>
      </footer>
    </main>
  );
}
