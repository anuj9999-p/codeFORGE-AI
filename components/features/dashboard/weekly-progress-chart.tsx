"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const DATA = [
  { day: "Mon", solved: 2 },
  { day: "Tue", solved: 4 },
  { day: "Wed", solved: 1 },
  { day: "Thu", solved: 5 },
  { day: "Fri", solved: 3 },
  { day: "Sat", solved: 6 },
  { day: "Sun", solved: 4 },
];

export function WeeklyProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={DATA} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="emberFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="day" stroke="#5C606B" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#5C606B" fontSize={12} tickLine={false} axisLine={false} width={24} />
        <Tooltip
          contentStyle={{
            background: "#1C1F26",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            fontSize: 12,
            color: "#F5F3EF",
          }}
        />
        <Area
          type="monotone"
          dataKey="solved"
          stroke="#FF6B35"
          strokeWidth={2}
          fill="url(#emberFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
