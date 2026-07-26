"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X, Flame, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/interview-sheet", label: "Interview Sheet" },
  { href: "/visualizer", label: "Visualizer" },
  { href: "/data-structures", label: "Data Structures" },
  { href: "/patterns", label: "Patterns" },
  { href: "/companies", label: "Companies" },
  { href: "/roadmaps", label: "Roadmaps" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-graphite-950/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-semibold tracking-tight">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-heat-gradient">
            <Flame className="h-4 w-4 text-graphite-950" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] text-bone">CodeForge<span className="text-ember-500">AI</span></span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3.5 py-2 text-[13.5px] font-medium text-bone-muted transition-colors hover:bg-white/[0.05] hover:text-bone"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => window.dispatchEvent(new Event("codeforge:open-command-palette"))}
            className="flex h-9 w-9 items-center justify-center rounded-md text-bone-muted hover:bg-white/[0.05] hover:text-bone"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <SignedOut>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Start forging</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-bone lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/[0.06] transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <div className="container flex flex-col gap-1 py-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-bone-muted hover:bg-white/[0.05] hover:text-bone"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-white/[0.06] pt-3">
            <SignedOut>
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link href="/sign-up">Start forging</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button size="sm" className="flex-1" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
