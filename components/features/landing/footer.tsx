import Link from "next/link";
import { Flame, Github, Twitter, Linkedin } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Interview Sheet", href: "/interview-sheet" },
      { label: "Visualizer", href: "/visualizer" },
      { label: "Patterns", href: "/patterns" },
      { label: "Roadmaps", href: "/roadmaps" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Companies", href: "/companies" },
      { label: "Resources", href: "/resources" },
      { label: "Leaderboard", href: "/leaderboard" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/sign-in" },
      { label: "Sign up", href: "/sign-up" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-14">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display font-semibold">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-heat-gradient">
                <Flame className="h-4 w-4 text-graphite-950" strokeWidth={2.5} />
              </span>
              <span className="text-bone">CodeForge<span className="text-ember-500">AI</span></span>
            </Link>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-bone-muted">
              Forge your future. Master every interview.
            </p>
            <div className="mt-5 flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-bone-muted transition-colors hover:border-white/20 hover:text-bone"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-[13px] font-semibold text-bone">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-bone-muted transition-colors hover:text-bone"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-[12px] text-bone-faint sm:flex-row">
          <span>© {new Date().getFullYear()} CodeForge AI. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-bone-muted">Privacy</Link>
            <Link href="#" className="hover:text-bone-muted">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
