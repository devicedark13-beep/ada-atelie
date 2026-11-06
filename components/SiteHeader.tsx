import Link from "next/link";
import { categories } from "@/lib/data";
import { whatsAppQuoteUrl } from "@/lib/whatsapp";
import { CartIcon } from "./quote";

const links = [
  ["Produtos", "/produtos"],
  ["Categorias", "/categorias"],
  ["Mais procurados", "/produtos?destaque=1"],
  ["Por preço", "/preco"],
  ["O ateliê", "/empresas"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/logo-mark.jpg"
            alt="Ad Ateliê — ateliê do seu jeito"
            className="h-16 w-auto object-contain sm:h-20"
          />
        </Link>

        <form
          action="/busca"
          className="hidden min-w-0 flex-1 items-center overflow-hidden rounded-full border border-line bg-white md:flex"
        >
          <label className="sr-only" htmlFor="busca-geral">
            Buscar produtos
          </label>
          <input
            id="busca-geral"
            name="q"
            placeholder="Buscar um produto personalizado…"
            className="w-full px-4 py-2 text-sm text-ink outline-none placeholder:text-ink/40"
          />
          <button className="px-4 text-clay" aria-label="Buscar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <a
            href={whatsAppQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-portal px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 sm:inline-flex"
          >
            Orçamento
            <CartIcon />
          </a>
          <a
            href={whatsAppQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Orçamento no WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-full bg-portal text-white sm:hidden"
          >
            <CartIcon />
          </a>
        </div>
      </div>

      <nav className="border-t border-line/70 bg-white/60 text-sm text-ink/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2.5">
          <details className="relative">
            <summary className="cursor-pointer font-medium text-ink hover:text-clay">Categorias</summary>
            <div className="absolute left-0 z-30 mt-2 w-64 rounded-xl border border-line bg-white py-1 shadow-lg">
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
