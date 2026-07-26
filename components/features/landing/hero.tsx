"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CODE_LINES = [
  { t: "function", c: "text-tempered-300" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-forge-grid bg-[size:44px_44px] opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 bg-ember-glow" />

      {/* ambient rising sparks */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 hidden justify-center gap-24 md:flex">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1 w-1 rounded-full bg-molten-300 animate-spark-rise"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}
      </div>

      <div className="container relative flex flex-col items-center pb-20 pt-20 text-center md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="ember" className="mb-6">
            <Circle className="h-1.5 w-1.5 fill-current" />
            500+ problems · 20+ companies · one AI mentor
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-bone sm:text-5xl md:text-6xl"
        >
          Forge your future.
          <br />
          <span className="bg-heat-gradient bg-clip-text text-transparent">
            Master every interview.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 max-w-xl text-balance text-[15px] leading-relaxed text-bone-muted md:text-base"
        >
          Structured DSA sheets, interactive algorithm visualizations, and
          company-specific prep — tempered into one platform, with an AI
          assistant that never leaves your side.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Button size="lg" asChild>
            <Link href="/sign-up">
              Start forging free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/interview-sheet">Browse interview sheet</Link>
          </Button>
        </motion.div>

        {/* Signature visual: a live "forging" editor, not a generic stat block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mt-16 w-full max-w-3xl"
        >
          <div className="glass-panel overflow-hidden rounded-2xl text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ember-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-molten-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-tempered-500/70" />
              </div>
              <span className="font-mono text-[11px] text-bone-faint">two-sum.ts</span>
              <Badge variant="easy">Easy · Hash Map</Badge>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-relaxed text-bone-muted md:text-[13.5px]">
<code>
<span className="text-tempered-300">function</span> <span className="text-molten-300">twoSum</span>(nums<span className="text-bone-faint">:</span> <span className="text-tempered-300">number</span>[], target<span className="text-bone-faint">:</span> <span className="text-tempered-300">number</span>) {"{"}
{"\n"}  <span className="text-tempered-300">const</span> seen = <span className="text-tempered-300">new</span> Map<span className="text-bone-faint">&lt;</span>number, number<span className="text-bone-faint">&gt;</span>();
{"\n"}  <span className="text-tempered-300">for</span> (<span className="text-tempered-300">let</span> i = 0; i {"<"} nums.length; i++) {"{"}
{"\n"}    <span className="text-tempered-300">const</span> need = target - nums[i];
{"\n"}    <span className="text-tempered-300">if</span> (seen.has(need)) <span className="text-tempered-300">return</span> [seen.get(need), i];
{"\n"}    seen.set(nums[i], i);
{"\n"}  {"}"}
{"\n"}{"}"}
</code>
            </pre>
            <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
              <span className="font-mono text-[11px] text-bone-faint">O(n) time · O(n) space</span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-flicker rounded-full bg-molten-500" />
                <span className="font-mono text-[11px] text-molten-300">tempering solution…</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
