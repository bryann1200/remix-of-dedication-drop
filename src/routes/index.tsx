import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ChevronLeft, Sparkles } from "lucide-react";
import { fetchDedications } from "@/lib/dedications";
import { mockDedications } from "@/lib/mockDedications";
import { ALL_TEACHERS, groupByTeacher } from "@/lib/grouping";
import { isSupabaseConfigured } from "@/lib/supabase";
import { WrappedExperience } from "@/components/wrapped/WrappedExperience";
import { Teaser } from "@/components/wrapped/Teaser";
import { Chalkboard } from "@/components/wrapped/Chalkboard";
import { AllTeachersRow } from "@/components/wrapped/AllTeachersRow";
import { Blobs, CornerAccents, RoyalCrest, ShineOverlay } from "@/components/wrapped/SlideChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dedications Wrapped — Songs for our teachers" },
      {
        name: "description",
        content:
          "A full-screen animated reveal of every song dedication written for our teachers.",
      },
      { property: "og:title", content: "Dedications Wrapped" },
      {
        property: "og:description",
        content: "One slide at a time: the teacher, the class, the song.",
      },
    ],
  }),
  component: Index,
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

type View =
  | { stage: "teaser" }
  | { stage: "board" }
  | { stage: "reveal"; teacher: string }
  | { stage: "cards" }
  | { stage: "card-reveal"; index: number };

function Index() {
  const [view, setView] = useState<View>({ stage: "teaser" });
  const [useMock, setUseMock] = useState(false);

  const { data, isPending, error } = useQuery({
    queryKey: ["dedications"],
    queryFn: fetchDedications,
    enabled: isSupabaseConfigured && !useMock,
  });

  const dedications = useMock ? mockDedications : (data ?? []);
  const { groups, names } = useMemo(() => groupByTeacher(dedications), [dedications]);

  if (!useMock && !isSupabaseConfigured) {
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

  if (!useMock && isPending) {
    return (
      <Shell>
        <div className="animate-soft">
          <div className="mx-auto size-16 animate-spin rounded-full border-4 border-cream/25 border-t-gold" />
          <p className="font-display mt-8 text-2xl">Gathering the dedications…</p>
        </div>
      </Shell>
    );
  }

  if (!useMock && error) {
    return (
      <Shell>
        <h1 className="font-display text-[clamp(2rem,7vw,4rem)]">Couldn't load</h1>
        <p className="font-body mt-4 text-lg text-cream/85">{(error as Error).message}</p>
      </Shell>
    );
  }

  if (dedications.length === 0) {
    return (
      <Shell>
        <Sparkles className="mx-auto size-12 text-gold" />
        <h1 className="font-display mt-6 text-[clamp(2.2rem,8vw,5rem)] leading-[0.95]">
          No dedications yet
        </h1>
        <p className="font-body mt-5 text-lg text-cream/85 sm:text-xl">
          The moment the first one lands, it'll show up right here — big, loud and
          unmissable.
        </p>
        <button
          onClick={() => {
            setUseMock(true);
            setView({ stage: "teaser" });
          }}
          className="font-display mt-9 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream/10 px-7 py-3 text-sm uppercase tracking-[0.2em] text-cream backdrop-blur-md"
        >
          Preview with sample dedications
        </button>
      </Shell>
    );
  }

  const backToBoard = () => setView({ stage: "board" });

  if (view.stage === "teaser") {
    return <Teaser onProceed={backToBoard} />;
  }

  if (view.stage === "board") {
    return (
      <Chalkboard
        names={names}
        onSelect={(name) =>
          setView(name === ALL_TEACHERS ? { stage: "cards" } : { stage: "reveal", teacher: name })
        }
      />
    );
  }

  if (view.stage === "cards") {
    const all = groups.get(ALL_TEACHERS) ?? [];
    return (
      <div className="relative">
        <BackButton onClick={backToBoard} />
        <AllTeachersRow
          dedications={all}
          onSelect={(index) => setView({ stage: "card-reveal", index })}
        />
      </div>
    );
  }

  if (view.stage === "card-reveal") {
    const all = groups.get(ALL_TEACHERS) ?? [];
    const one = all[view.index];
    if (!one) return <Chalkboard names={names} onSelect={() => setView({ stage: "board" })} />;
    return (
      <WrappedExperience
        dedications={[one]}
        skipTeacherSlide
        onBack={() => setView({ stage: "cards" })}
        onExit={() => setView({ stage: "cards" })}
      />
    );
  }

  return (
    <WrappedExperience
      dedications={groups.get(view.teacher) ?? []}
      onBack={backToBoard}
      onExit={backToBoard}
    />
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="font-display absolute left-5 top-5 z-40 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-cream/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream backdrop-blur-md sm:left-8 sm:top-8"
    >
      <ChevronLeft className="size-4" /> Board
    </button>
  );
}
