"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const LANGUAGE_MAP: Record<string, string> = {
  javascript: "javascript",
  python: "python",
  java: "java",
  cpp: "cpp",
};

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy — try selecting the code manually.");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.06]">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-graphite-800 px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wide text-bone-faint">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] text-bone-muted hover:bg-white/[0.06] hover:text-bone"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-tempered-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={LANGUAGE_MAP[language] ?? "javascript"}
        style={oneDark}
        customStyle={{
          margin: 0,
          background: "#101218",
          padding: "1.1rem",
          fontSize: "13px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
