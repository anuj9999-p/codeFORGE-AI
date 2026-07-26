"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";
import { Conversation, ChatMessage } from "@/types/chat";
import { aiService } from "@/services/ai-service";

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

export function useConversations() {
  const [conversations, setConversations, hydrated] = useLocalStorage<Conversation[]>(
    "codeforge:conversations",
    []
  );
  const [activeId, setActiveId] = useLocalStorage<string | null>("codeforge:active-conversation", null);

  const active = conversations.find((c) => c.id === activeId) ?? null;

  const createConversation = useCallback(() => {
    const conv: Conversation = {
      id: newId(),
      title: "New conversation",
      messages: [],
      createdAt: new Date().toISOString(),
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
    return conv.id;
  }, [setConversations, setActiveId]);

  const sendMessage = useCallback(
    async (content: string) => {
      let convId = activeId;
      if (!convId || !conversations.some((c) => c.id === convId)) {
        convId = newId();
        const conv: Conversation = {
          id: convId,
          title: content.slice(0, 40) || "New conversation",
          messages: [],
          createdAt: new Date().toISOString(),
        };
        setConversations((prev) => [conv, ...prev]);
        setActiveId(convId);
      }

      const userMsg: ChatMessage = {
        id: newId(),
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      };
      const assistantId = newId();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                title: c.messages.length === 0 ? content.slice(0, 40) : c.title,
                messages: [...c.messages, userMsg, assistantMsg],
              }
            : c
        )
      );

      const history = [...(conversations.find((c) => c.id === convId)?.messages ?? []), userMsg];

      await aiService.streamReply(history, (token) => {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === assistantId ? { ...m, content: m.content + token } : m
                  ),
                }
              : c
          )
        );
      });
    },
    [activeId, conversations, setConversations, setActiveId]
  );

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeId === id) setActiveId(null);
    },
    [activeId, setConversations, setActiveId]
  );

  return {
    conversations,
    active,
    activeId,
    hydrated,
    setActiveId,
    createConversation,
    sendMessage,
    deleteConversation,
  };
}
