"use client";

import { Message } from "@/components/ui/chat-message";

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const CHAT_HISTORY_KEY = "chat-history";

function serializeMessage(
  message: Message,
): Omit<Message, "createdAt"> & { createdAt: string } {
  return {
    ...message,
    createdAt: message.createdAt?.toISOString() || new Date().toISOString(),
  };
}

function deserializeMessage(
  message: Omit<Message, "createdAt"> & { createdAt: string },
): Message {
  const cleanContent = message.content
    .replace(/f:\{.*?\}/g, "")
    .replace(/e:\{.*?\}/g, "")
    .replace(/d:\{.*?\}/g, "")
    .replace(/0:"(.*?)"/g, "$1")
    .trim();

  return {
    ...message,
    content: cleanContent,
    createdAt: new Date(message.createdAt),
  };
}

export function saveChatToHistory(
  chat: Omit<ChatHistory, "id" | "createdAt" | "updatedAt">,
) {
  if (typeof window === "undefined") return null;

  const history = getChatHistory();
  const newChat: ChatHistory = {
    ...chat,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const existingChatIndex = history.findIndex(
    (h) => h.messages[0]?.content === chat.messages[0]?.content,
  );

  if (existingChatIndex !== -1) {
    history[existingChatIndex] = {
      ...history[existingChatIndex],
      messages: chat.messages,
      updatedAt: new Date(),
    };
  } else {
    history.unshift(newChat);
  }

  const serializedHistory = history.map((chat) => ({
    ...chat,
    createdAt: chat.createdAt.toISOString(),
    updatedAt: chat.updatedAt.toISOString(),
    messages: chat.messages.map(serializeMessage),
  }));

  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(serializedHistory));
  return existingChatIndex !== -1 ? history[existingChatIndex] : newChat;
}

export function getChatHistory(): ChatHistory[] {
  if (typeof window === "undefined") return [];

  const history = localStorage.getItem(CHAT_HISTORY_KEY);
  if (!history) return [];

  return JSON.parse(history).map(
    (
      chat: Omit<ChatHistory, "createdAt" | "updatedAt" | "messages"> & {
        createdAt: string;
        updatedAt: string;
        messages: Array<Omit<Message, "createdAt"> & { createdAt: string }>;
      },
    ) => ({
      ...chat,
      createdAt: new Date(chat.createdAt),
      updatedAt: new Date(chat.updatedAt),
      messages: chat.messages.map(deserializeMessage),
    }),
  );
}

export function getChatById(id: string): ChatHistory | null {
  if (typeof window === "undefined") return null;

  const history = getChatHistory();
  return history.find((chat) => chat.id === id) || null;
}

export function updateChatTitle(id: string, title: string) {
  if (typeof window === "undefined") return;

  const history = getChatHistory();
  const chatIndex = history.findIndex((chat) => chat.id === id);

  if (chatIndex === -1) return;

  history[chatIndex] = {
    ...history[chatIndex],
    title,
    updatedAt: new Date(),
  };

  const serializedHistory = history.map((chat) => ({
    ...chat,
    createdAt: chat.createdAt.toISOString(),
    updatedAt: chat.updatedAt.toISOString(),
    messages: chat.messages.map(serializeMessage),
  }));

  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(serializedHistory));
}

export function deleteChat(id: string) {
  if (typeof window === "undefined") return;

  const history = getChatHistory();
  const filteredHistory = history.filter((chat) => chat.id !== id);

  const serializedHistory = filteredHistory.map((chat) => ({
    ...chat,
    createdAt: chat.createdAt.toISOString(),
    updatedAt: chat.updatedAt.toISOString(),
    messages: chat.messages.map(serializeMessage),
  }));

  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(serializedHistory));
}
