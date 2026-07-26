import Link from "next/link";
import { COMPANIES } from "@/constants/companies";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

const DIFFICULTY_VARIANT: Record<string, "easy" | "medium" | "hard"> = {
  "easy-medium": "easy",
  medium: "medium",
  "medium-hard": "medium",
  hard: "hard",
};

export default function CompaniesPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          Company Preparation
        </h1>
        <p className="mt-3 text-[15px] text-bone-muted">
          Every loop asks something a little different. Prep for the one you actually have.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMPANIES.map((c) => (
          <Link key={c.slug} href={`/companies/${c.slug}`}>
            <Card className="h-full transition-colors hover:bg-white/[0.05]">
              <CardContent className="flex h-full flex-col p-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-bone-muted">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-[15px] font-semibold text-bone">{c.name}</h3>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.popularTopics.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[11px] text-bone-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <Badge variant={DIFFICULTY_VARIANT[c.difficulty]}>{c.difficulty.replace("-", " to ")}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
