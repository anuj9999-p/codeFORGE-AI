"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { PATTERNS } from "@/constants/patterns";
import { SAMPLE_QUESTIONS } from "@/constants/sample-questions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Lightbulb } from "lucide-react";

export default function PatternDetailPage() {
  const params = useParams<{ slug: string }>();
  const pattern = PATTERNS.find((p) => p.slug === params.slug);
  if (!pattern) return notFound();

  const practiceQuestions = SAMPLE_QUESTIONS.filter((q) =>
    pattern.practiceQuestionIds.includes(q.id)
  );

  return (
    <div className="container max-w-3xl py-14">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-bone">{pattern.name}</h1>
      <p className="mt-4 text-[14.5px] leading-relaxed text-bone-muted">{pattern.theory}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h3 className="flex items-center gap-2 font-display text-[13.5px] font-semibold text-tempered-300">
              <Lightbulb className="h-4 w-4" /> When to use it
            </h3>
            <ul className="mt-3 space-y-2">
              {pattern.whenToUse.map((w, i) => (
                <li key={i} className="text-[13px] leading-relaxed text-bone-muted">• {w}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="flex items-center gap-2 font-display text-[13.5px] font-semibold text-ember-300">
              <AlertTriangle className="h-4 w-4" /> Common mistakes
            </h3>
            <ul className="mt-3 space-y-2">
              {pattern.mistakes.map((m, i) => (
                <li key={i} className="text-[13px] leading-relaxed text-bone-muted">• {m}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-bone">Practice questions</h2>
        <div className="mt-4 space-y-2">
          {practiceQuestions.length === 0 ? (
            <p className="text-[13.5px] text-bone-muted">More practice questions for this pattern are being forged.</p>
          ) : (
            practiceQuestions.map((q) => (
              <Link
                key={q.id}
                href={`/interview-sheet/${q.id}`}
                className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 hover:bg-white/[0.05]"
              >
                <span className="text-[13.5px] font-medium text-bone">{q.title}</span>
                <Badge variant={q.difficulty}>{q.difficulty}</Badge>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
