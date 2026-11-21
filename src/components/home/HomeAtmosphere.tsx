export function HomeAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[min(100svh,800px)] bg-subtle-grid opacity-40"
      style={{ maskImage: 'linear-gradient(black, transparent)' }}
    />
  );
}
