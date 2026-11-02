export type Category = {
  slug: string;
  name: string;
  description: string;
  tone: string;
};

export type Company = {
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

export type Product = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  categorySlug: string;
  companySlug: string;
  material: string;
  colors: string;
  capacity: string;
  customization: string;
  minQuantity: number;
  priceFrom: number;
  priceHint?: string;
  featured: boolean;
  image?: string;
  palette: [string, string, string];
};

export type Catalog = {
  source: "supabase" | "local";
  categories: Category[];
  companies: Company[];
  products: Product[];
};
