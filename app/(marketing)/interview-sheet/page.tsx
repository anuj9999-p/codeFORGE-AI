"use client";

import { useMemo, useState } from "react";
import { TOPICS } from "@/constants/topics";
import { SAMPLE_QUESTIONS } from "@/constants/sample-questions";
import { QuestionCard } from "@/components/features/interview-sheet/question-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Difficulty } from "@/types/progress";

const DIFFICULTIES: (Difficulty | "all")[] = ["all", "easy", "medium", "hard"];

export default function InterviewSheetPage() {
  const [activeTopic, setActiveTopic] = useState<string>("all");
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | "all">("all");

  const filtered = useMemo(() => {
    return SAMPLE_QUESTIONS.filter((q) => {
      const topicMatch = activeTopic === "all" || q.topicSlug === activeTopic;
      const difficultyMatch = activeDifficulty === "all" || q.difficulty === activeDifficulty;
      return topicMatch && difficultyMatch;
    });
  }, [activeTopic, activeDifficulty]);

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of SAMPLE_QUESTIONS) counts[q.topicSlug] = (counts[q.topicSlug] ?? 0) + 1;
    return counts;
  }, []);

  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          The Interview Sheet
        </h1>
        <p className="mt-3 text-[15px] text-bone-muted">
          26 topics, structured from first pattern to hardest edge case. Original explanations — nothing copied.
        </p>
      </div>

      <div className="mt-10 flex justify-center gap-2">
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDifficulty(d)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-[13px] font-medium capitalize transition-colors",
              activeDifficulty === d
                ? "border-ember-600/40 bg-ember-500/10 text-ember-300"
                : "border-white/[0.06] text-bone-muted hover:bg-white/[0.04]"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            <button
              onClick={() => setActiveTopic("all")}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13.5px] font-medium",
                activeTopic === "all" ? "bg-ember-500/10 text-ember-300" : "text-bone-muted hover:bg-white/[0.05]"
              )}
            >
              All topics
              <span className="font-mono text-[11px] text-bone-faint">{SAMPLE_QUESTIONS.length}</span>
            </button>
            {TOPICS.map((t) => (
              <button
                key={t.slug}
                onClick={() => setActiveTopic(t.slug)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13.5px] font-medium",
                  activeTopic === t.slug
                    ? "bg-ember-500/10 text-ember-300"
                    : "text-bone-muted hover:bg-white/[0.05]"
                )}
              >
                {t.name}
                <span className="font-mono text-[11px] text-bone-faint">{topicCounts[t.slug] ?? 0}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center">
              <p className="text-[14px] text-bone-muted">
                No problems here yet for this filter combination — more are being forged.
              </p>
            </div>
          ) : (
            filtered.map((q) => <QuestionCard key={q.id} question={q} />)
          )}
        </div>
      </div>
    </div>
  );
}
