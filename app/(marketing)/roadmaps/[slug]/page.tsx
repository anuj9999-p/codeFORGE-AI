"use client";

import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { ROADMAPS } from "@/constants/roadmaps";
import { HeatBar } from "@/components/shared/heat-bar";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { fireMilestoneConfetti, fireLevelUpConfetti } from "@/lib/confetti";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoadmapDetailPage() {
  const params = useParams<{ slug: string }>();
  const roadmap = ROADMAPS.find((r) => r.slug === params.slug);
  const [expanded, setExpanded] = useState<number | null>(0);
  const [completed, setCompleted] = useLocalStorage<Record<string, boolean[]>>(
    "codeforge:roadmap-progress",
    {}
  );

  if (!roadmap) return notFound();

  const done = completed[roadmap.slug] ?? roadmap.milestones.map(() => false);
  const completedCount = done.filter(Boolean).length;
  const progressPct = (completedCount / roadmap.milestones.length) * 100;

  function toggleMilestone(index: number) {
    setCompleted((prev) => {
      const current = prev[roadmap!.slug] ?? roadmap!.milestones.map(() => false);
      const next = [...current];
      next[index] = !next[index];

      if (next[index]) {
        const allDone = next.every(Boolean);
        if (allDone) {
          setTimeout(() => fireLevelUpConfetti(), 50);
        } else {
          setTimeout(() => fireMilestoneConfetti(), 50);
        }
      }

      return { ...prev, [roadmap!.slug]: next };
    });
  }

  return (
    <div className="container max-w-3xl py-14">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-bone">{roadmap.name}</h1>
      <p className="mt-3 text-[14.5px] text-bone-muted">{roadmap.description}</p>

      <HeatBar
        value={progressPct}
        label={`${completedCount} of ${roadmap.milestones.length} milestones cleared`}
        className="mt-6"
      />

      <div className="mt-8 space-y-3">
        {roadmap.milestones.map((m, i) => {
          const isDone = done[i];
          const isOpen = expanded === i;
          return (
            <div key={m.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3 p-4">
                <button
                  onClick={() => toggleMilestone(i)}
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isDone ? "border-tempered-500 bg-tempered-500/20 text-tempered-300" : "border-white/15 text-transparent"
                  )}
                  aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="flex flex-1 items-center justify-between text-left"
                >
                  <span className={cn("text-[14px] font-medium", isDone ? "text-bone-faint line-through" : "text-bone")}>
                    {i + 1}. {m.title}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-bone-muted transition-transform", isOpen && "rotate-180")} />
                </button>
              </div>
              {isOpen && (
                <div className="border-t border-white/[0.06] px-4 py-4 pl-13">
                  <p className="text-[13px] leading-relaxed text-bone-muted">{m.description}</p>
                  {m.resources.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.resources.map((r) => (
                        <span key={r} className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[11px] text-bone-muted">
                          {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
