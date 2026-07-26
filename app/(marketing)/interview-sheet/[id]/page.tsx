"use client";

import { notFound, useParams } from "next/navigation";
import { Clock, Building2, Bookmark, Heart, CheckCircle2, Share2, Download } from "lucide-react";
import { SAMPLE_QUESTIONS } from "@/constants/sample-questions";
import { TOPICS } from "@/constants/topics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/code-block";
import { useProgress } from "@/hooks/use-progress";
import { fireCompletionConfetti } from "@/lib/confetti";
import { toast } from "sonner";

export default function QuestionDetailPage() {
  const params = useParams<{ id: string }>();
  const question = SAMPLE_QUESTIONS.find((q) => q.id === params.id);
  const { progress, markComplete, toggleBookmark, toggleFavorite } = useProgress();

  if (!question) return notFound();

  const topic = TOPICS.find((t) => t.slug === question.topicSlug);
  const completed = progress.questions[question.id]?.completed ?? false;
  const bookmarked = progress.questions[question.id]?.bookmarked ?? false;
  const favorite = progress.questions[question.id]?.favorite ?? false;

  return (
    <div className="container max-w-4xl py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[12.5px] font-medium uppercase tracking-wide text-bone-faint">
            {topic?.name} · {question.pattern}
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-bone sm:text-3xl">
            {question.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Badge variant={question.difficulty}>{question.difficulty}</Badge>
            <span className="flex items-center gap-1 text-[13px] text-bone-muted">
              <Clock className="h-3.5 w-3.5" /> {question.estimatedMinutes} min
            </span>
            <span className="flex items-center gap-1 text-[13px] text-bone-muted">
              <Building2 className="h-3.5 w-3.5" /> {question.companies.join(", ")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Bookmark" onClick={() => toggleBookmark(question.id)}>
            <Bookmark className={bookmarked ? "h-4 w-4 fill-ember-500 text-ember-500" : "h-4 w-4"} />
          </Button>
          <Button variant="outline" size="icon" aria-label="Favorite" onClick={() => toggleFavorite(question.id)}>
            <Heart className={favorite ? "h-4 w-4 fill-ember-500 text-ember-500" : "h-4 w-4"} />
          </Button>
          <Button variant="outline" size="icon" aria-label="Share" onClick={() => toast.success("Link copied")}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Download">
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant={completed ? "default" : "subtle"}
            onClick={() => {
              const willComplete = !completed;
              markComplete(question.id, question.topicSlug);
              if (willComplete) {
                fireCompletionConfetti();
                toast.success("Nice work — +10 XP");
              }
            }}
          >
            <CheckCircle2 className="h-4 w-4" />
            {completed ? "Completed" : "Mark complete"}
          </Button>
        </div>
      </div>

      <p className="mt-6 text-[14.5px] leading-relaxed text-bone-muted">{question.description}</p>

      <Tabs defaultValue="approach" className="mt-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="approach">Approach</TabsTrigger>
          <TabsTrigger value="hints">Hints</TabsTrigger>
          <TabsTrigger value="complexity">Complexity</TabsTrigger>
          <TabsTrigger value="edge-cases">Edge Cases</TabsTrigger>
          <TabsTrigger value="tips">Interview Tips</TabsTrigger>
          <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="approach" className="space-y-5">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h3 className="font-display text-[13.5px] font-semibold text-bone-muted">Brute force</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-bone-muted">{question.bruteForce.summary}</p>
            <p className="mt-2 font-mono text-[12px] text-ember-300">{question.bruteForce.complexity}</p>
          </div>
          <div className="rounded-xl border border-tempered-700/30 bg-tempered-500/[0.04] p-5">
            <h3 className="font-display text-[13.5px] font-semibold text-tempered-300">Optimal solution</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-bone-muted">{question.optimal.summary}</p>
            <p className="mt-2 font-mono text-[12px] text-tempered-300">{question.optimal.complexity}</p>
          </div>
        </TabsContent>

        <TabsContent value="hints">
          <ol className="space-y-3">
            {question.hints.map((h, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-[13.5px] text-bone-muted">
                <span className="font-display font-semibold text-ember-500">{i + 1}</span>
                {h}
              </li>
            ))}
          </ol>
        </TabsContent>

        <TabsContent value="complexity">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-[12px] uppercase tracking-wide text-bone-faint">Brute force</p>
              <p className="mt-1 font-mono text-[13px] text-bone">{question.bruteForce.complexity}</p>
            </div>
            <div className="rounded-xl border border-tempered-700/30 bg-tempered-500/[0.04] p-5">
              <p className="text-[12px] uppercase tracking-wide text-tempered-300">Optimal</p>
              <p className="mt-1 font-mono text-[13px] text-bone">{question.optimal.complexity}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="edge-cases">
          <ul className="space-y-2">
            {question.edgeCases.map((e, i) => (
              <li key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-[13.5px] text-bone-muted">
                {e}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="tips">
          <ul className="space-y-2">
            {question.interviewTips.map((t, i) => (
              <li key={i} className="rounded-lg border border-molten-600/30 bg-molten-500/[0.04] px-4 py-3 text-[13.5px] text-bone-muted">
                {t}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="mistakes">
          <ul className="space-y-2">
            {question.commonMistakes.map((m, i) => (
              <li key={i} className="rounded-lg border border-ember-600/30 bg-ember-500/[0.04] px-4 py-3 text-[13.5px] text-bone-muted">
                {m}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          {question.code.map((c) => (
            <CodeBlock key={c.language} code={c.code} language={c.language} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
