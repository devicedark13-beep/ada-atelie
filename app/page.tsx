import { Suspense } from "react";
import { CatalogFallback, SourceNote } from "@/components/CatalogBits";
import { ProductCard } from "@/components/ProductCard";
import { categoryOf, companyOf, getCatalog } from "@/lib/catalog";

export default function HomePage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const catalog = await getCatalog();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-center text-lg text-neutral-700">
        Ad Ateliê — presentes e personalizados do seu jeito
      </h1>
      <div className="mt-2 text-center">
        <SourceNote source={catalog.source} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {catalog.products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            companyName={companyOf(catalog, product.companySlug)?.name ?? ""}
            categoryName={categoryOf(catalog, product.categorySlug)?.name ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
