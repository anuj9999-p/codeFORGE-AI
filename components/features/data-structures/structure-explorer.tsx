"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";

interface StructureExplorerProps {
  mode: "stack" | "queue" | "array";
}

export function StructureExplorer({ mode }: StructureExplorerProps) {
  const [items, setItems] = useState<number[]>([12, 45, 7, 89]);
  const [value, setValue] = useState("");

  function addValue() {
    const n = Number(value);
    if (Number.isNaN(n)) return;
    if (mode === "stack") setItems((prev) => [...prev, n]);
    else if (mode === "queue") setItems((prev) => [...prev, n]);
    else setItems((prev) => [...prev, n]);
    setValue("");
  }

  function removeValue() {
    if (mode === "stack") setItems((prev) => prev.slice(0, -1));
    else if (mode === "queue") setItems((prev) => prev.slice(1));
    else setItems((prev) => prev.slice(0, -1));
  }

  const labels: Record<string, { add: string; remove: string; addComplexity: string; removeComplexity: string }> = {
    stack: { add: "Push", remove: "Pop", addComplexity: "O(1)", removeComplexity: "O(1)" },
    queue: { add: "Enqueue", remove: "Dequeue", addComplexity: "O(1)", removeComplexity: "O(1)" },
    array: { add: "Push", remove: "Pop", addComplexity: "O(1) amortized", removeComplexity: "O(1)" },
  };

  const l = labels[mode];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          className="w-28"
          onKeyDown={(e) => e.key === "Enter" && addValue()}
        />
        <Button size="sm" onClick={addValue}>{l.add}</Button>
        <Button size="sm" variant="outline" onClick={removeValue}>{l.remove}</Button>
        <span className="ml-auto font-mono text-[12px] text-bone-faint">
          {l.add}: {l.addComplexity} · {l.remove}: {l.removeComplexity}
        </span>
      </div>

      <div className="flex min-h-[140px] items-end gap-2 rounded-xl border border-white/[0.06] bg-graphite-900 p-5">
        {mode === "stack" ? (
          <div className="flex flex-col-reverse gap-1.5">
            <AnimatePresence initial={false}>
              {items.map((it, i) => (
                <motion.div
                  key={`${it}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex h-10 w-32 items-center justify-center rounded-lg border border-ember-600/30 bg-ember-500/10 font-mono text-[13px] text-ember-300"
                >
                  {it}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            <AnimatePresence initial={false}>
              {items.map((it, i) => (
                <motion.div
                  key={`${it}-${i}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex h-10 w-14 items-center justify-center rounded-lg border border-tempered-700/30 bg-tempered-500/10 font-mono text-[13px] text-tempered-300"
                >
                  {it}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        {items.length === 0 && <p className="text-[12.5px] text-bone-faint">Empty — add a value above.</p>}
      </div>
    </div>
  );
}
