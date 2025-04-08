"use client";

import {
  Calendar,
  Home,
  Inbox,
  MessageSquare,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChatHistory, getChatHistory } from "@/lib/chat-history";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setChatHistory(getChatHistory());
  }, []);

  const handleNewChat = () => {
    router.push("/");
  };

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <Sidebar className="font-inter">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between py-2">
            <SidebarGroupLabel>Chat History</SidebarGroupLabel>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleNewChat}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {chatHistory.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      pathname === `/chat/${chat.id}` && "bg-accent",
                    )}
                    onClick={() => handleChatClick(chat.id)}
                  >
                    <button>
                      <MessageSquare className="h-4 w-4" />
                      <span className="truncate">
                        {chat.title || "New Chat"}
                      </span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
