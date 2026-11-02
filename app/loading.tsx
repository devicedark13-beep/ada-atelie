export default function Loading() {
  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-72 animate-pulse rounded-3xl bg-sand" />
      ))}
    </div>
  );
}
