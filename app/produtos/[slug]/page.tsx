import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogFallback } from "@/components/CatalogBits";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { QuoteButton } from "@/components/quote";
import { categoryOf, companyOf, getCatalog, productOf } from "@/lib/catalog";
import { formatBRL } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getCatalog();
  const product = productOf(catalog, slug);
  return { title: product?.name ?? "Produto" };
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const product = productOf(catalog, slug);
  if (!product) notFound();
  const company = companyOf(catalog, product.companySlug);
  const category = categoryOf(catalog, product.categorySlug);
  const related = catalog.products
    .filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug)
    .slice(0, 3);

  const specs = [
    ["Material", product.material],
    ["Cores", product.colors],
    ["Medida ou capacidade", product.capacity],
    ["Personalização", product.customization],
    ["Quantidade mínima", product.minQuantity > 1 ? String(product.minQuantity) : ""],
    ["Preço de partida", formatBRL(product.priceFrom)],
  ].filter(([, value]) => value);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-sm text-ink/60">
        <Link href="/produtos" className="text-clay">
          Produtos
        </Link>
        {category ? (
          <>
            {" / "}
            <Link href={`/categorias/${category.slug}`} className="text-clay">
              {category.name}
            </Link>
          </>
        ) : null}
      </p>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <ProductArt
          palette={product.palette}
          kicker={category?.name ?? "Produto"}
          image={product.image}
          alt={product.name}
          large
        />
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-ink/55">
            {company ? (
              <Link href={`/empresas/${company.slug}`} className="hover:text-clay">
                {company.name} · {company.city}/{company.state}
              </Link>
            ) : (
              "Ateliê"
            )}
          </p>
          <h1 className="mt-2 text-2xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-xl text-ink">
            {product.priceHint === "A partir de"
              ? `A partir de ${formatBRL(product.priceFrom)}`
              : product.priceHint === "a unidade"
                ? `${formatBRL(product.priceFrom)} a unidade`
                : formatBRL(product.priceFrom)}
          </p>
          <p className="mt-4 text-lg leading-8 text-ink/75">{product.description}</p>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {specs.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[9rem_1fr] gap-3 py-3 text-sm">
                <dt className="text-ink/55">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <QuoteButton slug={product.slug} />
          <Link href="/orcamento" className="ml-4 text-sm text-clay hover:underline">
            Ver orçamento
          </Link>
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-xl font-semibold">Na mesma categoria</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <ProductCard
                key={item.slug}
                product={item}
                companyName={companyOf(catalog, item.companySlug)?.name ?? ""}
                categoryName={category?.name ?? ""}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
