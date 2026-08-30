import { Blobs, CornerAccents, RoyalCrest, ShineOverlay } from "./SlideChrome";

export function Teaser({ onProceed }: { onProceed: () => void }) {
  return (
    <button
      onClick={onProceed}
      aria-label="Begin"
      className="stage-1 relative flex h-dvh w-full cursor-pointer items-center justify-center overflow-hidden px-8 text-center text-cream"
    >
      <Blobs />
      <RoyalCrest className="absolute inset-0 m-auto h-[60vmin] w-[60vmin] text-gold/8 opacity-60" />
      <CornerAccents />
      <ShineOverlay />
      <div className="relative z-10 max-w-2xl">
        <div className="gold-rule mx-auto w-24" />
        <h1 className="animate-shimmer font-display mt-8 text-[clamp(2rem,8vw,5rem)] leading-[1.05] text-cream">
          Something awaits you…
        </h1>
        <div className="gold-rule mx-auto mt-8 w-24" />
        <p className="animate-soft font-body mt-8 text-sm uppercase tracking-[0.35em] text-cream/60">
          Tap anywhere to begin
        </p>
      </div>
    </button>
  );
}
