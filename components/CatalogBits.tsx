export function SourceNote({ source }: { source: "local" | "supabase" }) {
  return (
    <p className="text-sm text-ink/60">
      {source === "supabase"
        ? "Esta lista está vindo do Supabase."
        : "Esta lista é o catálogo de demonstração. Quando o Supabase tiver produtos, o site passa a ler o banco."}
    </p>
  );
}

export function CatalogFallback() {
  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-72 animate-pulse rounded-3xl bg-sand" />
      ))}
    </div>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-cream px-6 py-12 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/70">{text}</p>
    </div>
  );
}
