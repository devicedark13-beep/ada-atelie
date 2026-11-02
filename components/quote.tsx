"use client";

import { useEffect, useState } from "react";

const KEY = "ada-quote-slugs";

function readSlugs() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function useQuoteSlugs() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSlugs(readSlugs());
    sync();
    window.addEventListener("ada-quote", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("ada-quote", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return slugs;
}

export function addQuoteSlug(slug: string) {
  const next = readSlugs().includes(slug) ? readSlugs() : [...readSlugs(), slug];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("ada-quote"));
}

export function QuoteButton({ slug }: { slug: string }) {
  const slugs = useQuoteSlugs();
  const added = slugs.includes(slug);

  return (
    <button
      type="button"
      onClick={() => addQuoteSlug(slug)}
      className="mt-3 inline-flex items-center gap-2 rounded bg-quote px-4 py-1.5 text-sm font-semibold text-white"
    >
      {added ? "No orçamento" : "Orçar"}
      <CartIcon />
    </button>
  );
}

export function HeaderCart() {
  const slugs = useQuoteSlugs();

  return (
    <a href="/orcamento" className="relative grid h-11 w-11 place-items-center text-white" aria-label="Orçamentos">
      <CartIcon large />
      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-quote px-1 text-xs font-bold text-white">
        {slugs.length}
      </span>
    </a>
  );
}

export function BasketList({
  products,
}: {
  products: { slug: string; name: string; companyName: string }[];
}) {
  const slugs = useQuoteSlugs();
  const chosen = products.filter((product) => slugs.includes(product.slug));
  if (chosen.length === 0) return null;

  return (
    <ul className="mt-4 space-y-2 text-sm">
      {chosen.map((product) => (
        <li key={product.slug} className="border border-line bg-white px-3 py-2">
          {product.name}
          <span className="block text-ink/60">{product.companyName}</span>
        </li>
      ))}
    </ul>
  );
}

function CartIcon({ large = false }: { large?: boolean }) {
  const size = large ? 28 : 16;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6h15l-1.5 9h-12L5 3H2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
