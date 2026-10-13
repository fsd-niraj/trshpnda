"use client";

import Image from "next/image";
import { Anton } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Tag } from "lucide-react";
import { useState } from "react";
import { community, INK, navLinks, PAPER, Product, products, tickets, tilts, CREAM, GOLD, footerLinks } from "./data";
import Link from "next/link";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const DISPLAY = "font-[family-name:var(--font-anton)]";

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <main
      className={`${anton.variable} min-h-screen`}
      style={{ background: PAPER, color: INK }}
    >
      <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      <Hero />
      <Catalog />
      <BrandStatement />
      <Tickets />
      <Community />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* NAVBAR                                                                     */
/* -------------------------------------------------------------------------- */

function Navbar({
  mobileMenu,
  setMobileMenu,
}: {
  mobileMenu: boolean;
  setMobileMenu: (v: boolean) => void;
}) {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 border-b"
      style={{ background: PAPER, borderColor: "rgba(21,20,15,0.12)" }}
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-8">
        {/* TODO: placeholder href, point at the real homepage/logo destination */}
        <a href="#" className={`${DISPLAY} text-2xl tracking-tight`}>
          TRSHPNDA
        </a>

        <div className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-1 transition-colors hover:border-current"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t md:hidden"
            style={{ borderColor: "rgba(21,20,15,0.12)" }}
          >
            <div className="flex flex-col gap-5 px-5 py-6 text-lg">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#catalog"
                onClick={() => setMobileMenu(false)}
                className="mt-2 w-fit px-5 py-3 text-sm font-medium"
                style={{ background: INK, color: CREAM }}
              >
                Shop the drop
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-2 md:items-center md:gap-8"
      >
        <div>
          <h1
            className={`${DISPLAY} -rotate-1 text-[15vw] leading-[0.92] md:text-[5.2vw]`}
          >
            CAPS THAT GET BROKEN IN, NOT BROKEN DOWN
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed" style={{ color: "rgba(21,20,15,0.72)" }}>
            Heavyweight cotton, structured crowns, and stitching that holds
            after a hundred washes. Built for every day, not just launch day.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="#catalog"
              className="px-7 py-3.5 text-sm font-medium [clip-path:polygon(0_0,100%_0,100%_70%,95%_100%,0_100%)]"
              style={{ background: GOLD, color: INK }}
            >
              Shop the catalog
            </motion.a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-square overflow-hidden" style={{ background: "#dedbd3" }}>
            <Image
              src={products[0].image}
              alt={`TRSHPNDA ${products[0].name} cap`}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
              priority
            />
          </div>

          <div
            className="absolute -bottom-8 -left-8 w-52 -rotate-3 px-5 py-4 text-xs shadow-lg md:-left-12"
            style={{ background: INK, color: CREAM }}
          >
            <p className="flex items-center gap-1.5 text-[11px] tracking-tight" style={{ color: GOLD }}>
              <Tag size={12} /> Style {products[0].sku}
            </p>
            <p className="mt-2 leading-relaxed" style={{ color: "rgba(245,241,230,0.85)" }}>
              {products[0].name} · 12oz cotton twill · Adjustable strap
            </p>
            <p className="mt-2 text-sm">${products[0].price} CAD</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CATALOG                                                                    */
/* -------------------------------------------------------------------------- */

function Catalog() {
  return (
    <section id="catalog" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className={`${DISPLAY} text-4xl md:text-6xl`}>New in the shop</h2>
          {/* <a href="#" className="text-sm font-medium underline">
            View full catalog
          </a> */}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-5">
          {products.map((product) => (
            <ProductTicket key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductTicket({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden" style={{ background: "#e9e6df" }}>
        <Image
          src={product.image}
          alt={`TRSHPNDA ${product.name} cap`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div
        className="mt-3 flex items-center gap-1.5 px-2 py-1 text-[11px] transition-colors"
        style={{ background: hover ? GOLD : INK, color: hover ? INK : CREAM, width: "fit-content" }}
      >
        <Tag size={11} />
        {product.sku}
      </div>

      <div className="mt-2 flex justify-between gap-3 border-t border-dashed pt-2" style={{ borderColor: "rgba(21,20,15,0.25)" }}>
        <div>
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="mt-0.5 text-xs" style={{ color: "rgba(21,20,15,0.55)" }}>
            {product.description}
          </p>
        </div>
        <p className="whitespace-nowrap text-sm">${product.price} CAD</p>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* BRAND STATEMENT                                                            */
/* -------------------------------------------------------------------------- */

function BrandStatement() {
  return (
    <section id="about" className="px-5 py-28 md:px-8 md:py-40" style={{ background: INK, color: CREAM }}>
      <div className="mx-auto max-w-[1500px]">
        <div
          className="mb-10 flex h-20 w-20 items-center justify-center rounded-full border text-[10px] leading-tight"
          style={{ borderColor: GOLD, color: GOLD }}
        >
          <span className={`${DISPLAY} text-center`}>
            CUT<br />&amp; SEWN
          </span>
        </div>

        <h2 className={`${DISPLAY} max-w-5xl text-4xl leading-[1.05] md:text-7xl`}>
          This isn&apos;t a fashion accessory. It&apos;s the last thing you
          put on before you leave the house.
        </h2>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* TICKETS (TESTIMONIALS)                                                     */
/* -------------------------------------------------------------------------- */

function Tickets() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <h2 className={`${DISPLAY} mb-14 text-4xl md:text-6xl`}>Worn by you</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {tickets.map((t, i) => (
            <div
              key={t.name}
              className="border border-dashed p-6"
              style={{
                borderColor: "rgba(21,20,15,0.3)",
                transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
              }}
            >
              <p className="text-lg leading-snug">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-6 text-xs" style={{ color: "rgba(21,20,15,0.5)" }}>
                — {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* COMMUNITY                                                                  */
/* -------------------------------------------------------------------------- */

function Community() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32" style={{ background: "#E3DDCC" }}>
      <div className="mx-auto max-w-[1500px]">
        <h2 className={`${DISPLAY} mb-16 text-4xl md:text-6xl`}>TRSHPNDA in the wild</h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3">
          {community.map((image, i) => (
            <div key={image} style={{ transform: `rotate(${tilts[i]}deg)` }}>
              <div className="relative aspect-square bg-white p-2 shadow-md">
                <div className="relative aspect-square overflow-hidden" style={{ background: "#ddd9d0" }}>
                  <Image
                    src={image}
                    alt={`TRSHPNDA community ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <span
                  className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 -rotate-2"
                  style={{ background: "rgba(242,177,52,0.55)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FINAL CTA                                                                  */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative min-h-[60vh] overflow-hidden" style={{ background: INK }}>
      <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-[1500px] flex-col justify-center px-5 py-20 md:px-8">
        <h2 className={`${DISPLAY} max-w-3xl text-5xl leading-[1.02] md:text-8xl`} style={{ color: CREAM }}>
          Find the cap you&apos;ll wear on repeat
        </h2>

        <a
          href="#catalog"
          className="mt-10 w-fit px-7 py-4 text-sm font-medium [clip-path:polygon(0_0,100%_0,100%_70%,95%_100%,0_100%)]"
          style={{ background: GOLD, color: INK }}
        >
          Shop all caps
        </a>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="px-5 py-14 md:px-8 md:py-16" style={{ background: INK, color: CREAM }}>
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className={`${DISPLAY} text-3xl`}>TRSHPNDA</div>
            <p className="mt-4 max-w-xs text-sm leading-6" style={{ color: "rgba(245,241,230,0.5)" }}>
              Modern headwear, cut and sewn to order, made for everyday life.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium">Shop</p>
            <div className="flex flex-col gap-2.5 text-sm" style={{ color: "rgba(245,241,230,0.65)" }}>
              <Link href="/products" className="hover:text-white">Collections</Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium">Support</p>
            {/* TODO: placeholder hrefs, point each at its real support page */}
            <div className="flex flex-col gap-2.5 text-sm" style={{ color: "rgba(245,241,230,0.65)" }}>
              {footerLinks.map((l, i) =>
                <a href={l.href} className="hover:text-white" key={i}>{l.label}</a>
              )}
            </div>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col justify-between gap-4 border-t pt-6 text-xs md:flex-row"
          style={{ borderColor: "rgba(245,241,230,0.15)", color: "rgba(245,241,230,0.4)" }}
        >
          <p>© {new Date().getFullYear()} TRSHPNDA. All rights reserved.</p>
          {/* TODO: placeholder hrefs, point each at its real legal/social destination */}
          <div className="flex gap-5">
            <a href="https://www.instagram.com/trshpnda.streetwear" target="_blank" className="hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
