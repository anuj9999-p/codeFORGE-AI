import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Video, FileText, Link as LinkIcon } from "lucide-react";

const RESOURCES = [
  { icon: BookOpen, title: "Big-O Cheat Sheet", desc: "A one-page reference for time and space complexity of common operations and data structures.", type: "Guide" },
  { icon: Video, title: "Whiteboard Communication", desc: "How to narrate your thought process clearly without over-explaining or under-explaining.", type: "Video" },
  { icon: FileText, title: "System Design Primer", desc: "Foundational concepts for system design rounds — load balancing, caching, database sharding.", type: "Guide" },
  { icon: LinkIcon, title: "Mock Interview Checklist", desc: "A pre-interview checklist covering environment setup, common pitfalls, and mental warm-up.", type: "Checklist" },
  { icon: BookOpen, title: "Behavioral Story Bank Template", desc: "A structured template for building STAR-format stories ahead of time.", type: "Template" },
  { icon: Video, title: "Debugging Under Pressure", desc: "Techniques for staying calm and methodical when your solution breaks live in an interview.", type: "Video" },
];

export default function ResourcesPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">Resources</h1>
        <p className="mt-3 text-[15px] text-bone-muted">
          Supplementary guides, checklists, and references to round out your prep.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => (
          <Card key={r.title} className="transition-colors hover:bg-white/[0.05]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-ember-500">
                  <r.icon className="h-4.5 w-4.5" />
                </span>
                <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[11px] text-bone-muted">{r.type}</span>
              </div>
              <h3 className="mt-3 font-display text-[14.5px] font-semibold text-bone">{r.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-bone-muted">{r.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
