import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogFallback } from "@/components/CatalogBits";
import { ProductCard } from "@/components/ProductCard";
import { categoryOf, companyOf, getCatalog } from "@/lib/catalog";

export default function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <CompanyContent params={params} />
    </Suspense>
  );
}

async function CompanyContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const company = companyOf(catalog, slug);
  if (!company) notFound();
  const products = catalog.products.filter((product) => product.companySlug === company.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/empresas" className="text-sm text-clay">
        O ateliê
      </Link>
      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-ink/55">
        {company.city} · {company.state}
        {company.since ? ` · desde ${company.since}` : ""}
      </p>
      <h1 className="mt-2 text-2xl font-semibold">{company.name}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/75">{company.about}</p>
      <div className="mt-6 grid gap-3 rounded-3xl border border-line bg-cream p-5 text-sm sm:grid-cols-3">
        <p>
          <span className="block text-ink/50">Especialidade</span>
          {company.specialty}
        </p>
        {company.email ? (
          <p>
            <span className="block text-ink/50">E-mail</span>
            <a className="text-clay" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </p>
        ) : null}
        <p>
          <span className="block text-ink/50">WhatsApp</span>
          <a className="text-clay" href="https://wa.me/c/553173353097">
            {company.phone}
          </a>
        </p>
      </div>
      <h2 className="mt-10 text-xl font-semibold">Produtos deste ateliê</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            companyName={company.name}
            categoryName={categoryOf(catalog, product.categorySlug)?.name ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
