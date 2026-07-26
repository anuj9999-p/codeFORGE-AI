"use client";

import { Code2, Bug, Map, MessagesSquare, Sparkles, FileText, Users } from "lucide-react";

const PROMPTS = [
  { icon: Code2, label: "Explain code", prompt: "Explain how this piece of code works, step by step." },
  { icon: Bug, label: "Debug code", prompt: "Help me debug why this function isn't returning the right result." },
  { icon: Map, label: "Generate roadmap", prompt: "Generate a study roadmap for me based on my weak topics." },
  { icon: MessagesSquare, label: "Interview help", prompt: "Help me prepare for an upcoming technical interview." },
  { icon: Sparkles, label: "Algorithm explanation", prompt: "Explain the time and space complexity trade-offs of this algorithm." },
  { icon: FileText, label: "Resume feedback", prompt: "Give me feedback on my resume bullet points." },
  { icon: Users, label: "Behavioral questions", prompt: "Drill me on a behavioral interview question using the STAR method." },
];

export function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {PROMPTS.map((p) => (
        <button
          key={p.label}
          onClick={() => onSelect(p.prompt)}
          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-colors hover:bg-white/[0.05]"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-ember-500">
            <p.icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[13.5px] font-medium text-bone">{p.label}</p>
            <p className="text-[12px] text-bone-faint line-clamp-1">{p.prompt}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
