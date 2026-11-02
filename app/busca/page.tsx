import { Suspense } from "react";
import { CatalogFallback, EmptyState } from "@/components/CatalogBits";
import { ProductCard } from "@/components/ProductCard";
import { categoryOf, companyOf, getCatalog, searchCatalog } from "@/lib/catalog";
import { firstParam } from "@/lib/format";

export const metadata = { title: "Busca" };

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <SearchContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = firstParam(params.q).trim();
  const catalog = await getCatalog();
  const result = searchCatalog(catalog, q);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Busca</h1>
      <form action="/busca" className="mt-6 flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Ex.: caneca, botton, caderno"
          className="w-full rounded-full border border-line bg-cream px-4 py-3 outline-none focus:border-clay"
        />
        <button className="rounded-full bg-ink px-5 text-sm font-medium text-paper">Buscar</button>
      </form>
      {!q ? (
        <div className="mt-8">
          <EmptyState title="O que você procura?" text="Digite o nome de uma peça ou de um material." />
        </div>
      ) : (
        <>
          <h2 className="mt-10 text-xl font-semibold">
            Produtos {result.products.length ? `(${result.products.length})` : ""}
          </h2>
          {result.products.length === 0 ? (
            <p className="mt-3 text-sm text-ink/60">Nenhum produto para “{q}”.</p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {result.products.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  companyName={companyOf(catalog, product.companySlug)?.name ?? ""}
                  categoryName={categoryOf(catalog, product.categorySlug)?.name ?? ""}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
