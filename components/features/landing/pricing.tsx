import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Apprentice",
    price: "Free",
    desc: "Everything you need to start structured prep.",
    features: [
      "Full interview sheet access",
      "Algorithm visualizer",
      "Local progress tracking",
      "Community roadmaps",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Journeyman",
    price: "$12/mo",
    desc: "For candidates in active interview loops.",
    features: [
      "Everything in Apprentice",
      "AI assistant, unlimited",
      "Company-specific prep tracks",
      "Synced notes across devices",
      "Priority roadmap milestones",
    ],
    cta: "Start forging",
    featured: true,
  },
  {
    name: "Smith",
    price: "$29/mo",
    desc: "For teams coaching multiple candidates.",
    features: [
      "Everything in Journeyman",
      "Team progress dashboard",
      "Shared bookmarks & notes",
      "Priority support",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          Simple pricing, no surprise heat
        </h2>
        <p className="mt-3 text-[15px] text-bone-muted">
          Start free. Upgrade when you're in the thick of interview season.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative rounded-2xl border p-7",
              tier.featured
                ? "border-ember-600/40 bg-ember-500/[0.04] shadow-[0_0_0_1px_rgba(255,107,53,0.15)]"
                : "border-white/[0.06] bg-white/[0.02]"
            )}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-heat-gradient px-3 py-1 text-[11px] font-semibold text-graphite-950">
                Most popular
              </span>
            )}
            <h3 className="font-display text-lg font-semibold text-bone">{tier.name}</h3>
            <div className="mt-3 font-display text-3xl font-semibold text-bone">{tier.price}</div>
            <p className="mt-2 text-[13px] text-bone-muted">{tier.desc}</p>
            <ul className="mt-6 space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13.5px] text-bone-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-tempered-500" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="mt-7 w-full"
              variant={tier.featured ? "default" : "outline"}
              asChild
            >
              <Link href="/sign-up">{tier.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
