"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HeatBar } from "@/components/shared/heat-bar";
import { useProgress } from "@/hooks/use-progress";
import { Flame, Trophy, Award, Calendar } from "lucide-react";

const ACHIEVEMENTS = [
  { name: "First Blood", desc: "Solved your first problem", earned: true },
  { name: "Week Warrior", desc: "7-day streak", earned: true },
  { name: "Pattern Master", desc: "Completed a full pattern track", earned: false },
  { name: "Century Club", desc: "100 problems solved", earned: false },
];

export default function ProfilePage() {
  const { user } = useUser();
  const { progress, hydrated } = useProgress();

  const completedCount = Object.values(progress.questions).filter((q) => q.completed).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? "User"} />
            <AvatarFallback>{user?.firstName?.charAt(0) ?? "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="font-display text-xl font-semibold text-bone">{user?.fullName ?? "Your name"}</h1>
            <p className="text-[13px] text-bone-muted">{user?.primaryEmailAddress?.emailAddress}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge variant="ember">Journeyman</Badge>
              <Badge variant="molten">{hydrated ? progress.xp : 0} XP</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <Flame className="h-5 w-5 text-ember-500" />
            <div>
              <p className="font-display text-lg font-semibold text-bone">12 days</p>
              <p className="text-[12px] text-bone-muted">Current streak</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <Trophy className="h-5 w-5 text-molten-500" />
            <div>
              <p className="font-display text-lg font-semibold text-bone">{completedCount}</p>
              <p className="text-[12px] text-bone-muted">Problems solved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <Award className="h-5 w-5 text-tempered-500" />
            <div>
              <p className="font-display text-lg font-semibold text-bone">
                {ACHIEVEMENTS.filter((a) => a.earned).length}/{ACHIEVEMENTS.length}
              </p>
              <p className="text-[12px] text-bone-muted">Achievements</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Level progress</CardTitle>
        </CardHeader>
        <CardContent>
          <HeatBar value={62} label="Journeyman → Smith" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements & badges</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.name}
              className={`flex items-center gap-3 rounded-lg border p-3 ${
                a.earned ? "border-molten-600/30 bg-molten-500/[0.04]" : "border-white/[0.06] bg-white/[0.02] opacity-60"
              }`}
            >
              <Award className={`h-5 w-5 ${a.earned ? "text-molten-400" : "text-bone-faint"}`} />
              <div>
                <p className="text-[13px] font-medium text-bone">{a.name}</p>
                <p className="text-[11.5px] text-bone-muted">{a.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Learning calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(26,minmax(0,1fr))]">
            {Array.from({ length: 91 }).map((_, i) => {
              const intensity = Math.random();
              const bg =
                intensity > 0.75 ? "bg-tempered-500" : intensity > 0.5 ? "bg-molten-500" : intensity > 0.25 ? "bg-ember-500/60" : "bg-graphite-700";
              return <div key={i} className={`h-3 w-3 rounded-sm ${bg}`} />;
            })}
          </div>
          <p className="mt-3 text-[11.5px] text-bone-faint">Last 91 days of activity</p>
        </CardContent>
      </Card>
    </div>
  );
}
