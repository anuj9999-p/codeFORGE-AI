import Link from "next/link";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-graphite-950 bg-forge-grid bg-[size:44px_44px] px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-96 -translate-x-1/2 bg-ember-glow" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-heat-gradient">
        <Flame className="h-7 w-7 text-graphite-950" />
      </span>
      <h1 className="relative mt-6 font-display text-5xl font-semibold tracking-tight text-bone">404</h1>
      <p className="relative mt-2 max-w-sm text-[14.5px] text-bone-muted">
        This page cooled off and fell out of the forge. Let's get you back to solid ground.
      </p>
      <Button className="relative mt-6" asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
