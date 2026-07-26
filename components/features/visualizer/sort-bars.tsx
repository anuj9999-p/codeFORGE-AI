"use client";

import { SortStep } from "@/lib/algorithms/sorting";

interface SortBarsProps {
  step: SortStep;
}

export function SortBars({ step }: SortBarsProps) {
  const max = Math.max(...step.array, 1);
  const width = 100 / step.array.length;

  return (
    <div className="flex h-72 w-full items-end gap-[2px] rounded-xl border border-white/[0.06] bg-graphite-900 p-4">
      {step.array.map((value, i) => {
        const isComparing = step.comparing.includes(i);
        const isSwapping = step.swapping.includes(i);
        const isSorted = step.sortedIndices.includes(i);

        let color = "bg-graphite-500";
        if (isSorted) color = "bg-tempered-500";
        else if (isSwapping) color = "bg-molten-500";
        else if (isComparing) color = "bg-ember-500";

        return (
          <div
            key={i}
            className={`rounded-t-sm transition-all duration-150 ${color}`}
            style={{
              height: `${(value / max) * 100}%`,
              width: `${width}%`,
            }}
          />
        );
      })}
    </div>
  );
}
