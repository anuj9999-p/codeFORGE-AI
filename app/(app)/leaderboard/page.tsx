"use client";

import { useUser } from "@clerk/nextjs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const GLOBAL = [
  { name: "Elena Petrova", xp: 24850, streak: 142 },
  { name: "Marcus Chen", xp: 22110, streak: 98 },
  { name: "Priya Nair", xp: 19870, streak: 87 },
  { name: "Diego Alvarez", xp: 18420, streak: 61 },
  { name: "Amina Yusuf", xp: 17330, streak: 54 },
  { name: "You", xp: 4210, streak: 12, isMe: true },
];

const STREAK = [...GLOBAL].sort((a, b) => b.streak - a.streak);

function RankRow({ rank, name, value, unit, isMe }: { rank: number; name: string; value: number; unit: string; isMe?: boolean }) {
  const medalColor = rank === 1 ? "text-molten-400" : rank === 2 ? "text-bone-muted" : rank === 3 ? "text-ember-500" : "text-bone-faint";
  return (
    <div className={cn("flex items-center gap-4 rounded-lg border p-3", isMe ? "border-ember-600/40 bg-ember-500/[0.06]" : "border-white/[0.06] bg-white/[0.02]")}>
      <span className={cn("w-6 text-center font-display text-[13px] font-semibold", medalColor)}>{rank}</span>
      <Avatar className="h-8 w-8">
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className={cn("flex-1 text-[13.5px] font-medium", isMe ? "text-ember-300" : "text-bone")}>{name}</span>
      <span className="font-mono text-[13px] text-bone-muted">{value.toLocaleString()} {unit}</span>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-bone">Leaderboard</h1>
        <p className="text-[13px] text-bone-muted">See how your forging compares.</p>
      </div>

      <Tabs defaultValue="global">
        <TabsList>
          <TabsTrigger value="global"><Trophy className="mr-1 h-3.5 w-3.5" />XP Rankings</TabsTrigger>
          <TabsTrigger value="streak"><Flame className="mr-1 h-3.5 w-3.5" />Streak Rankings</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Challenge</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-2">
          {GLOBAL.sort((a, b) => b.xp - a.xp).map((u, i) => (
            <RankRow key={u.name} rank={i + 1} name={u.name} value={u.xp} unit="XP" isMe={u.isMe} />
          ))}
        </TabsContent>

        <TabsContent value="streak" className="space-y-2">
          {STREAK.map((u, i) => (
            <RankRow key={u.name} rank={i + 1} name={u.name} value={u.streak} unit="days" isMe={u.isMe} />
          ))}
        </TabsContent>

        <TabsContent value="friends">
          <Card>
            <CardContent className="p-10 text-center text-[13.5px] text-bone-muted">
              Add friends to see how you stack up against people you know.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card>
            <CardContent className="p-10 text-center text-[13.5px] text-bone-muted">
              This week's challenge leaderboard resets every Monday — check back soon.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
