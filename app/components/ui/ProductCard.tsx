import Image from "next/image";
import Link from "next/link";
type Props = {
  handle: string;
  name: string;
  price: string;
  currencyCode: string;
  imgUrl?: string | null;
  imgAlt?: string | null;
  isAvailable?: boolean;
};
export default function ProductCard({
  handle,
  name,
  price,
  currencyCode,
  imgUrl,
  imgAlt,
  isAvailable = true,
}: Props) {
  const formattedPrice = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(price));
  return (
    <Link href={`/products/${handle}`} className="group block min-w-0">
      <div className="relative aspect-[4/4.7] overflow-hidden bg-panel">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={imgAlt || name}
            fill
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
            className="object-contain mix-blend-multiply transition-transform duration-300"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted">
            Image coming soon
          </div>
        )}
      </div>
      <div className="pt-3">
        <h2 className="text-base font-bold uppercase leading-tight tracking-[-0.025em] sm:text-lg">
          {name}
        </h2>
        <p className="mt-1.5 text-sm text-ink">{formattedPrice}</p>
        {!isAvailable && <p className="mt-1 text-xs text-muted">Sold out</p>}
      </div>
    </Link>
  );
}
