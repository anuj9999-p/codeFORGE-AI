"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email to subscribe.");
      return;
    }
    toast.success("Subscribed. New patterns land in your inbox weekly.");
    setEmail("");
  }

  return (
    <section className="container pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] px-8 py-14 text-center">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 bg-ember-glow" />
        <h2 className="relative font-display text-2xl font-semibold tracking-tight text-bone sm:text-3xl">
          One new pattern, every week
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-[14px] text-bone-muted">
          No spam — just a weekly problem breakdown worth reading before your next loop.
        </p>
        <form onSubmit={handleSubmit} className="relative mx-auto mt-6 flex max-w-sm gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="h-11 flex-1 rounded-lg border border-white/10 bg-graphite-800 px-4 text-sm text-bone placeholder:text-bone-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
