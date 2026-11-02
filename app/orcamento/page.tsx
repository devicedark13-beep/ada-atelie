import { Suspense } from "react";
import { CatalogFallback } from "@/components/CatalogBits";
import { QuoteForm } from "@/components/QuoteForm";
import { BasketList } from "@/components/quote";
import { companyOf, getCatalog, productOf } from "@/lib/catalog";
import { firstParam } from "@/lib/format";

export const metadata = { title: "Orçamento" };

export default function QuotePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <QuoteContent searchParams={searchParams} />
    </Suspense>
  );
}

async function QuoteContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const slug = firstParam(params.produto);
  const catalog = await getCatalog();
  const selected = productOf(catalog, slug);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <h1 className="text-2xl font-semibold">Pedir orçamento</h1>
        <p className="mt-4 text-ink/75 leading-7">
          Sem cadastro. O pedido guarda seu contato, a quantidade e a personalização. Quem produz
          responde direto.
        </p>
        {selected ? (
          <p className="mt-4 bg-sand px-4 py-3 text-sm">
            Peça selecionada: <strong>{selected.name}</strong> ·{" "}
            {companyOf(catalog, selected.companySlug)?.name}
          </p>
        ) : null}
        <BasketList
          products={catalog.products.map((product) => ({
            slug: product.slug,
            name: product.name,
            companyName: companyOf(catalog, product.companySlug)?.name ?? "",
          }))}
        />
      </div>
      <QuoteForm
        initialSlug={selected?.slug}
        products={catalog.products.map((product) => ({
          slug: product.slug,
          name: product.name,
          companyName: companyOf(catalog, product.companySlug)?.name ?? "",
        }))}
      />
    </div>
  );
}
