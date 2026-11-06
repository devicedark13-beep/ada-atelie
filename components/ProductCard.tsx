import Link from "next/link";
import { formatBRL } from "@/lib/format";
import type { Product } from "@/lib/types";
import { ProductArt } from "./ProductArt";
import { QuoteButton } from "./quote";

function priceLine(product: Product) {
  const value = formatBRL(product.priceFrom);
  if (product.priceHint === "A partir de") return `A partir de ${value}`;
  if (product.priceHint === "a unidade") return `${value} a unidade`;
  return value;
}

export function ProductCard({
  product,
  categoryName,
}: {
  product: Product;
  companyName?: string;
  categoryName: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-clay/10">
      <Link href={`/produtos/${product.slug}`} className="relative block overflow-hidden bg-sand/40">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-clay">
          {categoryName}
        </span>
        <div className="transition duration-300 group-hover:scale-105">
          <ProductArt
            palette={product.palette}
            kicker={categoryName}
            image={product.image}
            alt={product.name}
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <h3 className="text-sm font-medium leading-5 text-ink">
          <Link href={`/produtos/${product.slug}`} className="hover:text-clay">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm font-semibold text-clay">{priceLine(product)}</p>
        <div className="mt-auto">
          <QuoteButton name={product.name} />
        </div>
      </div>
    </article>
  );
}
