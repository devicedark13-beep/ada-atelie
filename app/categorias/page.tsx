import Link from "next/link";
import { Suspense } from "react";
import { CatalogFallback } from "@/components/CatalogBits";
import { getCatalog } from "@/lib/catalog";

export const metadata = { title: "Categorias" };

export default function CategoriesPage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <CategoriesContent />
    </Suspense>
  );
}

async function CategoriesContent() {
  const catalog = await getCatalog();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs uppercase tracking-[0.18em] text-clay">Navegue por tipo</p>
      <h1 className="mt-2 text-2xl font-semibold">Categorias</h1>
      <p className="mt-3 max-w-xl text-ink/70">
        O mesmo caminho do portal de referência: escolher um grupo e ver os produtos daquele grupo.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {catalog.categories.map((category) => {
          const count = catalog.products.filter((product) => product.categorySlug === category.slug).length;
          return (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className="rounded-3xl border border-line bg-cream p-6 hover:border-clay"
            >
              <span className="block h-2 w-12 rounded-full" style={{ backgroundColor: category.tone }} />
              <h2 className="mt-4 text-xl font-semibold">{category.name}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/70">{category.description}</p>
              <p className="mt-4 text-sm">{count} produtos</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
