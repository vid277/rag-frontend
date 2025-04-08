"use client";

import { useChat } from "@ai-sdk/react";
import { Chat } from "@/components/ui/chat";
import { type Message } from "@/components/ui/chat-message";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    append,
  } = useChat({
    api: "/api/chat",
  });

  const handleSuggestion = (message: { role: "user"; content: string }) => {
    append(message);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden">
      <div className="flex flex-col h-full w-1/2 justify-center items-center m-4 gap-8">
        <PromptSuggestions
          label="Get started with some questions"
          append={handleSuggestion}
          suggestions={[
            "What is the capital of France?",
            "What is the capital of Germany?",
            "What is the capital of Italy?",
          ]}
        />
        <Chat
          messages={messages as Message[]}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isGenerating={isLoading}
          stop={stop}
        />
      </div>
    </div>
  );
}
