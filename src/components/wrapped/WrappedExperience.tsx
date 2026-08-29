import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Music4, ChevronRight } from "lucide-react";
import type { Dedication } from "@/lib/dedications";
import { audioUrl } from "@/lib/supabase";
import { Blobs, ProgressBars } from "./SlideChrome";

type Slide =
  | { kind: "teacher" | "from" | "song"; ded: Dedication; dedIndex: number }
  | { kind: "end" };

const DURATION = { teacher: 6000, from: 6000, song: 12000, end: 1_000_000 };

function stageClass(i: number) {
  return `stage-${(i % 5) + 1}`;
}

export function WrappedExperience({
  dedications,
  onExit,
}: {
  dedications: Dedication[];
  onExit: () => void;
}) {
  const slides = useMemo<Slide[]>(() => {
    const out: Slide[] = [];
    dedications.forEach((ded, dedIndex) => {
      out.push({ kind: "teacher", ded, dedIndex });
      out.push({ kind: "from", ded, dedIndex });
      out.push({ kind: "song", ded, dedIndex });
    });
    out.push({ kind: "end" });
    return out;
  }, [dedications]);

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const touchStart = useRef<{ x: number; t: number } | null>(null);

  const slide = slides[index]!;
  const duration = DURATION[slide.kind];

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => Math.min(slides.length - 1, Math.max(0, i + delta)));
      setProgress(0);
    },
    [slides.length],
  );

  // auto-advance timer
  useEffect(() => {
    if (paused || slide.kind === "end") return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p >= 1) {
        setIndex((i) => Math.min(slides.length - 1, i + 1));
        setProgress(0);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, paused, duration, slide.kind, slides.length]);

  // audio follows the song slide
  const src = slide.kind === "song" ? audioUrl(slide.ded.audio_path) : null;
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (!src) {
      el.pause();
      setAudioPlaying(false);
      return;
    }
    el.src = src;
    el.currentTime = 0;
    el.play()
      .then(() => setAudioPlaying(true))
      .catch(() => setAudioPlaying(false));
    return () => {
      el.pause();
      setAudioPlaying(false);
    };
  }, [src]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el || !src) return;
    if (el.paused) {
      el.play().then(() => setAudioPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setAudioPlaying(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setProgress(0);
  };

  const groupIndex = slide.kind === "end" ? dedications.length : slide.dedIndex;

  return (
    <div
      className={`relative h-dvh w-full overflow-hidden text-white ${stageClass(groupIndex)} transition-[background-image] duration-[1200ms] ease-in-out`}
      onTouchStart={(e) =>
        (touchStart.current = { x: e.touches[0]!.clientX, t: Date.now() })
      }
      onTouchEnd={(e) => {
        const s = touchStart.current;
        if (!s) return;
        const dx = e.changedTouches[0]!.clientX - s.x;
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <Blobs />
      {slide.kind !== "end" && (
        <ProgressBars
          count={3}
          index={["teacher", "from", "song"].indexOf(slide.kind)}
          progress={progress}
        />
      )}

      {/* tap zones */}
      <button
        aria-label="Previous"
        className="absolute inset-y-0 left-0 z-20 w-[32%] cursor-w-resize"
        onClick={() => go(-1)}
      />
      <button
        aria-label="Next"
        className="absolute inset-y-0 right-0 z-20 w-[40%] cursor-e-resize"
        onClick={() => go(1)}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-7 py-20 text-center sm:px-16">
        {slide.kind === "teacher" && (
          <div key={`t-${index}`} className="max-w-5xl">
            <p className="animate-soft font-display text-sm uppercase tracking-[0.35em] text-white/70 sm:text-lg">
              Dedication {slide.dedIndex + 1} of {dedications.length}
            </p>
            <p
              className="animate-rise mt-6 text-xl text-white/80 sm:text-3xl"
              style={{ animationDelay: "80ms" }}
            >
              This one's for
            </p>
            <h1
              className="animate-rise font-display mt-2 text-[clamp(3rem,13vw,10rem)] leading-[0.92]"
              style={{ animationDelay: "220ms" }}
            >
              {slide.ded.teacher_name}
            </h1>
          </div>
        )}

        {slide.kind === "from" && (
          <div key={`f-${index}`} className="max-w-4xl">
            <h2 className="animate-soft font-display text-[clamp(1.6rem,5vw,3.5rem)] leading-tight text-white/70">
              {slide.ded.teacher_name}
            </h2>
            <p
              className="animate-rise mt-8 text-lg uppercase tracking-[0.3em] text-white/70 sm:text-2xl"
              style={{ animationDelay: "100ms" }}
            >
              from
            </p>
            <p
              className="animate-rise font-display mt-3 text-[clamp(2.4rem,9vw,7rem)] leading-[0.95]"
              style={{ animationDelay: "240ms" }}
            >
              {slide.ded.from_name}
            </p>
          </div>
        )}

        {slide.kind === "song" && (
          <div key={`s-${index}`} className="w-full max-w-2xl">
            <p className="animate-soft text-sm uppercase tracking-[0.3em] text-white/70 sm:text-base">
              The song for {slide.ded.teacher_name}
            </p>

            <div className="animate-rise mt-6 rounded-[2rem] bg-white/12 p-5 backdrop-blur-md sm:p-7">
              <div className="flex items-center gap-4 text-left sm:gap-6">
                <div
                  className={`grid size-20 shrink-0 place-items-center rounded-2xl bg-white/20 sm:size-28 ${audioPlaying ? "animate-spin-slow" : ""}`}
                >
                  <Music4 className="size-9 sm:size-12" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display truncate text-2xl leading-tight sm:text-4xl">
                    {slide.ded.song_title}
                  </p>
                  {slide.ded.song_artist && (
                    <p className="mt-1 truncate text-base text-white/75 sm:text-xl">
                      {slide.ded.song_artist}
                    </p>
                  )}
                </div>
                {src && (
                  <button
                    onClick={toggleAudio}
                    aria-label={audioPlaying ? "Pause" : "Play"}
                    className="relative z-30 grid size-14 shrink-0 place-items-center rounded-full bg-white text-[color:var(--ink)] transition-transform active:scale-95 sm:size-16"
                  >
                    {audioPlaying ? (
                      <Pause className="size-6 sm:size-7" />
                    ) : (
                      <Play className="size-6 translate-x-0.5 sm:size-7" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <p
              className="animate-rise mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/90 sm:text-xl"
              style={{ animationDelay: "160ms" }}
            >
              “{slide.ded.message}”
            </p>
            <p className="animate-soft mt-4 text-sm uppercase tracking-[0.25em] text-white/65 sm:text-base">
              — {slide.ded.from_name}
            </p>
          </div>
        )}

        {slide.kind === "end" && (
          <div className="max-w-3xl">
            <h2 className="animate-rise font-display text-[clamp(2.6rem,10vw,7rem)] leading-[0.95]">
              That's a wrap.
            </h2>
            <p
              className="animate-rise mt-6 text-lg text-white/85 sm:text-2xl"
              style={{ animationDelay: "150ms" }}
            >
              {dedications.length} dedication{dedications.length === 1 ? "" : "s"}, all
              for our teachers. Thank you for everything.
            </p>
            <div className="relative z-30 mt-10 flex flex-wrap justify-center gap-3">
              <button
                onClick={restart}
                className="font-display inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-lg text-[color:var(--ink)] transition-transform active:scale-95"
              >
                <RotateCcw className="size-5" /> Replay
              </button>
              <button
                onClick={onExit}
                className="font-display inline-flex items-center gap-2 rounded-full bg-white/15 px-7 py-3.5 text-lg text-white backdrop-blur-md transition-transform active:scale-95"
              >
                Back to start <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {slide.kind !== "end" && (
        <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between px-5 pb-6 sm:px-8">
          <button
            onClick={() => setPaused((p) => !p)}
            className="rounded-full bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md sm:text-sm"
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={restart}
            aria-label="Replay from start"
            className="grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
      )}

      <audio ref={audioRef} preload="auto" />
    </div>
  );
}
