import { Suspense } from "react";
import { CatalogFallback } from "@/components/CatalogBits";
import { ProductCard } from "@/components/ProductCard";
import { categoryOf, companyOf, getCatalog } from "@/lib/catalog";
import { formatBRL } from "@/lib/format";

export const metadata = { title: "Personalizados por preço" };

const bands = [
  { label: "Até R$ 20", min: 0, max: 20 },
  { label: "De R$ 20 a R$ 50", min: 20, max: 50 },
  { label: "De R$ 50 a R$ 100", min: 50, max: 100 },
  { label: "Acima de R$ 100", min: 100, max: Infinity },
];

export default function PricePage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <PriceContent />
    </Suspense>
  );
}

async function PriceContent() {
  const catalog = await getCatalog();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Personalizados por preço</h1>
      <p className="mt-2 text-sm text-neutral-600">Preço de partida de cada peça, do menor para o maior.</p>
      {bands.map((band) => {
        const products = catalog.products
          .filter((product) => product.priceFrom >= band.min && product.priceFrom < band.max)
          .sort((a, b) => a.priceFrom - b.priceFrom);
        if (products.length === 0) return null;
        return (
          <section key={band.label} className="mt-8">
            <h2 className="text-lg font-semibold text-clay">
              {band.label}
              <span className="ml-2 text-sm font-normal text-neutral-500">
                a partir de {formatBRL(products[0].priceFrom)}
              </span>
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  companyName={companyOf(catalog, product.companySlug)?.name ?? ""}
                  categoryName={categoryOf(catalog, product.categorySlug)?.name ?? ""}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
