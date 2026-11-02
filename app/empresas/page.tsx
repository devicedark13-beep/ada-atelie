import { Suspense } from "react";
import { CatalogFallback, SourceNote } from "@/components/CatalogBits";
import { CompanyCard } from "@/components/CompanyCard";
import { getCatalog } from "@/lib/catalog";

export const metadata = { title: "O ateliê" };

export default function CompaniesPage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <CompaniesContent />
    </Suspense>
  );
}

async function CompaniesContent() {
  const catalog = await getCatalog();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">O ateliê</h1>
      <p className="mt-3 max-w-xl text-ink/70">
        Esta loja é só do Ad Ateliê. Os personalizados saem daqui, sob medida.
      </p>
      <div className="mt-4">
        <SourceNote source={catalog.source} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {catalog.companies.map((company) => (
          <CompanyCard
            key={company.slug}
            company={company}
            productCount={catalog.products.filter((product) => product.companySlug === company.slug).length}
          />
        ))}
      </div>
    </div>
  );
}
