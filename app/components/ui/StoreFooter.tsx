import Link from "next/link";
export default function StoreFooter() {
  return (
    <footer className="mx-auto mt-16 flex w-full max-w-[1440px] flex-col gap-5 border-t border-line px-4 py-7 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
      <Link href="/" className="font-bold tracking-[-0.05em]">
        TRSHPNDA®
      </Link>
      <nav
        aria-label="Support links"
        className="flex flex-wrap gap-5 text-muted"
      >
        <Link
          href="https://www.instagram.com/trshpnda.streetwear"
          target="_blank"
        >
          Instagram
        </Link>{" "}
        |<Link href="/shipping">Shipping</Link>
        <Link href="/returns">Returns</Link>
        <Link href="/size-guide">Size guide</Link>
        <Link href="/size-guide">Size guide</Link>
      </nav>
    </footer>
  );
}
