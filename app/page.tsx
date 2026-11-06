import Link from "next/link";
import { Suspense } from "react";
import { CatalogFallback } from "@/components/CatalogBits";
import { ProductCard } from "@/components/ProductCard";
import { categoryOf, companyOf, getCatalog } from "@/lib/catalog";
import { whatsAppQuoteUrl } from "@/lib/whatsapp";

const features = [
  {
    title: "Feito à mão",
    text: "Cada peça é produzida sob encomenda, com acabamento artesanal.",
  },
  {
    title: "Do seu jeito",
    text: "Cor, texto, foto ou logo — a personalização é sua escolha.",
  },
  {
    title: "Direto no WhatsApp",
    text: "Monte o pedido e feche o orçamento em uma conversa só.",
  },
];

export default function HomePage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const catalog = await getCatalog();
  const featured = catalog.products.filter((product) => product.featured).slice(0, 6);
  const collage = featured.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-portal text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-quote/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-clay/30 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-quote">
              Ateliê do seu jeito
            </p>
            <h1 className="font-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Presentes e personalizados com a sua cara
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/75">
              Kits, canecas, chaveiros, papelaria e muito mais — feitos sob medida, peça a peça,
              para quem gosta de presentear com carinho.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsAppQuoteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-quote px-6 py-3 text-sm font-semibold text-clay-dark transition hover:brightness-95"
              >
                Pedir orçamento no WhatsApp
              </a>
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver catálogo
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden h-80 w-full max-w-md sm:block">
            {collage.map((product, index) => (
              <img
                key={product.slug}
                src={product.image}
                alt={product.name}
                className="absolute h-56 w-44 rounded-2xl border-4 border-white/90 object-cover shadow-2xl"
                style={{
                  left: `${index * 28}%`,
                  top: index === 1 ? "0" : "2rem",
                  transform: `rotate(${(index - 1) * 7}deg)`,
                  zIndex: index === 1 ? 2 : 1,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-quote" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-ink">{feature.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink/60">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clay">Explore</p>
            <h2 className="font-display mt-2 text-2xl font-semibold text-ink sm:text-3xl">
              Categorias
            </h2>
          </div>
          <Link href="/categorias" className="hidden text-sm font-medium text-clay hover:underline sm:block">
            Ver todas →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.categories.map((category) => {
            const count = catalog.products.filter((product) => product.categorySlug === category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/categorias/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-line p-6 text-white transition hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: category.tone }}
              >
                <h3 className="font-display text-xl font-semibold">{category.name}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-white/75">{category.description}</p>
                <p className="mt-5 text-sm font-medium text-quote">
                  {count} {count === 1 ? "produto" : "produtos"} →
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-line bg-sand/50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clay">Seleção</p>
              <h2 className="font-display mt-2 text-2xl font-semibold text-ink sm:text-3xl">
                Mais procurados
              </h2>
            </div>
            <Link href="/produtos" className="hidden text-sm font-medium text-clay hover:underline sm:block">
              Ver catálogo completo →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                companyName={companyOf(catalog, product.companySlug)?.name ?? ""}
                categoryName={categoryOf(catalog, product.categorySlug)?.name ?? ""}
              />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/produtos" className="text-sm font-medium text-clay hover:underline">
              Ver catálogo completo →
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-cream p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clay">O ateliê</p>
            <h2 className="font-display mt-2 text-2xl font-semibold text-ink sm:text-3xl">
              Transformo suas ideias em presentes únicos
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-ink/70">
              Feito sob medida, com acabamento artesanal. Conheça o ateliê ou fale direto pelo
              WhatsApp para montar o seu pedido.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/empresas"
              className="inline-flex items-center justify-center rounded-full bg-portal px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Conheça o ateliê
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
