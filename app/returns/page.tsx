
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Refunds | TRSHPNDA",
  description:
    "Review the TRSHPNDA 30-day return policy, refund process, and return conditions.",
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
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Unworn and unused.</li>
          <li>Free from marks, stains, odors, or damage.</li>
          <li>Returned with original packaging, tags, and accessories where applicable.</li>
          <li>Accompanied by proof of purchase or your order number.</li>
        </ul>
        <p className="mt-4">
          Items showing signs of wear or damage may be ineligible for a
          refund. Please handle and try on headwear carefully.
        </p>
      </>
    ),
  },
  {
    title: "How to Start a Return",
    content: (
      <>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Contact our team within 30 days of delivery.</li>
          <li>Include your order number and the item you wish to return.</li>
          <li>Follow the return instructions provided by our team.</li>
          <li>Send the item using the approved return method.</li>
        </ol>
        <p className="mt-4">
          Contact <strong>[support email]</strong> to begin. Please wait for
          return instructions before sending an item back.
        </p>
      </>
    ),
  },
  {
    title: "Refunds",
    content: (
      <p>
        Once your return arrives and passes inspection, we’ll notify you
        of the outcome. Approved refunds are issued to your original payment
        method. Please allow <strong>[5–10 business days]</strong> after
        approval for the refund to appear, depending on your payment provider.
      </p>
    ),
  },
  {
    title: "Return Shipping",
    content: (
      <p>
        Return shipping costs are <strong>[paid by the customer / covered by
          TRSHPNDA]</strong>, except where applicable law requires otherwise or
        an incorrect or defective item was sent. Original shipping charges
        are <strong>[non-refundable, subject to applicable law]</strong>.
      </p>
    ),
  },
  {
    title: "Damaged or Incorrect Items",
    content: (
      <p>
        If your order arrives damaged or you receive the wrong item, contact
        us with your order number and clear photos of the issue. We’ll review
        the details and help with the next steps.
      </p>
    ),
  },
  {
    title: "Exchanges & Final Sale",
    content: (
      <p>
        Exchanges depend on product availability and may require returning
        the original item before placing a new order. Items marked Final Sale
        are not eligible for return or exchange, except where required by law.
      </p>
    ),
  },
];

export default function ReturnsPage() {
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
            No hard feelings
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
            Returns
            <br />
            & Refunds.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 opacity-75 sm:text-lg">
            We want you to feel good about what you wear. If it’s not the
            right fit, here’s how to return an eligible purchase.
          </p>
        </div>
      </section>

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
          </aside>

          <div className="max-w-3xl">
            <div className="mb-8 border border-[#15140F]/15 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B3492F]">
                The return window
              </p>
              <p className="mt-3 text-4xl font-black uppercase tracking-tight">
                30 days.
              </p>
              <p className="mt-2 text-sm leading-7 opacity-75">
                From delivery, for eligible items that meet our return
                requirements.
              </p>
            </div>

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

            <div className="border-t border-[#15140F]/20 py-8">
              <h2 className="text-xl font-black uppercase">
                Need to start a return?
              </h2>
              <p className="mt-3 text-sm leading-7 opacity-75">
                Contact our team with your order number to get started.
              </p>
              <Link
                href="/faqs"
                className="mt-5 inline-flex bg-[#15140F] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#EDE8DC] transition-colors hover:bg-[#B3492F]"
              >
                Read FAQs
              </Link>
            </div>

            <p className="mt-6 text-xs leading-6 opacity-60">
              This policy does not limit any rights you may have under
              applicable consumer protection laws.
            </p>
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
            <Link href="/faqs">FAQs</Link>
            <Link href="/size-guide">Size Guide</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
