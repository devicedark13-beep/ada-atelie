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
  if (image) {
    const frame = large ? "h-[32rem]" : "h-80";
    return (
      <div
        role="img"
        aria-label={alt || kicker}
        className={`${frame} w-full overflow-hidden bg-white bg-contain bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(${image})` }}
      />
    );
  }

  return (
    <div className="flex h-56 flex-col items-center justify-center bg-white text-neutral-300">
      <svg width="92" height="92" viewBox="0 0 92 92" fill="none" aria-hidden="true">
        <rect x="18" y="34" width="56" height="40" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M18 42h56M46 34v40M30 34c0-8 6-14 16-14s16 6 16 14" stroke="currentColor" strokeWidth="2" />
      </svg>
      <p className="mt-2 text-xs text-neutral-400">{kicker}</p>
    </div>
  );
}
