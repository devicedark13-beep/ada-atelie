import { Suspense } from "react";
import { CatalogFallback } from "@/components/CatalogBits";
import { ProductCard } from "@/components/ProductCard";
import { categoryOf, companyOf, getCatalog } from "@/lib/catalog";

export const metadata = { title: "Personalizados por público" };

const publics = [
  { title: "Kits e presentes", categories: ["kits", "festas"] },
  { title: "Papelaria", categories: ["papelaria"] },
  { title: "Lembranças", categories: ["chaveiros", "canecas", "casa"] },
];

export default function AudiencePage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <AudienceContent />
    </Suspense>
  );
}

async function AudienceContent() {
  const catalog = await getCatalog();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Personalizados por público</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Kits, papelaria e lembranças do ateliê.
      </p>
      {publics.map((group) => {
        const products = catalog.products.filter((product) => group.categories.includes(product.categorySlug));
        return (
          <section key={group.title} className="mt-8">
            <h2 className="text-lg font-semibold text-clay">{group.title}</h2>
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
