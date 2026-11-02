import type { Category } from "@/lib/types";

const field =
  "mt-1 w-full rounded border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-clay";

export function ProductFilters({
  categories,
  q,
  categoria,
}: {
  categories: Category[];
  q: string;
  categoria: string;
}) {
  return (
    <form action="/produtos" className="grid gap-3 border border-line bg-white p-4 md:grid-cols-[1.4fr_1fr_auto]">
      <label className="text-sm">
        Busca
        <input name="q" defaultValue={q} placeholder="Nome ou material" className={field} />
      </label>
      <label className="text-sm">
        Categoria
        <select name="categoria" defaultValue={categoria} className={field}>
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <button className="self-end rounded bg-portal px-4 py-2.5 text-sm font-semibold text-white">
        Filtrar
      </button>
    </form>
  );
}
