import Link from "next/link";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const DISPLAY = "font-[family-name:var(--font-anton)]";

const INK = "#15140F";
const PAPER = "#EDE8DC";
const GOLD = "#F2B134";

export default function NotFound() {
  return (
    <main
      className={`${anton.variable} flex min-h-screen flex-col items-center justify-center px-5 text-center`}
      style={{ background: PAPER, color: INK }}
    >
      <h1 className={`${DISPLAY} -rotate-1 text-[28vw] leading-none md:text-[14rem]`}>
        404
      </h1>

      <p className="mt-4 max-w-md text-lg" style={{ color: "rgba(21,20,15,0.65)" }}>
        This page doesn&apos;t exist. It might have moved, been removed, or
        the link&apos;s just wrong.
      </p>

      <Link
        href="/"
        className="mt-9 px-7 py-3.5 text-sm font-medium [clip-path:polygon(0_0,100%_0,100%_70%,95%_100%,0_100%)]"
        style={{ background: GOLD, color: INK }}
      >
        Back to home
      </Link>
    </main>
  );
}
