import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Blobs, CornerAccents, RoyalCrest, ShineOverlay } from "@/components/wrapped/SlideChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Teacher's Day — Dedications" },
      {
        name: "description",
        content: "A warm feed of dedication messages written for our teachers.",
      },
      { property: "og:title", content: "Happy Teacher's Day" },
      {
        property: "og:description",
        content: "Read every message written for our teachers.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="stage-1 relative flex h-dvh w-full items-center justify-center overflow-hidden px-8 text-center text-cream">
      <Blobs />
      <RoyalCrest className="absolute inset-0 m-auto h-[60vmin] w-[60vmin] text-gold/8 opacity-60" />
      <CornerAccents />
      <ShineOverlay />
      <div className="relative z-10 max-w-3xl">
        <div className="gold-rule mx-auto w-24" />
        <h1 className="animate-shimmer font-display mt-8 text-[clamp(2.6rem,9vw,6.5rem)] leading-[1.02] text-cream">
          Happy Teacher's Day.
        </h1>
        <div className="gold-rule mx-auto mt-8 w-24" />
        <Link
          to="/feed"
          className="font-display mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-lg text-ink transition-transform active:scale-95"
        >
          Read the messages <ChevronRight className="size-5" />
        </Link>
      </div>
    </main>
  );
}
