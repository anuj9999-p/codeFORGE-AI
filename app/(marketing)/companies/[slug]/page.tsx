"use client";

import { notFound, useParams } from "next/navigation";
import { COMPANIES } from "@/constants/companies";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CompanyDetailPage() {
  const params = useParams<{ slug: string }>();
  const company = COMPANIES.find((c) => c.slug === params.slug);
  if (!company) return notFound();

  return (
    <div className="container max-w-3xl py-14">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-bone">
        {company.name} Interview Prep
      </h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {company.popularTopics.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h3 className="font-display text-[13.5px] font-semibold text-bone">Preparation guide</h3>
            <ul className="mt-3 space-y-2">
              {company.prepGuide.map((g, i) => (
                <li key={i} className="text-[13px] leading-relaxed text-bone-muted">• {g}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-display text-[13.5px] font-semibold text-molten-300">Interview tips</h3>
            <ul className="mt-3 space-y-2">
              {company.interviewTips.map((t, i) => (
                <li key={i} className="text-[13px] leading-relaxed text-bone-muted">• {t}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-bone">Frequently asked</h2>
        <div className="mt-4 space-y-3">
          {company.faqs.map((f) => (
            <div key={f.q} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[13.5px] font-medium text-bone">{f.q}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-bone-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
