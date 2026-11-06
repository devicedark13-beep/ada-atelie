"use client";

import { useEffect, useRef, useState } from "react";
import { parseImageList } from "@/lib/format";

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
  const candidates = parseImageList(product.image);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const src = candidates[candidateIndex];

  // No candidate left to try (or none to begin with): drop this slot.
  useEffect(() => {
    if (!src) onFail(product.slug);
  }, [src, product.slug, onFail]);

  // A pre-rendered <img> can finish failing before React hydrates and
  // attaches onError, so also check the already-settled state on mount.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setCandidateIndex((current) => current + 1);
    }
  }, [src]);

  if (!src) return null;

  return (
    <img
      key={src}
      ref={imgRef}
      src={src}
      alt={product.name}
      onError={() => setCandidateIndex((current) => current + 1)}
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
