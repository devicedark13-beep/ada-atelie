import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase";

export function SiteFooter() {
  const connected = isSupabaseConfigured();
  return (
    <footer className="mt-10 border-t border-line bg-white text-sm text-neutral-600">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-6">
        <img src="/logo.jpg" alt="" className="h-10 w-10 rounded-full object-cover" />
        <Link href="/categorias" className="hover:text-clay">
          Categorias
        </Link>
        <Link href="/produtos" className="hover:text-clay">
          Produtos
        </Link>
        <Link href="/empresas" className="hover:text-clay">
          O ateliê
        </Link>
        <Link href="/orcamento" className="hover:text-clay">
          Orçamento
        </Link>
        <a href="https://wa.me/c/553173353097" className="hover:text-clay">
          Catálogo no WhatsApp
        </a>
        <p className="w-full text-xs text-neutral-500">
          {connected
            ? "Catálogo ligado ao Supabase."
            : "Catálogo de demonstração neste projeto, até o Supabase ser conectado. A logo é a foto de perfil do ateliê."}
        </p>
      </div>
    </footer>
  );
}
