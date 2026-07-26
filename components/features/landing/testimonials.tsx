const TESTIMONIALS = [
  {
    quote:
      "The visualizer is what finally made recursion click for me — watching the call stack build and unwind instead of tracing it on paper.",
    name: "Priya N.",
    role: "SWE new-grad prep",
  },
  {
    quote:
      "I stopped grinding random problems and started following the roadmap. Cleared two onsites in the same month.",
    name: "Marcus T.",
    role: "Backend engineer, 3 YoE",
  },
  {
    quote:
      "The company-specific sheets saved me — I knew exactly which patterns to drill before my Meta loop.",
    name: "Ade O.",
    role: "Mobile engineer",
  },
];

export function Testimonials() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          Built for the grind, used through the offer
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <blockquote className="text-[14px] leading-relaxed text-bone-muted">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-heat-gradient font-display text-[13px] font-semibold text-graphite-950">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="text-[13px] font-medium text-bone">{t.name}</div>
                <div className="text-[12px] text-bone-faint">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
