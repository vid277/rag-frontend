"use client";

import { useState, useRef } from "react";
import { Chat } from "@/components/ui/chat";
import { type Message } from "@/components/ui/chat-message";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";
import Navigation from "@/components/ui/navigation";
import { marked } from "marked";

marked.setOptions({
  breaks: true,
});

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

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
      const response = await fetch("/api/proxy/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: input,
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

        const isHtml = buffer.trim().startsWith("<");
        const formattedContent = isHtml
          ? buffer
          : marked.parse(buffer, { async: false });
        assistantMessage.content = formattedContent;
        setMessages((prev) => [...prev.slice(0, -1), { ...assistantMessage }]);
      }
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

  const handleSuggestion = (message: { role: "user"; content: string }) => {
    setInput(message.content);
    handleSubmit();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden">
      <Navigation />
      <div className="flex flex-col h-screen w-[60%] justify-center items-center m-4 gap-8">
        <div className="flex flex-col gap-4 text-center font-shippori">
          <h1 className="text-5xl font-bold">
            Chat <span className="text-primary">GT</span>
          </h1>
          <h2 className="text-base text-muted-foreground">
            learn about Georgia Tech with the help of AI
          </h2>
        </div>
        {messages.length == 0 && (
          <div className="flex flex-col gap-2">
            <PromptSuggestions
              label="Get started with some questions"
              append={handleSuggestion}
              suggestions={[
                "What is the admission rate for Georgia Tech?",
                "What are popular majors at Georgia Tech?",
                "Upcoming events and activities at Georgia Tech",
              ]}
            />
          </div>
        )}
        <Chat
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isGenerating={isGenerating}
          stop={handleStop}
          className="overflow-y-auto max-h-[70vh] w-full"
        />
      </div>
    </div>
  );
}
