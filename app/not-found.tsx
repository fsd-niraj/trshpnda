import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-[1600px] place-items-center bg-paper px-4 text-center sm:px-6 lg:px-16">
      <div className="max-w-2xl py-16">
        <p className="text-[10px] font-bold uppercase tracking-[.16em]">
          TRSHPNDA / 404
        </p>
        <h1 className="mt-5 font-display text-[clamp(100px,24vw,260px)] leading-none tracking-[-.09em]">
          404
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted">
          This page doesn’t exist. It might have moved, been removed, or the
          link may be incorrect.
        </p>
        <Link
          className="mt-7 inline-flex items-center gap-5 rounded-full bg-ink px-5 py-3 text-[10px] font-bold uppercase text-surface transition hover:bg-brand-green hover:text-ink"
          href="/"
        >
          Back to home ↗
        </Link>
      </div>
    </main>
  );
}
