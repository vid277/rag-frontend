"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Chat } from "@/components/ui/chat";
import { Message } from "@/components/ui/chat-message";
import { getChatById, saveChatToHistory } from "@/lib/chat-history";
import { Loader2 } from "lucide-react";

function LoadingSpinner() {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();

  const { id } = use(params);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const chat = getChatById(id);
    if (!chat) {
      router.push("/");
      return;
    }
    setMessages(chat.messages);
    setIsLoading(false);
  }, [id, router]);

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    if (!input.trim() || isGenerating) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsGenerating(true);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        buffer += text;

        let content = "";
        const parts = buffer.split('0:"');
        for (let i = 1; i < parts.length; i++) {
          const part = parts[i];
          const endQuoteIndex = part.indexOf('"');
          if (endQuoteIndex !== -1) {
            content += part.substring(0, endQuoteIndex);
          }
        }

        if (content) {
          const formattedContent = content
            .replace(/\\n/g, "\n")
            .replace(/\\"/, '"')
            .replace(/\\\\n/g, "\\n")
            .trim();

          assistantMessage.content = formattedContent;
          setMessages((prev) => [
            ...prev.slice(0, -1),
            { ...assistantMessage },
          ]);
        }
      }

      saveChatToHistory({
        title: messages[0]?.content.slice(0, 50) + "..." || "New Chat",
        messages: [...messages, newMessage, { ...assistantMessage }],
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error("Error:", error);
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center align-middle justify-center w-full">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center items-center mx-12 gap-8 h-screen">
          <Chat
            messages={messages}
            handleSubmit={handleSubmit}
            input={input}
            handleInputChange={handleInputChange}
            isGenerating={isGenerating}
            setMessages={setMessages}
            stop={handleStop}
            className="h-screen w-full py-12"
          />
        </div>
      )}
    </>
  );
}
