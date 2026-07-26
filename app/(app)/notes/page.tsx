"use client";

import { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Plus, Pin, Trash2, Download, Upload, Search, Eye, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNotes } from "@/hooks/use-notes";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function NotesPage() {
  const { notes, createNote, updateNote, deleteNote, togglePin, exportNotes, importNotes } = useNotes();
  const [activeId, setActiveId] = useState<string | null>(notes[0]?.id ?? null);
  const [query, setQuery] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const active = notes.find((n) => n.id === activeId);

  const filtered = useMemo(() => {
    const sorted = [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned));
    if (!query.trim()) return sorted;
    const q = query.toLowerCase();
    return sorted.filter(
      (n) => n.title.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [notes, query]);

  function handleCreate() {
    const id = createNote();
    setActiveId(id);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const ok = importNotes(String(reader.result));
      toast[ok ? "success" : "error"](ok ? "Notes imported" : "Couldn't parse that file");
    };
    reader.readAsText(file);
  }

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-[280px_1fr]">
      <div className="flex flex-col border-r border-white/[0.06]">
        <div className="space-y-2 p-3">
          <Button size="sm" className="w-full" onClick={handleCreate}>
            <Plus className="h-4 w-4" /> New note
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-bone-faint" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes or tags…" className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={exportNotes}>
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={handleImportClick}>
              <Upload className="h-3.5 w-3.5" /> Import
            </Button>
            <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleFileChange} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-3">
          {filtered.length === 0 ? (
            <p className="px-2 py-6 text-center text-[12.5px] text-bone-faint">No notes yet.</p>
          ) : (
            filtered.map((n) => (
              <button
                key={n.id}
                onClick={() => setActiveId(n.id)}
                className={cn(
                  "mb-1 flex w-full flex-col gap-1 rounded-lg px-3 py-2.5 text-left transition-colors",
                  activeId === n.id ? "bg-ember-500/10" : "hover:bg-white/[0.05]"
                )}
              >
                <div className="flex items-center gap-1.5">
                  {n.pinned && <Pin className="h-3 w-3 shrink-0 text-molten-500" />}
                  <span className={cn("truncate text-[13.5px] font-medium", activeId === n.id ? "text-ember-300" : "text-bone")}>
                    {n.title || "Untitled note"}
                  </span>
                </div>
                {n.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {n.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-bone-faint">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col">
        {!active ? (
          <div className="flex flex-1 items-center justify-center text-[13.5px] text-bone-muted">
            Select or create a note to get started.
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] p-4">
              <Input
                value={active.title}
                onChange={(e) => updateNote(active.id, { title: e.target.value })}
                className="border-none bg-transparent px-0 font-display text-lg font-semibold focus-visible:ring-0"
                placeholder="Note title"
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => togglePin(active.id)} aria-label="Pin">
                  <Pin className={cn("h-4 w-4", active.pinned && "fill-molten-500 text-molten-500")} />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setPreviewMode((p) => !p)} aria-label="Toggle preview">
                  {previewMode ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => deleteNote(active.id)} aria-label="Delete note">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="border-b border-white/[0.06] px-4 py-2">
              <Input
                value={active.tags.join(", ")}
                onChange={(e) =>
                  updateNote(active.id, {
                    tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                  })
                }
                placeholder="tags, comma, separated"
                className="h-8 border-none bg-transparent px-0 text-[12.5px] focus-visible:ring-0"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {previewMode ? (
                <div className="prose-chat mx-auto max-w-2xl text-[14px] text-bone">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{active.content || "*Nothing to preview yet.*"}</ReactMarkdown>
                </div>
              ) : (
                <Textarea
                  value={active.content}
                  onChange={(e) => updateNote(active.id, { content: e.target.value })}
                  placeholder="Write in markdown… autosaves as you type."
                  className="h-full min-h-[400px] resize-none border-none bg-transparent px-0 font-mono text-[13.5px] focus-visible:ring-0"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
