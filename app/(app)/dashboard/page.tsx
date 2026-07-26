"use client";

import Link from "next/link";
import { Flame, Trophy, Clock, BookMarked, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeatBar } from "@/components/shared/heat-bar";
import { WeeklyProgressChart } from "@/components/features/dashboard/weekly-progress-chart";
import { DifficultyDonut } from "@/components/features/dashboard/difficulty-donut";
import { useProgress } from "@/hooks/use-progress";
import { MotivationalQuote } from "@/components/shared/motivational-quote";

const STAT_CARDS = [
  { icon: Flame, label: "Daily streak", value: "12 days", accent: "text-ember-500" },
  { icon: Trophy, label: "Current level", value: "Journeyman", accent: "text-molten-500" },
  { icon: Clock, label: "Learning time", value: "34.5 hrs", accent: "text-tempered-500" },
  { icon: BookMarked, label: "Bookmarks", value: "18 saved", accent: "text-ember-500" },
];

const CATEGORY_PROGRESS = [
  { name: "Arrays & Strings", value: 82 },
  { name: "Trees & Graphs", value: 54 },
  { name: "Dynamic Programming", value: 31 },
  { name: "Sliding Window", value: 68 },
];

const RECOMMENDED = [
  { title: "Longest Substring Without Repeating Characters", difficulty: "medium", pattern: "Sliding Window" },
  { title: "Course Schedule", difficulty: "medium", pattern: "Topological Sort" },
  { title: "Median of Two Sorted Arrays", difficulty: "hard", pattern: "Binary Search" },
];

export default function DashboardPage() {
  const { progress, hydrated } = useProgress();

  return (
    <div className="space-y-6">
      <MotivationalQuote />

      {/* XP + streak banner */}
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <p className="text-[13px] text-bone-muted">Overall mastery</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-bone">
                {hydrated ? progress.xp : 0} XP
              </span>
              <span className="text-[13px] text-bone-faint">to next level</span>
            </div>
            <HeatBar value={62} className="mt-4 max-w-md" showValue={false} />
          </div>
          <Link
            href="/interview-sheet"
            className="inline-flex items-center gap-1.5 whitespace-nowrap font-display text-[13.5px] font-medium text-ember-400 hover:text-ember-300"
          >
            Resume learning <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </Card>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CARDS.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] ${s.accent}`}>
                <s.icon className="h-4.5 w-4.5" />
              </div>
              <p className="font-display text-lg font-semibold text-bone">{s.value}</p>
              <p className="text-[12.5px] text-bone-muted">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly progress</CardTitle>
            <CardDescription>Problems solved over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <WeeklyProgressChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Difficulty distribution</CardTitle>
            <CardDescription>Across all solved problems</CardDescription>
          </CardHeader>
          <CardContent>
            <DifficultyDonut />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category progress</CardTitle>
            <CardDescription>How tempered each topic is</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {CATEGORY_PROGRESS.map((c) => (
              <HeatBar key={c.name} label={c.name} value={c.value} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended next</CardTitle>
            <CardDescription>Picked from your weakest categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECOMMENDED.map((q) => (
              <Link
                key={q.title}
                href="/interview-sheet"
                className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.05]"
              >
                <div>
                  <p className="text-[13.5px] font-medium text-bone">{q.title}</p>
                  <p className="mt-0.5 text-[12px] text-bone-faint">{q.pattern}</p>
                </div>
                <span
                  className={
                    q.difficulty === "hard"
                      ? "rounded-full bg-molten-500/10 px-2.5 py-1 text-[11px] font-medium text-molten-300"
                      : "rounded-full bg-ember-500/10 px-2.5 py-1 text-[11px] font-medium text-ember-300"
                  }
                >
                  {q.difficulty}
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
