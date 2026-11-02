import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Página não encontrada</h1>
      <p className="mt-3 text-ink/70">Esse produto ou ateliê não está no catálogo.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-ink px-5 py-3 text-sm text-paper">
        Voltar ao início
      </Link>
    </div>
  );
}
