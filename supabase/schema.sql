-- Ada Ateliê
-- Rode este arquivo no SQL Editor do Supabase antes do seed.sql.
-- Pode rodar de novo: as políticas são recriadas.

create extension if not exists pgcrypto;

create table if not exists categories (
  slug text primary key,
  name text not null,
  description text not null,
  tone text not null
);

create table if not exists companies (
  slug text primary key,
  name text not null,
  city text not null,
  state text not null,
  about text not null,
  phone text not null,
  email text not null,
  specialty text not null,
  since integer not null
);

create table if not exists products (
  slug text primary key,
  name text not null,
  summary text not null,
  description text not null,
  category_slug text not null references categories (slug),
  company_slug text not null references companies (slug),
  material text not null,
  colors text not null,
  capacity text not null,
  customization text not null,
  min_quantity integer not null,
  price_from numeric(10, 2) not null,
  price_hint text not null default '',
  featured boolean not null default false,
  image text not null default '',
  palette text not null
);

alter table products add column if not exists price_hint text not null default '';
alter table products add column if not exists image text not null default '';

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  buyer_company text,
  product_slug text,
  quantity integer not null,
  customization text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists supplier_leads (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  city text,
  state text,
  cnpj text,
  specialty text,
  message text,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table companies enable row level security;
alter table products enable row level security;
alter table quotes enable row level security;
alter table supplier_leads enable row level security;

drop policy if exists "leitura publica de categorias" on categories;
create policy "leitura publica de categorias"
  on categories for select to anon, authenticated using (true);

drop policy if exists "leitura publica de empresas" on companies;
create policy "leitura publica de empresas"
  on companies for select to anon, authenticated using (true);

drop policy if exists "leitura publica de produtos" on products;
create policy "leitura publica de produtos"
  on products for select to anon, authenticated using (true);

drop policy if exists "envio de orcamentos" on quotes;
create policy "envio de orcamentos"
  on quotes for insert to anon, authenticated with check (true);

drop policy if exists "envio de anuncios" on supplier_leads;
create policy "envio de anuncios"
  on supplier_leads for insert to anon, authenticated with check (true);

grant select on categories, companies, products to anon, authenticated;
grant insert on quotes, supplier_leads to anon, authenticated;
