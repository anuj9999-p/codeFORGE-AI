"use client";

import Link from "next/link";
import { Clock, Bookmark, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types/question";
import { cn } from "@/lib/utils";

export function QuestionCard({ question }: { question: Question }) {
  return (
    <Link
      href={`/interview-sheet/${question.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.05] sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-display text-[14.5px] font-medium text-bone group-hover:text-ember-300">
            {question.title}
          </h3>
          <Badge variant={question.difficulty}>{question.difficulty}</Badge>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-bone-muted">
          <span>{question.pattern}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {question.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <Building2 className="h-3 w-3" /> {question.companies.slice(0, 2).join(", ")}
            {question.companies.length > 2 ? ` +${question.companies.length - 2}` : ""}
          </span>
        </div>
      </div>
      <button
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] text-bone-faint hover:text-ember-400"
        )}
        onClick={(e) => e.preventDefault()}
        aria-label="Bookmark"
      >
        <Bookmark className="h-4 w-4" />
      </button>
    </Link>
  );
}
