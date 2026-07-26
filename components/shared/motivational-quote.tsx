"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const QUOTES = [
  "The obstacle in the path becomes the path. Never forget, within every obstacle is an opportunity to improve our condition.",
  "Discipline equals freedom — the more structured your prep, the more room you have to think clearly under pressure.",
  "You don't need to be the smartest person in the room. You need to be the one who's practiced the most deliberately.",
  "Every optimal solution was once a brute force someone was brave enough to improve.",
  "Consistency tempers skill the way heat tempers steel — a little, applied repeatedly, changes the structure.",
];

export function MotivationalQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * QUOTES.length));
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 12000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <Quote className="mt-0.5 h-4 w-4 shrink-0 text-ember-500" />
      <p className="text-[13px] italic leading-relaxed text-bone-muted">{QUOTES[index]}</p>
    </div>
  );
}
