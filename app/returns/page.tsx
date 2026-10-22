import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description:
    "Review the TRSHPNDA return window, refund process, and return conditions.",
};

const sections = [
  {
    title: "Return Window",
    content: (
      <p>
        Eligible items can be returned within{" "}
        <strong>30 days of delivery</strong>. To qualify, your return request
        must be submitted within this period and the item must meet the
        conditions outlined below.
      </p>
    ),
  },
  {
    title: "Return Requirements",
    content: (
      <>
        <p>To qualify for a return, your item must be:</p>
        <ul>
          <li>Unworn and unused.</li>
          <li>Free from marks, stains, odors, or damage.</li>
          <li>
            Returned with original packaging, tags, and accessories where
            applicable.
          </li>
          <li>Accompanied by proof of purchase or your order number.</li>
        </ul>
        <p>
          Items showing signs of wear or damage may be ineligible for a refund.
          Please handle and try on headwear carefully.
        </p>
      </>
    ),
  },
  {
    title: "How to Start a Return",
    content: (
      <>
        <ol>
          <li>Contact our team within 30 days of delivery.</li>
          <li>Include your order number and the item you wish to return.</li>
          <li>Follow the return instructions provided by our team.</li>
          <li>Send the item using the approved return method.</li>
        </ol>
        <p>
          Please use the support contact provided in your order confirmation or
          on the official store contact page. Wait for return instructions
          before sending an item back.
        </p>
      </>
    ),
  },
  {
    title: "Refunds",
    content: (
      <p>
        Once your return arrives and passes inspection, we’ll notify you of the
        outcome. Approved refunds are issued to your original payment method.
        The time it takes to appear depends on your payment provider.
      </p>
    ),
  },
  {
    title: "Return Shipping",
    content: (
      <p>
        Return shipping arrangements and responsibility should be confirmed with
        the support team before sending an item back. Original shipping charges
        and any exceptions are subject to the store’s confirmed policy and
        applicable law.
      </p>
    ),
  },
  {
    title: "Damaged or Incorrect Items",
    content: (
      <p>
        If your order arrives damaged or you receive the wrong item, contact the
        support team with your order number and clear photos of the issue. We’ll
        review the details and help with the next steps.
      </p>
    ),
  },
  {
    title: "Exchanges & Final Sale",
    content: (
      <p>
        Exchanges depend on product availability and may require returning the
        original item before placing a new order. Any final-sale restrictions
        are subject to applicable law.
      </p>
    ),
  },
];

export default function ReturnsPage() {
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
            No hard feelings
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[.95] tracking-[-.07em] sm:text-8xl">
            Returns
            <br />
            &amp; Refunds.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-base">
            We want you to feel good about what you wear. If it’s not the right
            fit, here’s how to request a return for an eligible purchase.
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
        </aside>
        <div>
          <div className="rounded-2xl bg-brand-green p-6 sm:rounded-[20px]">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.16em]">
              The return window
            </p>
            <strong className="block text-5xl font-semibold tracking-[-.06em] sm:text-6xl">
              30 days.
            </strong>
            <p className="mt-2 max-w-lg text-xs leading-6">
              From delivery, for eligible items that meet the store’s return
              requirements.
            </p>
          </div>
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
          <p className="mt-6 text-[11px] leading-6 text-muted">
            Before publishing, confirm the return-contact method, shipping
            responsibility, refund timing, and any final-sale terms. This page
            does not limit rights under applicable consumer protection laws.
          </p>
          <p className="mt-6">
            <Link
              className="inline-flex items-center gap-5 rounded-full bg-ink px-5 py-3 text-[10px] font-bold uppercase text-surface transition hover:bg-brand-green hover:text-ink"
              href="/faqs"
            >
              Read FAQs ↗
            </Link>
          </p>
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
          <Link href="/faqs">FAQs</Link>
          <Link href="/size-guide">Size guide</Link>
        </div>
      </footer>
    </main>
  );
}
