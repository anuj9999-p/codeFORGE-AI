const STATS = [
  { value: "500+", label: "Curated problems" },
  { value: "26", label: "DSA topics covered" },
  { value: "20+", label: "Companies profiled" },
  { value: "12", label: "Visual algorithm modules" },
];

const COMPANIES = [
  "Google", "Meta", "Amazon", "Microsoft", "Apple", "Netflix",
  "Uber", "Adobe", "Oracle", "Salesforce", "Atlassian", "Goldman Sachs",
];

export function StatsCompanies() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015] py-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-semibold tracking-tight text-bone md:text-4xl">
                <span className="bg-heat-gradient bg-clip-text text-transparent">{s.value}</span>
              </div>
              <div className="mt-1 text-[13px] text-bone-muted">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <p className="mb-6 text-center text-[12px] uppercase tracking-[0.18em] text-bone-faint">
            Prep tracks tuned to real interview loops at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {COMPANIES.map((c) => (
              <span key={c} className="font-display text-[15px] font-medium text-bone-muted">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
