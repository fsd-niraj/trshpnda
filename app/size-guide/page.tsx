import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "Learn how to measure your head and find the right fit for TRSHPNDA headwear.",
};

const sizes = [
  { cm: "54–56 cm", inches: "21.3–22.0 in", fit: "Smaller fit" },
  { cm: "57–59 cm", inches: "22.4–23.2 in", fit: "Medium fit" },
  { cm: "60–62 cm", inches: "23.6–24.4 in", fit: "Larger fit" },
  { cm: "63–65 cm", inches: "24.8–25.6 in", fit: "Extra-large reference" },
];
const steps = [
  "Use a flexible measuring tape.",
  "Wrap it around your head, just above your eyebrows and ears.",
  "Keep the tape level, where your cap would naturally sit.",
  "Keep it comfortably snug without pulling tight.",
  "Record your measurement in centimetres or inches.",
];

export default function SizeGuidePage() {
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
            Find your fit
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[.98] tracking-[-.07em] sm:text-8xl">
            The right fit
            <br />
            changes everything.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-base">
            A good cap should feel natural from the first wear. Here’s how to
            measure your head and choose a comfortable fit.
          </p>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-10 sm:py-16 lg:grid-cols-[220px_minmax(0,760px)] lg:gap-24">
        <aside className="self-start lg:sticky lg:top-6">
          <p className="text-[10px] font-bold uppercase tracking-[.16em]">
            On this page
          </p>
          <nav className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-4">
            {[
              ["measure", "How to measure"],
              ["reference", "Size reference"],
              ["construction", "Cap construction"],
              ["between", "Between sizes"],
            ].map(([id, label]) => (
              <a
                key={id}
                className="rounded-full bg-surface px-3 py-2 text-xs text-muted hover:text-ink lg:bg-transparent lg:px-0"
                href={`#${id}`}
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>
        <div>
          <article
            id="measure"
            className="scroll-mt-6 border-t border-line py-7"
          >
            <div className="grid grid-cols-[36px_1fr] gap-4">
              <span className="pt-1.5 text-[10px] font-bold tracking-[.12em] text-[#9a3d75]">
                01
              </span>
              <h2 className="text-xl font-semibold sm:text-2xl">
                How to measure
              </h2>
            </div>
            <ol className="ml-0 mt-4 list-decimal space-y-2 pl-6 text-[13px] leading-7 text-muted sm:ml-[52px]">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
          <article
            id="reference"
            className="scroll-mt-6 border-t border-line py-7"
          >
            <div className="grid grid-cols-[36px_1fr] gap-4">
              <span className="pt-1.5 text-[10px] font-bold tracking-[.12em] text-[#9a3d75]">
                02
              </span>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Size reference
              </h2>
            </div>
            <div className="ml-0 mt-4 sm:ml-[52px]">
              <p className="text-[13px] leading-7 text-muted">
                Use this as a general reference only. Product construction and
                adjustment range can affect fit; check the specific product
                description where available.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-y border-line text-[9px] uppercase tracking-[.1em]">
                      <th className="px-2 py-4">Head circumference</th>
                      <th className="px-2 py-4">Inches</th>
                      <th className="px-2 py-4">Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size) => (
                      <tr key={size.cm} className="border-b border-line">
                        <td className="px-2 py-4">{size.cm}</td>
                        <td className="px-2 py-4">{size.inches}</td>
                        <td className="px-2 py-4">{size.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 rounded-xl bg-brand-blue p-4 text-xs leading-6">
                Measurements are general fit guidance, not a guarantee of fit
                for every cap style.
              </p>
            </div>
          </article>
          <article
            id="construction"
            className="scroll-mt-6 border-t border-line py-7"
          >
            <div className="grid grid-cols-[36px_1fr] gap-4">
              <span className="pt-1.5 text-[10px] font-bold tracking-[.12em] text-[#9a3d75]">
                03
              </span>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Cap construction
              </h2>
            </div>
            <p className="ml-0 mt-4 text-[13px] leading-7 text-muted sm:ml-[52px]">
              Adjustable closures allow some flexibility, while fitted or
              structured styles may have a more specific fit. Review each
              product page for construction and adjustment details.
            </p>
          </article>
          <article
            id="between"
            className="scroll-mt-6 border-t border-line py-7"
          >
            <div className="grid grid-cols-[36px_1fr] gap-4">
              <span className="pt-1.5 text-[10px] font-bold tracking-[.12em] text-[#9a3d75]">
                04
              </span>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Between sizes?
              </h2>
            </div>
            <div className="ml-0 mt-4 space-y-3 text-[13px] leading-7 text-muted sm:ml-[52px]">
              <p>
                If your measurement falls between references, consider the
                closure and fit notes on the product page. If you prefer a
                looser fit, avoid sizing down without checking the style’s
                available adjustment range.
              </p>
              <p>
                <Link className="underline" href="/faqs">
                  Still unsure? Visit FAQs.
                </Link>
              </p>
            </div>
          </article>
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
          <Link href="/products">Shop caps</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/returns">Returns</Link>
        </div>
      </footer>
    </main>
  );
}
