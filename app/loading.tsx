import { Flame } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite-950">
      <div className="flex flex-col items-center gap-3">
        <span className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-heat-gradient">
          <Flame className="h-6 w-6 text-graphite-950" />
        </span>
        <span className="font-mono text-[12px] text-bone-faint">forging…</span>
      </div>
    </div>
  );
}
