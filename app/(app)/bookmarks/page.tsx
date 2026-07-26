"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QuestionCard } from "@/components/features/interview-sheet/question-card";
import { SAMPLE_QUESTIONS } from "@/constants/sample-questions";
import { useProgress } from "@/hooks/use-progress";
import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  const { progress, hydrated } = useProgress();

  const bookmarked = SAMPLE_QUESTIONS.filter((q) => progress.questions[q.id]?.bookmarked);
  const favorited = SAMPLE_QUESTIONS.filter((q) => progress.questions[q.id]?.favorite);
  const completed = SAMPLE_QUESTIONS.filter((q) => progress.questions[q.id]?.completed);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-bone">Bookmarks</h1>
        <p className="text-[13px] text-bone-muted">Everything you've saved for later, in one place.</p>
      </div>

      <Tabs defaultValue="bookmarked">
        <TabsList>
          <TabsTrigger value="bookmarked">Bookmarked ({bookmarked.length})</TabsTrigger>
          <TabsTrigger value="favorited">Favorites ({favorited.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>

        {[
          { key: "bookmarked", data: bookmarked },
          { key: "favorited", data: favorited },
          { key: "completed", data: completed },
        ].map(({ key, data }) => (
          <TabsContent key={key} value={key} className="space-y-3">
            {!hydrated ? null : data.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
                <Bookmark className="h-6 w-6 text-bone-faint" />
                <p className="text-[13.5px] text-bone-muted">Nothing here yet.</p>
              </div>
            ) : (
              data.map((q) => <QuestionCard key={q.id} question={q} />)
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
