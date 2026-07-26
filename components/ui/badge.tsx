import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium font-display tracking-tight",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/[0.04] text-bone-muted",
        ember: "border-ember-600/40 bg-ember-500/10 text-ember-300",
        molten: "border-molten-600/40 bg-molten-500/10 text-molten-300",
        tempered: "border-tempered-700/40 bg-tempered-500/10 text-tempered-300",
        // Difficulty maps 1:1 onto the heat scale used across the product
        easy: "border-tempered-700/40 bg-tempered-500/10 text-tempered-300",
        medium: "border-ember-600/40 bg-ember-500/10 text-ember-300",
        hard: "border-molten-600/40 bg-molten-500/10 text-molten-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
