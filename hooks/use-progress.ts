"use client";

import { useEffect, useState, useCallback } from "react";
import { progressService } from "@/services/progress-service";
import { DEFAULT_PROGRESS_STATE, UserProgressState } from "@/types/progress";

export function useProgress() {
  const [state, setState] = useState<UserProgressState>(DEFAULT_PROGRESS_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(progressService.load());
    setHydrated(true);
  }, []);

  const update = useCallback((updater: (prev: UserProgressState) => UserProgressState) => {
    setState((prev) => {
      const next = updater(prev);
      progressService.save(next);
      return next;
    });
  }, []);

  const markComplete = useCallback(
    (questionId: string, category: string) => {
      update((prev) => {
        const existing = prev.questions[questionId];
        const nowCompleted = !(existing?.completed ?? false);
        const xpDelta = nowCompleted ? 10 : -10;

        return {
          ...prev,
          xp: Math.max(0, prev.xp + xpDelta),
          questions: {
            ...prev.questions,
            [questionId]: {
              questionId,
              completed: nowCompleted,
              bookmarked: existing?.bookmarked ?? false,
              favorite: existing?.favorite ?? false,
              notes: existing?.notes ?? "",
              lastAttemptedAt: new Date().toISOString(),
            },
          },
          categories: {
            ...prev.categories,
            [category]: {
              category,
              totalQuestions: prev.categories[category]?.totalQuestions ?? 0,
              completedQuestions: Math.max(
                0,
                (prev.categories[category]?.completedQuestions ?? 0) + (nowCompleted ? 1 : -1)
              ),
            },
          },
        };
      });
    },
    [update]
  );

  const toggleBookmark = useCallback(
    (questionId: string) => {
      update((prev) => {
        const existing = prev.questions[questionId];
        return {
          ...prev,
          questions: {
            ...prev.questions,
            [questionId]: {
              questionId,
              completed: existing?.completed ?? false,
              bookmarked: !(existing?.bookmarked ?? false),
              favorite: existing?.favorite ?? false,
              notes: existing?.notes ?? "",
              lastAttemptedAt: existing?.lastAttemptedAt ?? null,
            },
          },
        };
      });
    },
    [update]
  );

  const toggleFavorite = useCallback(
    (questionId: string) => {
      update((prev) => {
        const existing = prev.questions[questionId];
        return {
          ...prev,
          questions: {
            ...prev.questions,
            [questionId]: {
              questionId,
              completed: existing?.completed ?? false,
              bookmarked: existing?.bookmarked ?? false,
              favorite: !(existing?.favorite ?? false),
              notes: existing?.notes ?? "",
              lastAttemptedAt: existing?.lastAttemptedAt ?? null,
            },
          },
        };
      });
    },
    [update]
  );

  return { progress: state, hydrated, update, markComplete, toggleBookmark, toggleFavorite };
}
