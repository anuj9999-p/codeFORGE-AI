import { Difficulty } from "./progress";

export interface CodeSnippet {
  language: "cpp" | "java" | "python" | "javascript";
  code: string;
}

export interface Question {
  id: string;
  title: string;
  difficulty: Difficulty;
  topicSlug: string;
  companies: string[];
  pattern: string;
  estimatedMinutes: number;
  description: string;
  hints: string[];
  bruteForce: { summary: string; complexity: string };
  optimal: { summary: string; complexity: string };
  edgeCases: string[];
  interviewTips: string[];
  commonMistakes: string[];
  code: CodeSnippet[];
}
