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
    <article className="flex h-full flex-col border border-line bg-white px-4 pb-5 pt-3 text-center">
      <Link href={`/produtos/${product.slug}`}>
        <ProductArt
          palette={product.palette}
          kicker={categoryName}
          image={product.image}
          alt={product.name}
        />
      </Link>
      <h3 className="mt-2 text-sm leading-5 text-clay">
        <Link href={`/produtos/${product.slug}`} className="hover:underline">
          <span aria-hidden="true">🎁 </span>
          {product.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-neutral-800">{priceLine(product)}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">{categoryName}</p>
      <div className="mt-auto">
        <QuoteButton name={product.name} />
      </div>
    </article>
  );
}
