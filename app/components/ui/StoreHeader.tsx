import Image from "next/image";
import Link from "next/link";

export default function StoreHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-5 sm:px-8 lg:px-12">
      <Link
        href="/"
        aria-label="TRSHPNDA home"
        className="text-lg font-black tracking-[-0.08em] sm:text-xl"
      >
        <Image
          src="webicon_mascot.svg"
          width={75}
          height={75}
          alt="TRSHPNDA_LOGO"
        />
      </Link>
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-4 text-xs sm:gap-8 sm:text-sm"
      >
        <Link href="/products">Shop caps</Link>
        <Link className="hidden sm:inline" href="/faqs">
          FAQs
        </Link>
      </nav>
    </header>
  );
}
