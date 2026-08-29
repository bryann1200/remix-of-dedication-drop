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
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex gap-2 p-4 sm:p-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="gold-hairline h-1.5 flex-1 overflow-hidden rounded-full bg-cream/10 backdrop-blur-sm"
        >
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-100 ease-linear"
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
      <div className="animate-blob absolute -left-[20%] top-[8%] h-[55vmin] w-[55vmin] rounded-full bg-gold/10 blur-[80px]" />
      <div
        className="animate-blob absolute -right-[15%] bottom-[6%] h-[45vmin] w-[45vmin] rounded-full bg-cream/6 blur-[80px]"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="animate-blob absolute right-[18%] top-[14%] h-[22vmin] w-[22vmin] rounded-full bg-gold/8 blur-3xl"
        style={{ animationDelay: "-10s" }}
      />
    </div>
  );
}

export function CornerAccents() {
  return (
    <>
      <div className="royal-corner absolute top-5 left-5 rounded-tl-xl border-t-2 border-l-2 sm:top-7 sm:left-7" />
      <div className="royal-corner absolute top-5 right-5 rounded-tr-xl border-t-2 border-r-2 sm:top-7 sm:right-7" />
      <div className="royal-corner absolute bottom-5 left-5 rounded-bl-xl border-b-2 border-l-2 sm:bottom-7 sm:left-7" />
      <div className="royal-corner absolute bottom-5 right-5 rounded-br-xl border-b-2 border-r-2 sm:bottom-7 sm:right-7" />
    </>
  );
}

export function RoyalCrest({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
    </svg>
  );
}

export function ShineOverlay() {
  return <div className="royal-shine absolute inset-0 z-0" />;
}
