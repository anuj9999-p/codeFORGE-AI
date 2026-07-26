"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";
import { Note } from "@/types/note";

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

export function useNotes() {
  const [notes, setNotes, hydrated] = useLocalStorage<Note[]>("codeforge:notes", []);

  const createNote = useCallback(() => {
    const note: Note = {
      id: newId(),
      title: "Untitled note",
      content: "",
      tags: [],
      pinned: false,
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
    return note.id;
  }, [setNotes]);

  const updateNote = useCallback(
    (id: string, patch: Partial<Note>) => {
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n))
      );
    },
    [setNotes]
  );

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    },
    [setNotes]
  );

  const togglePin = useCallback(
    (id: string) => {
      setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
    },
    [setNotes]
  );

  const exportNotes = useCallback(() => {
    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "codeforge-notes.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [notes]);

  const importNotes = useCallback(
    (json: string) => {
      try {
        const parsed = JSON.parse(json) as Note[];
        if (!Array.isArray(parsed)) return false;
        setNotes((prev) => [...parsed, ...prev]);
        return true;
      } catch {
        return false;
      }
    },
    [setNotes]
  );

  return { notes, hydrated, createNote, updateNote, deleteNote, togglePin, exportNotes, importNotes };
}
