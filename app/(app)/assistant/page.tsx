"use client";

import { useRef, useState, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversationSidebar } from "@/components/features/assistant/conversation-sidebar";
import { ChatBubble } from "@/components/features/assistant/chat-bubble";
import { SuggestedPrompts } from "@/components/features/assistant/suggested-prompts";
import { useConversations } from "@/hooks/use-conversations";

export default function AssistantPage() {
  const {
    conversations,
    active,
    activeId,
    setActiveId,
    createConversation,
    sendMessage,
    deleteConversation,
  } = useConversations();
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [active?.messages.length, active?.messages.map((m) => m.content).join("")]);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || sending) return;
    setInput("");
    setSending(true);
    await sendMessage(content);
    setSending(false);
  }

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-[240px_1fr]">
      <ConversationSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onCreate={createConversation}
        onDelete={deleteConversation}
      />

      <div className="flex flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
          {!active || active.messages.length === 0 ? (
            <div className="mx-auto max-w-xl pt-12 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-heat-gradient">
                <Bot className="h-6 w-6 text-graphite-950" />
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold text-bone">How can I help you forge ahead?</h2>
              <p className="mt-1 text-[13.5px] text-bone-muted">
                Ask anything, or start from a suggested prompt below.
              </p>
              <div className="mt-6">
                <SuggestedPrompts onSelect={(p) => handleSend(p)} />
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl space-y-5">
              {active.messages.map((m) => (
                <ChatBubble key={m.id} message={m} />
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-white/[0.06] p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="mx-auto flex max-w-2xl items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI assistant anything…"
              className="h-11 flex-1 rounded-xl border border-white/10 bg-graphite-800 px-4 text-[13.5px] text-bone placeholder:text-bone-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500"
            />
            <Button size="icon" type="submit" disabled={sending || !input.trim()} aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="mx-auto mt-2 max-w-2xl text-center text-[11px] text-bone-faint">
            Responses are provider-independent — the underlying model can change without affecting this UI.
          </p>
        </div>
      </div>
    </div>
  );
}
