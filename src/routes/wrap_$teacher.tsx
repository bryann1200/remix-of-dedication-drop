import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Play, Sparkles } from "lucide-react";
import { fetchDedications } from "@/lib/dedications";
import { isSupabaseConfigured } from "@/lib/supabase";
import { WrappedExperience } from "@/components/wrapped/WrappedExperience";
import { Blobs, CornerAccents, RoyalCrest, ShineOverlay } from "@/components/wrapped/SlideChrome";

export const Route = createFileRoute("/wrap_$teacher")({
  head: ({ params }) => ({
    meta: [
      { title: `${decodeURIComponent(params.teacher)}'s Dedications Wrapped` },
    ],
  }),
  component: TeacherWrap,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="stage-1 relative flex h-dvh w-full items-center justify-center overflow-hidden px-8 text-center text-cream">
      <Blobs />
      <RoyalCrest className="absolute inset-0 m-auto h-[60vmin] w-[60vmin] text-gold/8 opacity-60" />
      <CornerAccents />
      <ShineOverlay />
      <div className="relative z-10 max-w-3xl">{children}</div>
    </main>
  );
}

function TeacherWrap() {
  const { teacher } = Route.useParams();
  const teacherName = decodeURIComponent(teacher);
  const [started, setStarted] = useState(false);

  const { data, isPending, error } = useQuery({
    queryKey: ["dedications"],
    queryFn: fetchDedications,
    enabled: isSupabaseConfigured,
  });

  if (!isSupabaseConfigured) {
    return (
      <Shell>
        <h1 className="font-display text-[clamp(2rem,7vw,4rem)] leading-tight">
          Almost there
        </h1>
        <p className="font-body mt-4 text-lg text-cream/85">
          Add your existing project's URL and anon key as{" "}
          <span className="font-display">VITE_SUPABASE_URL</span> and{" "}
          <span className="font-display">VITE_SUPABASE_PUBLISHABLE_KEY</span> to load the
          dedications.
        </p>
      </Shell>
    );
  }

  if (isPending) {
    return (
      <Shell>
        <div className="animate-soft">
          <div className="mx-auto size-16 animate-spin rounded-full border-4 border-cream/25 border-t-gold" />
          <p className="font-display mt-8 text-2xl">Gathering {teacherName}'s dedications…</p>
        </div>
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell>
        <h1 className="font-display text-[clamp(2rem,7vw,4rem)]">Couldn't load</h1>
        <p className="font-body mt-4 text-lg text-cream/85">{(error as Error).message}</p>
      </Shell>
    );
  }

  // Case-insensitive match on teacher_name so URL casing doesn't have to be exact
  const dedications = (data ?? []).filter(
    (d) => d.teacher_name.trim().toLowerCase() === teacherName.trim().toLowerCase()
  );

  if (dedications.length === 0) {
    return (
      <Shell>
        <Sparkles className="mx-auto size-12 text-gold" />
        <h1 className="font-display mt-6 text-[clamp(2.2rem,8vw,5rem)] leading-[0.95]">
          Nothing here yet for {teacherName}
        </h1>
        <p className="font-body mt-5 text-lg text-cream/85 sm:text-xl">
          Check the name in the link matches exactly what's in the dedications, or check back
          once one comes in.
        </p>
      </Shell>
    );
  }

  if (started) {
    return (
      <WrappedExperience dedications={dedications} onExit={() => setStarted(false)} />
    );
  }

  return (
    <Shell>
      <p className="animate-soft font-display text-xs uppercase tracking-[0.4em] text-cream/75 sm:text-sm">
        {dedications.length} dedication{dedications.length === 1 ? "" : "s"} for you
      </p>
      <h1 className="animate-rise font-display mt-5 text-[clamp(2.6rem,11vw,7.5rem)] leading-[0.9]">
        {teacherName}'s
        <br />
        Wrapped
      </h1>
      <p
        className="animate-rise font-body mx-auto mt-6 max-w-xl text-lg text-cream/85 sm:text-2xl"
        style={{ animationDelay: "140ms" }}
      >
        Every song, every message, written just for you.
      </p>
      <button
        onClick={() => setStarted(true)}
        className="animate-rise font-display mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-xl text-ink transition-transform active:scale-95 sm:text-2xl"
        style={{ animationDelay: "260ms" }}
      >
        <Play className="size-6 translate-x-0.5" /> Start
      </button>
      <p className="font-body mt-6 text-sm text-cream/65">Tap right to advance, left to go back</p>
    </Shell>
  );
}
