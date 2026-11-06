"use client";

import { useEffect, useRef, useState } from "react";

type CollageProduct = { slug: string; name: string; image?: string };

function CollagePhoto({
  product,
  index,
  onFail,
}: {
  product: CollageProduct;
  index: number;
  onFail: (slug: string) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  // A pre-rendered <img> can finish failing before React hydrates and
  // attaches onError, so also check the already-settled state on mount.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      onFail(product.slug);
    }
  }, [product.slug, onFail]);

  return (
    <img
      ref={imgRef}
      src={product.image}
      alt={product.name}
      onError={() => onFail(product.slug)}
      className="absolute h-56 w-44 rounded-2xl border-4 border-white/90 object-cover shadow-2xl"
      style={{
        left: `${index * 28}%`,
        top: index === 1 ? "0" : "2rem",
        transform: `rotate(${(index - 1) * 7}deg)`,
        zIndex: index === 1 ? 2 : 1,
      }}
    />
  );
}

export function HeroCollage({ products }: { products: CollageProduct[] }) {
  const [failed, setFailed] = useState<string[]>([]);
  const visible = products.filter((product) => product.image && !failed.includes(product.slug));

  if (visible.length === 0) return null;

  return (
    <div className="relative mx-auto hidden h-80 w-full max-w-md sm:block">
      {visible.map((product, index) => (
        <CollagePhoto
          key={product.slug}
          product={product}
          index={index}
          onFail={(slug) => setFailed((current) => (current.includes(slug) ? current : [...current, slug]))}
        />
      ))}
    </div>
  );
}
