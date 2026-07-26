import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium font-display tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-ember-500 text-graphite-950 shadow-[0_0_0_1px_rgba(255,107,53,0.4),0_8px_24px_-8px_rgba(255,107,53,0.55)] hover:bg-ember-300 hover:shadow-[0_0_0_1px_rgba(255,107,53,0.6),0_10px_28px_-6px_rgba(255,107,53,0.7)] active:scale-[0.98]",
        outline:
          "border border-white/10 bg-white/[0.02] text-bone hover:bg-white/[0.06] hover:border-white/20",
        ghost: "text-bone-muted hover:text-bone hover:bg-white/[0.06]",
        subtle: "bg-graphite-700 text-bone hover:bg-graphite-600",
        link: "text-ember-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3.5 text-[13px]",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
