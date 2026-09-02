import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Volume2, VolumeX } from "lucide-react";
import { fetchDedications, type Dedication } from "@/lib/dedications";
import { audioUrl, isSupabaseConfigured } from "@/lib/supabase";
import { Blobs, CornerAccents, ShineOverlay } from "@/components/wrapped/SlideChrome";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Messages — Happy Teacher's Day" },
      {
        name: "description",
        content: "Every dedication message written for our teachers, in one feed.",
      },
      { property: "og:title", content: "Messages — Happy Teacher's Day" },
      {
        property: "og:description",
        content: "Every dedication message written for our teachers, in one feed.",
      },
    ],
  }),
  component: Feed,
});

function DedicationCard({ ded }: { ded: Dedication }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="gold-hairline block w-full rounded-2xl bg-cream/8 p-5 text-left backdrop-blur-md transition-colors hover:bg-cream/12 sm:p-6"
    >
      <p
        className={`font-body text-pretty text-base leading-relaxed text-cream/95 sm:text-lg ${
          open ? "" : "line-clamp-2"
        }`}
      >
        “{ded.message}”
      </p>
      <div className="gold-rule mt-4 w-16" />
      <p className="font-display mt-3 text-xs uppercase tracking-[0.25em] text-gold sm:text-sm">
        {ded.from_name}
        <span className="mx-2 text-cream/50">for</span>
        <span className="text-cream/85">{ded.teacher_name}</span>
      </p>
    </button>
  );
}

function Feed() {
  const { data, isPending, error } = useQuery({
    queryKey: ["dedications"],
    queryFn: fetchDedications,
    enabled: isSupabaseConfigured,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const src = audioUrl("background-mix.mp3");
    if (!src) return;
    el.src = src;
    el.loop = true;
    el.play().catch(() => {});
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (muted) {
      el.pause();
    } else if (el.src) {
      el.play().catch(() => {});
    }
  }, [muted]);

  const dedications = data ?? [];

  return (
    <main className="stage-1 relative min-h-dvh w-full overflow-hidden text-cream">
      <Blobs />
      <CornerAccents />
      <ShineOverlay />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-5 pb-28 pt-8 sm:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-display inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-cream/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream backdrop-blur-md"
          >
            <ChevronLeft className="size-4" /> Home
          </Link>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">
            Teacher's Day
          </p>
        </div>

        <h1 className="font-display mt-10 text-center text-[clamp(2rem,7vw,3.5rem)] leading-tight">
          Messages for our teachers
        </h1>
        <div className="gold-rule mx-auto mt-6 w-24" />

        {isPending && (
          <div className="animate-soft mt-16 text-center">
            <div className="mx-auto size-14 animate-spin rounded-full border-4 border-cream/25 border-t-gold" />
            <p className="font-display mt-6 text-xl">Gathering the dedications…</p>
          </div>
        )}

        {error && (
          <p className="font-body mt-16 text-center text-lg text-cream/85">
            Couldn't load — {(error as Error).message}
          </p>
        )}

        {!isPending && !error && dedications.length === 0 && (
          <p className="font-body mt-16 text-center text-lg text-cream/85">
            No dedications yet — the first one will appear right here.
          </p>
        )}

        <div className="mt-10 flex flex-col gap-4">
          {dedications.map((ded, i) => (
            <DedicationCard key={`${ded.created_at}-${i}`} ded={ded} />
          ))}
        </div>
      </div>

      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute background music" : "Mute background music"}
        className="fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full border border-gold/40 bg-cream/10 backdrop-blur-md transition-transform active:scale-95"
      >
        {muted ? (
          <VolumeX className="size-5 text-cream" />
        ) : (
          <Volume2 className="size-5 text-gold" />
        )}
      </button>

      <audio ref={audioRef} preload="auto" />
    </main>
  );
}
