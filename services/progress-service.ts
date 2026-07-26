import { DEFAULT_PROGRESS_STATE, UserProgressState } from "@/types/progress";

const STORAGE_KEY = "codeforge:progress:v1";

/**
 * All progress lives in localStorage by default — no backend required.
 * This is the single choke point for reading/writing progress, so a future
 * sync-to-account layer (via Clerk-authenticated calls) can be added here
 * without touching any component code.
 */
export const progressService = {
  load(): UserProgressState {
    if (typeof window === "undefined") return DEFAULT_PROGRESS_STATE;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_PROGRESS_STATE;
      return { ...DEFAULT_PROGRESS_STATE, ...JSON.parse(raw) } as UserProgressState;
    } catch {
      return DEFAULT_PROGRESS_STATE;
    }
  },

  save(state: UserProgressState): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  reset(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
  },
};
