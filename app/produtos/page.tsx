import { Suspense } from "react";
import { CatalogFallback, EmptyState, SourceNote } from "@/components/CatalogBits";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { categoryOf, companyOf, filterProducts, getCatalog } from "@/lib/catalog";
import { firstParam } from "@/lib/format";

export const metadata = { title: "Produtos" };

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ProductsContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = firstParam(params.q);
  const categoria = firstParam(params.categoria);
  const empresa = firstParam(params.empresa);
  const destaque = firstParam(params.destaque) === "1";
  const catalog = await getCatalog();
  const products = filterProducts(catalog, { q, categoria, empresa }).filter((product) =>
    destaque ? product.featured : true,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Produtos</h1>
      <p className="mt-3 max-w-xl text-ink/70">
        Catálogo do Ad Ateliê. Filtre por categoria ou pelo nome da peça.
      </p>
      <div className="mt-4">
        <SourceNote source={catalog.source} />
      </div>
      <div className="mt-6">
        <ProductFilters categories={catalog.categories} q={q} categoria={categoria} />
      </div>
      {products.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Nada com esse filtro"
            text="Troque a categoria ou limpe a busca para ver o catálogo inteiro."
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              companyName={companyOf(catalog, product.companySlug)?.name ?? ""}
              categoryName={categoryOf(catalog, product.categorySlug)?.name ?? ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}
