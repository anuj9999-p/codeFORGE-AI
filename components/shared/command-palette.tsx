"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, BookOpen, Workflow, Building2, Map, Code2 } from "lucide-react";
import { SAMPLE_QUESTIONS } from "@/constants/sample-questions";
import { PATTERNS } from "@/constants/patterns";
import { COMPANIES } from "@/constants/companies";
import { ROADMAPS } from "@/constants/roadmaps";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function handleOpenEvent() {
      setOpen(true);
    }
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("codeforge:open-command-palette", handleOpenEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("codeforge:open-command-palette", handleOpenEvent);
    };
  }, []);

  function go(path: string) {
    setOpen(false);
    router.push(path);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.08] bg-graphite-800 shadow-2xl">
        <Command className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-bone-faint">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <Search className="h-4 w-4 text-bone-faint" />
            <Command.Input
              autoFocus
              placeholder="Search questions, patterns, companies, roadmaps…"
              className="flex-1 bg-transparent text-[14px] text-bone placeholder:text-bone-faint focus:outline-none"
            />
            <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-bone-faint">Esc</kbd>
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-6 text-center text-[13px] text-bone-muted">No results found.</Command.Empty>

            <Command.Group heading="Interview Sheet">
              {SAMPLE_QUESTIONS.map((q) => (
                <Command.Item
                  key={q.id}
                  onSelect={() => go(`/interview-sheet/${q.id}`)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] text-bone-muted data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-bone"
                >
                  <BookOpen className="h-3.5 w-3.5" /> {q.title}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Patterns">
              {PATTERNS.map((p) => (
                <Command.Item
                  key={p.slug}
                  onSelect={() => go(`/patterns/${p.slug}`)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] text-bone-muted data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-bone"
                >
                  <Code2 className="h-3.5 w-3.5" /> {p.name}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Companies">
              {COMPANIES.map((c) => (
                <Command.Item
                  key={c.slug}
                  onSelect={() => go(`/companies/${c.slug}`)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] text-bone-muted data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-bone"
                >
                  <Building2 className="h-3.5 w-3.5" /> {c.name}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Roadmaps">
              {ROADMAPS.map((r) => (
                <Command.Item
                  key={r.slug}
                  onSelect={() => go(`/roadmaps/${r.slug}`)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] text-bone-muted data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-bone"
                >
                  <Map className="h-3.5 w-3.5" /> {r.name}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Tools">
              <Command.Item
                onSelect={() => go("/visualizer")}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] text-bone-muted data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-bone"
              >
                <Workflow className="h-3.5 w-3.5" /> Algorithm Visualizer
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
