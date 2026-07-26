"use client";

import { Search, Bell } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export function DashboardTopbar() {
  const { user } = useUser();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.06] bg-graphite-950/80 px-6 backdrop-blur-xl lg:pl-8">
      <div>
        <p className="font-display text-[15px] font-semibold text-bone">
          {greeting}{user?.firstName ? `, ${user.firstName}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => window.dispatchEvent(new Event("codeforge:open-command-palette"))}
          className="hidden items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-bone-faint md:flex"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="text-[13px]">Search…</span>
          <kbd className="ml-6 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-bone-muted hover:text-bone">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-ember-500" />
        </button>
      </div>
    </header>
  );
}
