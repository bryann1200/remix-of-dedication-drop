import { ALL_TEACHERS } from "@/lib/grouping";

export function Chalkboard({
  names,
  onSelect,
}: {
  names: string[];
  onSelect: (name: string) => void;
}) {
  return (
    <main className="stage-1 relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-10 text-cream sm:px-8">
      <div className="wood-frame relative w-full max-w-4xl rounded-[2rem] p-3 sm:p-5">
        <div className="chalkboard gold-hairline relative rounded-[1.4rem] px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="font-chalk text-2xl text-cream/70 sm:text-3xl">
            Teachers' Day Dedications
          </p>
          <div className="gold-rule mx-auto mt-4 w-32" />
          <ul className="mt-10 flex flex-col items-center gap-5 sm:gap-7">
            {names.map((name, i) => (
              <li key={name} className="w-full">
                <button
                  onClick={() => onSelect(name)}
                  className={`animate-chalk font-chalk mx-auto block text-[clamp(2rem,7vw,3.75rem)] leading-tight transition-colors duration-500 hover:text-gold ${
                    name === ALL_TEACHERS ? "text-gold" : "text-cream/90"
                  }`}
                  style={{ animationDelay: `${i * 320}ms` }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
          <p className="font-body mt-12 text-xs uppercase tracking-[0.3em] text-cream/45">
            Tap a name to begin
          </p>
        </div>
      </div>
    </main>
  );
}
