"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen items-center justify-center bg-graphite-950 px-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ember-500/10 text-ember-500">
            <AlertTriangle className="h-7 w-7" />
          </span>
          <h1 className="font-display text-xl font-semibold text-bone">Something overheated</h1>
          <p className="max-w-sm text-[13.5px] text-bone-muted">
            An unexpected error occurred. You can try again, or head back to the dashboard.
          </p>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
