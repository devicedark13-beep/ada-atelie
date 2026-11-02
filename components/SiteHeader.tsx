import Link from "next/link";
import { categories } from "@/lib/data";
import { HeaderCart } from "./quote";

const links = [
  ["Personalizados de A-Z", "/a-z"],
  ["Personalizados por Preço", "/preco"],
  ["Personalizados por Público", "/publico"],
  ["Personalizados mais Procurados", "/produtos?destaque=1"],
  ["O ateliê", "/empresas"],
];

export function SiteHeader() {
  return (
    <header>
      <div className="bg-portal text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/" className="shrink-0">
            <img
              src="/logo.jpg"
              alt="Ad Ateliê do seu jeito"
              className="h-14 w-14 rounded-full bg-white object-cover"
            />
          </Link>
          <form action="/busca" className="flex min-w-0 flex-1 overflow-hidden rounded-sm bg-white">
            <label className="sr-only" htmlFor="busca-geral">
              Buscar produtos
            </label>
            <input
              id="busca-geral"
              name="q"
              placeholder="Digite o produto personalizado para procurarmos entre nossos anúncios"
              className="w-full px-3 py-2 text-sm text-ink outline-none"
            />
            <button className="px-3 text-portal" aria-label="Buscar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </form>
          <HeaderCart />
        </div>
      </div>
      <nav className="border-b border-[#d5dee6] bg-sand text-sm text-neutral-700">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <details className="relative">
            <summary className="cursor-pointer">Categorias</summary>
            <div className="absolute left-0 z-30 mt-2 w-64 border border-line bg-white py-1 shadow-md">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categorias/${category.slug}`}
                  className="block px-3 py-1.5 hover:bg-sand hover:text-clay"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </details>
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-clay">
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
