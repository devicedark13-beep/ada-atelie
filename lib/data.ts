import raw from "./catalog.json";
import type { Catalog, Category, Company, Product } from "./types";

export const categories: Category[] = raw.categories;

export const companies: Company[] = raw.companies;

export const products: Product[] = raw.products.map((product) => ({
  ...product,
  palette: [
      product.palette[0] ?? "#1f1a17",
      product.palette[1] ?? "#f6f1ea",
      product.palette[2] ?? "#c4522a",
    ],
}));

export const localCatalog: Catalog = {
  source: "local",
  categories,
  companies,
  products,
};
