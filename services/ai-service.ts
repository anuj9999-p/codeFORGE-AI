import { ChatMessage } from "@/types/chat";

/**
 * Provider-agnostic AI service interface. Today this is backed by a local
 * mock generator so the assistant works with zero backend configuration.
 * Swapping in a real provider means implementing `AIProvider` and changing
 * the export at the bottom of this file — no component code needs to change.
 */
export interface AIProvider {
  streamReply(messages: ChatMessage[], onToken: (token: string) => void): Promise<void>;
}

const CANNED_RESPONSES: Record<string, string> = {
  explain:
    "Here's the idea: break the problem into the smallest repeating decision, solve that once, and make sure you're not redoing work you've already done. Paste the specific code or problem you're stuck on and I'll walk through it line by line.",
  debug:
    "Let's isolate it. Share the function and the input that breaks it — I'll trace through the state at each step and point to where it diverges from what you expect.",
  roadmap:
    "Tell me your current comfort level (say, out of the 26 topics on the interview sheet) and your target timeline, and I'll sequence a week-by-week plan that front-loads your weakest patterns.",
  interview:
    "Good interview answers are specific, not just correct — walk me through a recent technical decision you made, and I'll help you tighten it into a story with a clear challenge, action, and measurable result.",
  algorithm:
    "Pick the algorithm and I'll break it into: the invariant it maintains, why that invariant guarantees correctness, and where the time complexity actually comes from — usually the part people memorize without understanding.",
  resume:
    "Paste the bullet points you're unsure about — I'll flag anything vague, unmeasured, or buried, and suggest a version that leads with impact.",
  behavioral:
    "Let's build one STAR story at a time. Start with the situation and task in 2-3 sentences, and I'll help you tighten the action and result.",
  default:
    "I can help you explain code, debug something that's stuck, generate a personalized roadmap, drill interview or behavioral questions, or break down an algorithm. What are you working on?",
};

function pickCannedResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("debug") || lower.includes("stuck") || lower.includes("error")) return CANNED_RESPONSES.debug;
  if (lower.includes("roadmap") || lower.includes("plan")) return CANNED_RESPONSES.roadmap;
  if (lower.includes("interview") && !lower.includes("behavioral")) return CANNED_RESPONSES.interview;
  if (lower.includes("behavioral") || lower.includes("star")) return CANNED_RESPONSES.behavioral;
  if (lower.includes("resume")) return CANNED_RESPONSES.resume;
  if (lower.includes("algorithm") || lower.includes("complexity") || lower.includes("big o")) return CANNED_RESPONSES.algorithm;
  if (lower.includes("explain")) return CANNED_RESPONSES.explain;
  return CANNED_RESPONSES.default;
}

class MockAIProvider implements AIProvider {
  async streamReply(messages: ChatMessage[], onToken: (token: string) => void): Promise<void> {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const full = pickCannedResponse(lastUserMessage?.content ?? "");
    const words = full.split(" ");

    for (const word of words) {
      await new Promise((r) => setTimeout(r, 18));
      onToken(word + " ");
    }
  }
}

export const aiService: AIProvider = new MockAIProvider();
