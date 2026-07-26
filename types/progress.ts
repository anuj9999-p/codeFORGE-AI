export type Difficulty = "easy" | "medium" | "hard";

export interface QuestionProgress {
  questionId: string;
  completed: boolean;
  bookmarked: boolean;
  favorite: boolean;
  notes: string;
  lastAttemptedAt: string | null;
}

export interface CategoryProgress {
  category: string;
  totalQuestions: number;
  completedQuestions: number;
}

export interface UserProgressState {
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string | null;
  questions: Record<string, QuestionProgress>;
  categories: Record<string, CategoryProgress>;
}

export const DEFAULT_PROGRESS_STATE: UserProgressState = {
  xp: 0,
  level: 1,
  streakDays: 0,
  lastActiveDate: null,
  questions: {},
  categories: {},
};
