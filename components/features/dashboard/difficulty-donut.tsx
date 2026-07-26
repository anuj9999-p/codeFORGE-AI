"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const DATA = [
  { name: "Easy", value: 48, color: "#7DD3FC" },
  { name: "Medium", value: 76, color: "#FF6B35" },
  { name: "Hard", value: 22, color: "#FFB627" },
];

export function DifficultyDonut() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={DATA}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          strokeWidth={0}
        >
          {DATA.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#1C1F26",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            fontSize: 12,
            color: "#F5F3EF",
          }}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 12, color: "#9A9CA5" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
