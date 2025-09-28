"use client";

import type React from "react";


import ChatSidebar from "./chat-sidebar";
import Chat from "./chat";


export function ChatLayout({conversation_id}: {conversation_id: string}) {
  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Chat */}
      <Chat conversation_id={conversation_id} />
    </div>
  );
}
