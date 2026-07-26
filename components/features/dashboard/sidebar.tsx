"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  BookOpen,
  Workflow,
  Building2,
  Map,
  Bot,
  Code2,
  StickyNote,
  Trophy,
  Bookmark,
  Settings,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    title: "Learn",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/interview-sheet", label: "Interview Sheet", icon: BookOpen },
      { href: "/visualizer", label: "Visualizer", icon: Workflow },
      { href: "/patterns", label: "Patterns", icon: Code2 },
      { href: "/roadmaps", label: "Roadmaps", icon: Map },
      { href: "/companies", label: "Companies", icon: Building2 },
    ],
  },
  {
    title: "Workspace",
    items: [
      { href: "/assistant", label: "AI Assistant", icon: Bot },
      { href: "/notes", label: "Notes", icon: StickyNote },
      { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
      { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/[0.06] bg-graphite-900 lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-white/[0.06] px-5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-heat-gradient">
          <Flame className="h-4 w-4 text-graphite-950" strokeWidth={2.5} />
        </span>
        <Link href="/" className="font-display text-[15px] font-semibold text-bone">
          CodeForge<span className="text-ember-500">AI</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-bone-faint">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors",
                      active
                        ? "bg-ember-500/10 text-ember-300"
                        : "text-bone-muted hover:bg-white/[0.05] hover:text-bone"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-4">
        <Link
          href="/settings"
          className="flex items-center gap-2 text-[13px] font-medium text-bone-muted hover:text-bone"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}
