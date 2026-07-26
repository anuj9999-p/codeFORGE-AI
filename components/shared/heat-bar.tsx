"use client";

import { cn } from "@/lib/utils";

interface HeatBarProps {
  /** 0-100 */
  value: number;
  label?: string;
  className?: string;
  showValue?: boolean;
}

/**
 * The product's signature progress element: unstarted (graphite) -> in
 * progress (ember) -> nearly there (molten gold) -> mastered (tempered blue).
 * Used for XP, category progress, question completion, and streak fill.
 */
export function HeatBar({ value, label, className, showValue = true }: HeatBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-bone-muted">
          {label && <span>{label}</span>}
          {showValue && <span className="font-mono tabular-nums">{Math.round(clamped)}%</span>}
        </div>
      )}
      <div className="heat-bar-track">
        <div
          className="heat-bar-fill"
          style={{
            width: `${clamped}%`,
            backgroundPosition: `${100 - clamped}% 0`,
          }}
        />
      </div>
    </div>
  );
}
