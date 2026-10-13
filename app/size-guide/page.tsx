
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Size Guide | TRSHPNDA",
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
            Find your fit
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
            The right
            <br />
            fit changes everything.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 opacity-75 sm:text-lg">
            A good cap should feel natural from the first wear. Here’s
            how to measure your head and choose a comfortable fit.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[220px_1fr] md:gap-20">
          <aside className="h-fit md:sticky md:top-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              On this page
            </p>
            <nav className="mt-5 flex flex-wrap gap-4 md:flex-col">
              <a href="#measure" className="text-sm opacity-65 hover:opacity-100">
                How to measure
              </a>
              <a href="#reference" className="text-sm opacity-65 hover:opacity-100">
                Size reference
              </a>
              <a href="#construction" className="text-sm opacity-65 hover:opacity-100">
                Cap construction
              </a>
              <a href="#between" className="text-sm opacity-65 hover:opacity-100">
                Between sizes
              </a>
            </nav>
          </aside>

          <div className="max-w-3xl">
            <article id="measure" className="scroll-mt-8 border-t border-[#15140F]/20 py-8 sm:py-10">
              <p className="text-xs font-bold tracking-widest text-[#B3492F]">01</p>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-tight">
                How to measure
              </h2>
              <p className="mt-4 text-sm leading-7 opacity-75">
                Measure around the part of your head where the cap will sit.
                Keep the tape level and comfortably snug.
              </p>

              <ol className="mt-6 space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-sm leading-6">
                    <span className="font-bold text-[#B3492F]">
                      0{index + 1}
                    </span>
                    <span className="opacity-80">{step}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article id="reference" className="scroll-mt-8 border-t border-[#15140F]/20 py-8 sm:py-10">
              <p className="text-xs font-bold tracking-widest text-[#B3492F]">02</p>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-tight">
                Head size reference
              </h2>
              <p className="mt-4 text-sm leading-7 opacity-75">
                Use this chart as a general reference, not a guarantee of
                the fit of an individual cap.
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-y border-[#15140F]/20 text-xs uppercase tracking-wider">
                      <th className="py-4 pr-4">Circumference</th>
                      <th className="py-4 pr-4">Inches</th>
                      <th className="py-4">Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((size) => (
                      <tr key={size.cm} className="border-b border-[#15140F]/15">
                        <td className="py-4 pr-4 font-bold">{size.cm}</td>
                        <td className="py-4 pr-4 opacity-75">{size.inches}</td>
                        <td className="py-4 opacity-75">{size.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article id="construction" className="scroll-mt-8 border-t border-[#15140F]/20 py-8 sm:py-10">
              <p className="text-xs font-bold tracking-widest text-[#B3492F]">03</p>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-tight">
                Cap construction
              </h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="border border-[#15140F]/15 p-5">
                  <h3 className="font-black uppercase">Structured</h3>
                  <p className="mt-3 text-sm leading-7 opacity-75">
                    A more defined front panel helps the crown maintain
                    its shape.
                  </p>
                </div>
                <div className="border border-[#15140F]/15 p-5">
                  <h3 className="font-black uppercase">Unstructured</h3>
                  <p className="mt-3 text-sm leading-7 opacity-75">
                    A softer construction follows the natural shape of
                    your head more closely.
                  </p>
                </div>
              </div>
            </article>

            <article id="between" className="scroll-mt-8 border-t border-[#15140F]/20 py-8 sm:py-10">
              <p className="text-xs font-bold tracking-widest text-[#B3492F]">04</p>
              <h2 className="mt-3 text-2xl font-black uppercase tracking-tight">
                Between sizes?
              </h2>
              <p className="mt-4 text-sm leading-7 opacity-75">
                Check the product’s stated fit range and closure type.
                Adjustable styles offer flexibility within their intended
                range, but not every cap fits every head size.
              </p>
            </article>

            <div className="border-t border-[#15140F]/20 py-8">
              <h2 className="text-xl font-black uppercase">Still unsure?</h2>
              <p className="mt-3 text-sm leading-7 opacity-75">
                Check the product details or visit our FAQs for more
                information.
              </p>
              <Link
                href="/faqs"
                className="mt-5 inline-flex bg-[#15140F] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#EDE8DC] transition-colors hover:bg-[#B3492F]"
              >
                View FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#15140F]/15 px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link href="/" className="text-sm font-black uppercase tracking-[0.2em]">
            TRSHPNDA
          </Link>
          <div className="flex flex-wrap gap-5 text-xs opacity-70">
            <Link href="/shipping">Shipping</Link>
            <Link href="/returns">Returns</Link>
            <Link href="/faqs">FAQs</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
