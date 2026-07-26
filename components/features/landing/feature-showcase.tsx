import { LayoutGrid, Workflow, Building2, Map, Bot, Trophy } from "lucide-react";

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "Interview sheet, organized",
    desc: "26 topics from arrays to union-find. Every problem ships with brute force, optimal approach, complexity, edge cases, and the mistakes that cost candidates offers.",
    heat: "text-ember-500",
  },
  {
    icon: Workflow,
    title: "Visualize the algorithm",
    desc: "Step through sorting, searching, trees, graphs, and DP with play/pause/scrub controls — watch the recursion tree grow instead of imagining it.",
    heat: "text-molten-500",
  },
  {
    icon: Building2,
    title: "Prep by company",
    desc: "Google, Meta, Amazon, and 17 more — each with the patterns they actually ask, at the difficulty they actually ask it.",
    heat: "text-tempered-500",
  },
  {
    icon: Map,
    title: "Roadmaps that branch",
    desc: "Frontend, backend, ML, DevOps — expandable milestone maps that track what you've cleared and what's next.",
    heat: "text-ember-500",
  },
  {
    icon: Bot,
    title: "An AI mentor on call",
    desc: "Explain code, debug a stuck solution, drill behavioral questions, or get a roadmap built around your gaps — provider-agnostic under the hood.",
    heat: "text-molten-500",
  },
  {
    icon: Trophy,
    title: "Progress that compounds",
    desc: "XP, streaks, and category mastery rendered on one heat scale — so you always know exactly what's tempered and what still needs heat.",
    heat: "text-tempered-500",
  },
];

export function FeatureShowcase() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          Everything an interview loop actually tests
        </h2>
        <p className="mt-3 text-[15px] text-bone-muted">
          Not another list of LeetCode links. A complete, structured path from first principles to offer.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
          >
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] ${f.heat}`}>
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-[17px] font-semibold text-bone">{f.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-bone-muted">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
