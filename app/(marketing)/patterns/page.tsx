import Link from "next/link";
import { PATTERNS } from "@/constants/patterns";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function PatternsPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          Coding Patterns
        </h1>
        <p className="mt-3 text-[15px] text-bone-muted">
          Interviews test 12-ish patterns wearing hundreds of different costumes. Learn the pattern, recognize it anywhere.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PATTERNS.map((p) => (
          <Link key={p.slug} href={`/patterns/${p.slug}`}>
            <Card className="h-full transition-colors hover:bg-white/[0.05]">
              <CardContent className="flex h-full flex-col p-5">
                <h3 className="font-display text-[15px] font-semibold text-bone">{p.name}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-bone-muted line-clamp-3">
                  {p.theory}
                </p>
                <span className="mt-4 flex items-center gap-1 text-[12.5px] font-medium text-ember-400">
                  Learn the pattern <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
