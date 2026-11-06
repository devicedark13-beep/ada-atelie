export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function letterOf(name: string) {
  const base = fold(name).charAt(0).toUpperCase();
  return /[A-Z]/.test(base) ? base : "#";
}

/** Product `image` fields can hold a gallery as `url1|url2|url3`. */
export function parseImageList(value?: string) {
  if (!value) return [];
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}
