import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogFallback } from "@/components/CatalogBits";
import { ProductCard } from "@/components/ProductCard";
import { categoryOf, companyOf, getCatalog } from "@/lib/catalog";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const category = categoryOf(catalog, slug);
  if (!category) notFound();
  const products = catalog.products.filter((product) => product.categorySlug === category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/categorias" className="text-sm text-clay">
        Categorias
      </Link>
      <h1 className="mt-3 text-2xl font-semibold">{category.name}</h1>
      <p className="mt-3 max-w-xl text-ink/70">{category.description}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            companyName={companyOf(catalog, product.companySlug)?.name ?? ""}
            categoryName={category.name}
          />
        ))}
      </div>
    </div>
  );
}
