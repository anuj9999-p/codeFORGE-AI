import Link from "next/link";
import { ROADMAPS } from "@/constants/roadmaps";
import { Card, CardContent } from "@/components/ui/card";
import { Map, ArrowRight } from "lucide-react";

export default function RoadmapsPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          Learning Roadmaps
        </h1>
        <p className="mt-3 text-[15px] text-bone-muted">
          Pick a destination. Track milestones as you clear them.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROADMAPS.map((r) => (
          <Link key={r.slug} href={`/roadmaps/${r.slug}`}>
            <Card className="h-full transition-colors hover:bg-white/[0.05]">
              <CardContent className="flex h-full flex-col p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-ember-500">
                  <Map className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-3 font-display text-[15px] font-semibold text-bone">{r.name}</h3>
                <p className="mt-1.5 flex-1 text-[13px] text-bone-muted">{r.description}</p>
                <span className="mt-4 flex items-center gap-1 text-[12.5px] font-medium text-ember-400">
                  {r.milestones.length} milestones <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
