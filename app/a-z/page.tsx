import Link from "next/link";
import { Suspense } from "react";
import { CatalogFallback } from "@/components/CatalogBits";
import { getCatalog } from "@/lib/catalog";
import { letterOf } from "@/lib/format";

export const metadata = { title: "Índice A–Z" };

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetPage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <AlphabetContent />
    </Suspense>
  );
}

async function AlphabetContent() {
  const catalog = await getCatalog();
  const used = new Set(catalog.products.map((product) => letterOf(product.name)));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Personalizados de A a Z</h1>
      <p className="mt-3 max-w-xl text-ink/70">
        Índice alfabético das peças do Ad Ateliê.
      </p>
      <nav className="mt-6 flex flex-wrap gap-2">
        {alphabet.map((letter) =>
          used.has(letter) ? (
            <a
              key={letter}
              href={`#letra-${letter}`}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm text-paper"
            >
              {letter}
            </a>
          ) : (
            <span
              key={letter}
              className="grid h-10 w-10 place-items-center rounded-full bg-sand text-sm text-ink/35"
            >
              {letter}
            </span>
          ),
        )}
      </nav>
      <div className="mt-10 space-y-10">
        {alphabet.filter((letter) => used.has(letter)).map((letter) => (
          <section key={letter} id={`letra-${letter}`}>
            <h2 className="text-2xl font-semibold">{letter}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {catalog.products
                .filter((product) => letterOf(product.name) === letter)
                .map((product) => (
                  <li key={product.slug}>
                    <Link href={`/produtos/${product.slug}`} className="hover:text-clay">
                      {product.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
