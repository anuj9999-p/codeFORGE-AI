"use client";

import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation } from "@/types/chat";
import { cn } from "@/lib/utils";

interface Props {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

export function ConversationSidebar({ conversations, activeId, onSelect, onCreate, onDelete }: Props) {
  return (
    <div className="flex h-full flex-col border-r border-white/[0.06]">
      <div className="p-3">
        <Button size="sm" className="w-full" onClick={onCreate}>
          <Plus className="h-4 w-4" /> New conversation
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {conversations.length === 0 ? (
          <p className="px-2 py-4 text-center text-[12.5px] text-bone-faint">No conversations yet.</p>
        ) : (
          conversations.map((c) => (
            <div
              key={c.id}
              className={cn(
                "group mb-1 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] transition-colors",
                activeId === c.id ? "bg-ember-500/10 text-ember-300" : "text-bone-muted hover:bg-white/[0.05]"
              )}
            >
              <MessageSquare className="h-3.5 w-3.5 shrink-0" />
              <button onClick={() => onSelect(c.id)} className="flex-1 truncate text-left">
                {c.title}
              </button>
              <button
                onClick={() => onDelete(c.id)}
                className="opacity-0 group-hover:opacity-100"
                aria-label="Delete conversation"
              >
                <Trash2 className="h-3.5 w-3.5 text-bone-faint hover:text-ember-400" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
