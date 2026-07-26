"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Do I need an account to use CodeForge AI?",
    a: "No. Browse the interview sheet, visualizer, patterns, and roadmaps freely. Sign in only when you want your progress, notes, and bookmarks synced across devices.",
  },
  {
    q: "What happens to my progress if I'm not signed in?",
    a: "Everything — completed problems, notes, streaks, XP — is saved locally in your browser. The moment you sign in, it's synchronized automatically to your account.",
  },
  {
    q: "Is the content original?",
    a: "Yes. Every explanation, hint, and interview note is written from scratch for this platform — nothing is copied from proprietary sources.",
  },
  {
    q: "Can I run code in the playground?",
    a: "The Monaco-based playground supports full editing, syntax highlighting, and multi-language snippets today, with execution support planned as a future backend addition.",
  },
  {
    q: "Which AI provider powers the assistant?",
    a: "The assistant is built to be provider-independent, so the underlying model can change without affecting how you use it.",
  },
];

export function FAQ() {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          Frequently asked
        </h2>
      </div>

      <Accordion.Root type="single" collapsible className="mx-auto mt-10 max-w-2xl">
        {FAQS.map((f, i) => (
          <Accordion.Item
            key={f.q}
            value={`item-${i}`}
            className="border-b border-white/[0.06]"
          >
            <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left text-[14.5px] font-medium text-bone">
              {f.q}
              <ChevronDown className="h-4 w-4 shrink-0 text-bone-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
            <Accordion.Content className="overflow-hidden pb-5 text-[13.5px] leading-relaxed text-bone-muted data-[state=open]:animate-fade-up">
              {f.a}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
