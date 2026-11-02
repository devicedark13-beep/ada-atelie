import Link from "next/link";
import type { Company } from "@/lib/types";

export function CompanyCard({ company, productCount }: { company: Company; productCount: number }) {
  return (
    <article className="border border-line bg-white p-4">
      <p className="text-xs uppercase text-neutral-500">
        {company.city} · {company.state}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-clay">
        <Link href={`/empresas/${company.slug}`} className="hover:underline">
          {company.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-neutral-600">{company.specialty}</p>
      <p className="mt-3 text-sm text-neutral-500">
        {company.since ? `Desde ${company.since} · ` : ""}
        {productCount} {productCount === 1 ? "produto" : "produtos"}
      </p>
    </article>
  );
}
