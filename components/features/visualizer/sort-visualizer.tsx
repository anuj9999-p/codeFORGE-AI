"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SortBars } from "./sort-bars";
import { CodeBlock } from "@/components/shared/code-block";
import { SORT_ALGORITHMS, SortAlgorithmKey } from "@/lib/algorithms/sorting";

const SORT_CODE: Record<SortAlgorithmKey, string> = {
  bubble: `for (let i = 0; i < n; i++) {\n  for (let j = 0; j < n - i - 1; j++) {\n    if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);\n  }\n}`,
  selection: `for (let i = 0; i < n; i++) {\n  let minIdx = i;\n  for (let j = i + 1; j < n; j++) {\n    if (arr[j] < arr[minIdx]) minIdx = j;\n  }\n  swap(arr, i, minIdx);\n}`,
  insertion: `for (let i = 1; i < n; i++) {\n  let j = i;\n  while (j > 0 && arr[j - 1] > arr[j]) {\n    swap(arr, j - 1, j);\n    j--;\n  }\n}`,
  merge: `function mergeSort(arr, lo, hi) {\n  if (lo >= hi) return;\n  const mid = (lo + hi) >> 1;\n  mergeSort(arr, lo, mid);\n  mergeSort(arr, mid + 1, hi);\n  merge(arr, lo, mid, hi);\n}`,
  quick: `function quickSort(arr, lo, hi) {\n  if (lo < hi) {\n    const p = partition(arr, lo, hi);\n    quickSort(arr, lo, p - 1);\n    quickSort(arr, p + 1, hi);\n  }\n}`,
};

function randomArray(size = 24) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

export function SortVisualizer() {
  const [algo, setAlgo] = useState<SortAlgorithmKey>("bubble");
  const [input, setInput] = useState<number[]>(() => randomArray());
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const steps = useMemo(() => SORT_ALGORITHMS[algo].fn(input), [algo, input]);
  const step = steps[Math.min(stepIndex, steps.length - 1)];

  useEffect(() => {
    setStepIndex(0);
    setPlaying(false);
  }, [algo, input]);

  useEffect(() => {
    if (!playing) return;
    if (stepIndex >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => setStepIndex((i) => i + 1), 400 / speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, stepIndex, steps.length, speed]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={algo} onValueChange={(v) => setAlgo(v as SortAlgorithmKey)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SORT_ALGORITHMS).map(([key, a]) => (
              <SelectItem key={key} value={key}>{a.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={() => setInput(randomArray())}>
          <Shuffle className="h-3.5 w-3.5" /> Random input
        </Button>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={() => setStepIndex((i) => Math.max(0, i - 1))} aria-label="Previous step">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
            aria-label="Next step"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setStepIndex(0)} aria-label="Restart">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <SortBars step={step} />

      <div className="flex items-center justify-between text-[12.5px] text-bone-muted">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ember-500" /> Comparing</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-molten-500" /> Swapping</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-tempered-500" /> Sorted</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Speed</span>
          {[0.5, 1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`rounded-md px-2 py-0.5 font-mono text-[11px] ${speed === s ? "bg-ember-500 text-graphite-950" : "bg-white/[0.04] text-bone-muted"}`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="code">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="complexity">Complexity</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          <CodeBlock code={SORT_CODE[algo]} language="javascript" />
        </TabsContent>
        <TabsContent value="complexity">
          <p className="font-mono text-[13px] text-tempered-300">{SORT_ALGORITHMS[algo].complexity}</p>
        </TabsContent>
        <TabsContent value="applications">
          <p className="text-[13.5px] text-bone-muted">{SORT_ALGORITHMS[algo].applications}</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
