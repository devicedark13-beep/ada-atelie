import { cache } from "react";
import { localCatalog } from "./data";
import { fold } from "./format";
import { getSupabase } from "./supabase";
import type { Catalog, Category, Company, Product } from "./types";

type CategoryRow = {
  slug: string;
  name: string;
  description: string;
  tone: string;
};

type CompanyRow = {
  slug: string;
  name: string;
  city: string;
  state: string;
  about: string;
  phone: string;
  email: string;
  specialty: string;
  since: number;
};

type ProductRow = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  category_slug: string;
  company_slug: string;
  material: string;
  colors: string;
  capacity: string;
  customization: string;
  min_quantity: number;
  price_from: number | string;
  price_hint?: string | null;
  featured: boolean;
  image?: string | null;
  palette: string;
};

function mapCategory(row: CategoryRow): Category {
  return row;
}

function mapCompany(row: CompanyRow): Company {
  return row;
}

function mapProduct(row: ProductRow): Product {
  const parts = row.palette.split(",").map((item) => item.trim());
  return {
    slug: row.slug,
    name: row.name,
    summary: row.summary,
    description: row.description,
    categorySlug: row.category_slug,
    companySlug: row.company_slug,
    material: row.material,
    colors: row.colors,
    capacity: row.capacity,
    customization: row.customization,
    minQuantity: Number(row.min_quantity),
    priceFrom: Number(row.price_from),
    priceHint: row.price_hint ?? "",
    featured: Boolean(row.featured),
    image: row.image ?? "",
    palette: [parts[0] || "#1f1a17", parts[1] || "#f6f1ea", parts[2] || "#c4522a"],
  };
}

export const getCatalog = cache(async (): Promise<Catalog> => {
  const supabase = getSupabase();
  if (!supabase) return localCatalog;

  const [categoriesRes, companiesRes, productsRes] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("companies").select("*").order("name"),
    supabase.from("products").select("*").order("name"),
  ]);

  const error = categoriesRes.error ?? companiesRes.error ?? productsRes.error;
  if (error || !productsRes.data?.length) {
    if (error) console.error("Catálogo local no lugar do Supabase:", error.message);
    return localCatalog;
  }

  return {
    source: "supabase",
    categories: ((categoriesRes.data ?? []) as CategoryRow[]).map(mapCategory),
    companies: ((companiesRes.data ?? []) as CompanyRow[]).map(mapCompany),
    products: (productsRes.data as ProductRow[]).map(mapProduct),
  };
});

export function companyOf(catalog: Catalog, slug: string) {
  return catalog.companies.find((company) => company.slug === slug);
}

export function categoryOf(catalog: Catalog, slug: string) {
  return catalog.categories.find((category) => category.slug === slug);
}

export function productOf(catalog: Catalog, slug: string) {
  return catalog.products.find((product) => product.slug === slug);
}

export function filterProducts(
  catalog: Catalog,
  filters: { q?: string; categoria?: string; empresa?: string },
) {
  const needle = fold((filters.q ?? "").trim());
  return catalog.products.filter((product) => {
    if (filters.categoria && product.categorySlug !== filters.categoria) return false;
    if (filters.empresa && product.companySlug !== filters.empresa) return false;
    if (!needle) return true;
    const company = companyOf(catalog, product.companySlug);
    const category = categoryOf(catalog, product.categorySlug);
    return fold(
      [product.name, product.summary, product.description, company?.name, category?.name]
        .filter(Boolean)
        .join(" "),
    ).includes(needle);
  });
}

export function searchCatalog(catalog: Catalog, q: string) {
  const needle = fold(q.trim());
  if (!needle) return { products: [] as Product[], companies: [] as Company[] };

  const products = catalog.products.filter((product) => {
    const company = companyOf(catalog, product.companySlug);
    const category = categoryOf(catalog, product.categorySlug);
    return fold(
      [
        product.name,
        product.summary,
        product.description,
        product.material,
        product.colors,
        product.customization,
        company?.name,
        category?.name,
      ]
        .filter(Boolean)
        .join(" "),
    ).includes(needle);
  });

  const companies = catalog.companies.filter((company) =>
    fold(
      [company.name, company.city, company.state, company.specialty, company.about].join(" "),
    ).includes(needle),
  );

  return { products, companies };
}
