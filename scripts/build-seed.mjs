import { readFileSync, writeFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync(new URL("../lib/catalog.json", import.meta.url), "utf8"));

function sql(value) {
  if (typeof value === "number") return Number.isInteger(value) ? String(value) : value.toFixed(2);
  if (typeof value === "boolean") return value ? "true" : "false";
  return `'${String(value).replaceAll("'", "''")}'`;
}

function rows(items, columns, map) {
  const values = items
    .map((item) => `  (${columns.map((column) => sql(map(item, column))).join(", ")})`)
    .join(",\n");
  return values;
}

const categories = rows(catalog.categories, ["slug", "name", "description", "tone"], (item, column) => item[column]);
const companies = rows(
  catalog.companies,
  ["slug", "name", "city", "state", "about", "phone", "email", "specialty", "since"],
  (item, column) => item[column],
);
const products = rows(
  catalog.products,
  [
    "slug",
    "name",
    "summary",
    "description",
    "category_slug",
    "company_slug",
    "material",
    "colors",
    "capacity",
    "customization",
    "min_quantity",
    "price_from",
    "price_hint",
    "featured",
    "image",
    "palette",
  ],
  (item, column) => {
    if (column === "category_slug") return item.categorySlug;
    if (column === "company_slug") return item.companySlug;
    if (column === "min_quantity") return item.minQuantity;
    if (column === "price_from") return item.priceFrom;
    if (column === "price_hint") return item.priceHint ?? "";
    if (column === "image") return item.image ?? "";
    if (column === "palette") return item.palette.join(",");
    return item[column];
  },
);

const sqlFile = `-- Ada Ateliê — rode depois do schema.sql.
-- Pode rodar de novo: troca o catálogo de demonstração pelo catálogo atual.

delete from products;
delete from categories;

insert into categories (slug, name, description, tone) values
${categories}
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  tone = excluded.tone;

insert into companies (slug, name, city, state, about, phone, email, specialty, since) values
${companies}
on conflict (slug) do update set
  name = excluded.name,
  city = excluded.city,
  state = excluded.state,
  about = excluded.about,
  phone = excluded.phone,
  email = excluded.email,
  specialty = excluded.specialty,
  since = excluded.since;

insert into products (
  slug, name, summary, description, category_slug, company_slug, material, colors,
  capacity, customization, min_quantity, price_from, price_hint, featured, image, palette
) values
${products}
on conflict (slug) do update set
  name = excluded.name,
  summary = excluded.summary,
  description = excluded.description,
  category_slug = excluded.category_slug,
  company_slug = excluded.company_slug,
  material = excluded.material,
  colors = excluded.colors,
  capacity = excluded.capacity,
  customization = excluded.customization,
  min_quantity = excluded.min_quantity,
  price_from = excluded.price_from,
  price_hint = excluded.price_hint,
  featured = excluded.featured,
  image = excluded.image,
  palette = excluded.palette;
`;

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), sqlFile);
console.log("supabase/seed.sql atualizado");
