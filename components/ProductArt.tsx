"use client";

import { useEffect, useRef, useState } from "react";

function Placeholder({ kicker }: { kicker: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white text-neutral-300">
      <svg width="92" height="92" viewBox="0 0 92 92" fill="none" aria-hidden="true">
        <rect x="18" y="34" width="56" height="40" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M18 42h56M46 34v40M30 34c0-8 6-14 16-14s16 6 16 14" stroke="currentColor" strokeWidth="2" />
      </svg>
      <p className="mt-2 text-xs text-neutral-400">{kicker}</p>
    </div>
  );
}

export function ProductArt({
  kicker,
  image,
  alt,
  large,
}: {
  palette: [string, string, string];
  kicker: string;
  image?: string;
  alt?: string;
  large?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const frame = large ? "h-[32rem]" : "h-80";

  // A pre-rendered <img> can finish failing before React hydrates and
  // attaches onError, so also check the already-settled state on mount.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setFailed(true);
    }
  }, [image]);

  if (!image || failed) {
    return (
      <div className={`${frame} w-full`}>
        <Placeholder kicker={kicker} />
      </div>
    );
  }

  return (
    <div className={`${frame} w-full overflow-hidden bg-white`}>
      <img
        ref={imgRef}
        src={image}
        alt={alt || kicker}
        className="h-full w-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
