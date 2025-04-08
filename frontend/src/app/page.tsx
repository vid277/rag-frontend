"use client";

import { useChat } from "@ai-sdk/react";
import { Chat } from "@/components/ui/chat";
import { type Message } from "@/components/ui/chat-message";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";
import Navigation from "@/components/ui/navigation";
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
          messages={messages as Message[]}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isGenerating={isLoading}
          stop={stop}
          className="overflow-y-auto max-h-[70vh] w-full"
        />
      </div>
    </div>
  );
}
