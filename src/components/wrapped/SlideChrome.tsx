export function ProgressBars({
  count,
  index,
  progress,
}: {
  count: number;
  index: number;
  progress: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex gap-1.5 p-3 sm:p-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="gold-hairline h-1 flex-1 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm"
        >
          <div
            className="h-full rounded-full bg-[color:var(--gold)] transition-[width] duration-100 ease-linear"
            style={{ width: `${i < index ? 100 : i === index ? progress * 100 : 0}%` }}
          />
        </div>
      ))}
    </div>
  );
}

export function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-blob absolute -left-[20%] top-[8%] h-[55vmin] w-[55vmin] rounded-full bg-white/10 blur-2xl" />
      <div
        className="animate-blob absolute -right-[15%] bottom-[6%] h-[45vmin] w-[45vmin] rounded-full bg-white/10 blur-2xl"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="animate-blob absolute right-[18%] top-[14%] h-[22vmin] w-[22vmin] rounded-full bg-white/10 blur-xl"
        style={{ animationDelay: "-6s" }}
      />
    </div>
  );
}
