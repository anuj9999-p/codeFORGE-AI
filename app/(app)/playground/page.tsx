"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Download, Copy, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const LANGUAGE_TEMPLATES: Record<string, string> = {
  javascript: `function solve(input) {\n  // your solution here\n  return input;\n}\n`,
  python: `def solve(input):\n    # your solution here\n    return input\n`,
  java: `class Solution {\n    public Object solve(Object input) {\n        // your solution here\n        return input;\n    }\n}\n`,
  cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nauto solve(auto input) {\n    // your solution here\n    return input;\n}\n`,
};

export default function PlaygroundPage() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(LANGUAGE_TEMPLATES.javascript);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [sampleInput, setSampleInput] = useState("");
  const [expected, setExpected] = useState("");
  const [fullscreen, setFullscreen] = useState(false);

  function handleLanguageChange(lang: string) {
    setLanguage(lang);
    setCode(LANGUAGE_TEMPLATES[lang]);
  }

  function handleCopy() {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  }

  function handleDownload() {
    const ext: Record<string, string> = { javascript: "js", python: "py", java: "java", cpp: "cpp" };
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solution.${ext[language]}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={cn("container py-10", fullscreen && "fixed inset-0 z-50 max-w-none bg-graphite-950 py-4")}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-bone">Coding Playground</h1>
          <p className="text-[13px] text-bone-muted">Draft, format, and test your approach before committing to it.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
          <Select value={theme} onValueChange={(v) => setTheme(v as "vs-dark" | "light")}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vs-dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload} aria-label="Download">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setFullscreen((f) => !f)} aria-label="Toggle fullscreen">
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className={cn("grid gap-4", !fullscreen && "lg:grid-cols-[1fr_320px]")}>
        <Card className="overflow-hidden">
          <MonacoEditor
            height={fullscreen ? "calc(100vh - 140px)" : "560px"}
            language={language}
            theme={theme}
            value={code}
            onChange={(v) => setCode(v ?? "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              fontFamily: "var(--font-mono)",
            }}
          />
        </Card>

        {!fullscreen && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <label className="text-[12px] font-medium uppercase tracking-wide text-bone-faint">Sample input</label>
                <Textarea
                  value={sampleInput}
                  onChange={(e) => setSampleInput(e.target.value)}
                  placeholder="[2, 7, 11, 15], target = 9"
                  className="mt-2 min-h-[90px]"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <label className="text-[12px] font-medium uppercase tracking-wide text-bone-faint">Expected output</label>
                <Textarea
                  value={expected}
                  onChange={(e) => setExpected(e.target.value)}
                  placeholder="[0, 1]"
                  className="mt-2 min-h-[90px]"
                />
              </CardContent>
            </Card>
            <p className="text-[11.5px] leading-relaxed text-bone-faint">
              Execution isn't wired up yet — this playground is ready for a future backend to run submissions against your sample input.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
