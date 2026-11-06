import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase";
import { whatsAppQuoteUrl } from "@/lib/whatsapp";

const columns = [
  {
    title: "Catálogo",
    links: [
      ["Produtos", "/produtos"],
      ["Categorias", "/categorias"],
      ["Mais procurados", "/produtos?destaque=1"],
      ["Por preço", "/preco"],
    ],
  },
  {
    title: "Ateliê",
    links: [
      ["Sobre o ateliê", "/empresas"],
      ["Anuncie seu produto", "/anuncie"],
      ["Pedir orçamento", "/orcamento"],
    ],
  },
];

export function SiteFooter() {
  const connected = isSupabaseConfigured();
  return (
    <footer className="mt-16 border-t border-line bg-portal text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-xl bg-white/95 p-2">
            <img src="/logo.jpg" alt="Ad Ateliê — ateliê do seu jeito" className="h-14 w-auto object-contain" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
            Presentes e personalizados feitos sob medida, com acabamento artesanal. Ateliê do seu jeito.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="font-display text-sm uppercase tracking-[0.14em] text-quote">{column.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {column.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.14em] text-quote">Fale com a gente</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li>
              <a href={whatsAppQuoteUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Orçamento pelo WhatsApp
              </a>
            </li>
            <li>
              <a href="https://wa.me/c/553173353097" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Catálogo no WhatsApp
              </a>
            </li>
            <li className="text-white/60">(31) 97335-3097</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/50">
          {connected
            ? "Catálogo ligado ao Supabase."
            : "Catálogo de demonstração neste projeto, até o Supabase ser conectado."}
        </div>
      </div>
    </footer>
  );
}
