import { Music4 } from "lucide-react";
import type { Dedication } from "@/lib/dedications";
import { Blobs, CornerAccents, RoyalCrest, ShineOverlay } from "./SlideChrome";

export function AllTeachersRow({
  dedications,
  onSelect,
}: {
  dedications: Dedication[];
  onSelect: (index: number) => void;
}) {
  return (
    <main className="stage-2 relative flex h-dvh w-full flex-col justify-center overflow-hidden text-cream">
      <Blobs />
      <RoyalCrest className="absolute inset-0 m-auto h-[60vmin] w-[60vmin] text-gold/8 opacity-60" />
      <CornerAccents />
      <ShineOverlay />

      <div className="relative z-10 px-8 sm:px-14">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-gold sm:text-sm">
          For all our teachers
        </p>
        <div className="gold-rule mt-4 w-28" />
        <h1 className="font-body mt-5 text-[clamp(2rem,7vw,4rem)] leading-[1]">
          {dedications.length} dedication{dedications.length === 1 ? "" : "s"}
        </h1>
      </div>

      <div className="relative z-10 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-8 pb-6 sm:gap-7 sm:px-14">
        {dedications.map((d, i) => (
          <button
            key={`${d.created_at}-${i}`}
            onClick={() => onSelect(i)}
            className="gold-hairline animate-rise flex w-[70vw] max-w-xs shrink-0 snap-center flex-col rounded-[1.75rem] bg-cream/8 p-6 text-left backdrop-blur-md transition-transform duration-500 hover:scale-[1.03] active:scale-95 sm:w-72"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div className="gold-hairline grid aspect-square w-full place-items-center rounded-[1.25rem] bg-cream/10">
              <Music4 className="size-12 text-gold" />
            </div>
            <p className="font-body mt-5 line-clamp-2 text-xl leading-tight">
              {d.song_title}
            </p>
            {d.song_artist && (
              <p className="font-body mt-1 truncate text-sm text-cream/70">
                {d.song_artist}
              </p>
            )}
            <div className="gold-rule mt-4 w-full" />
            <p className="font-display mt-4 truncate text-xs uppercase tracking-[0.25em] text-gold">
              from {d.from_name}
            </p>
          </button>
        ))}
      </div>

      <p className="relative z-10 px-8 font-body text-sm text-cream/60 sm:px-14">
        Swipe across, tap a card to open it
      </p>
    </main>
  );
}
