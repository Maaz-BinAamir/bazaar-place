"use client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ChatSidebarSkeleton from "@/components/skeletons/chat-siderbar";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { formatShortTimeAgo } from "@/lib/utils";

export default function ChatSidebar({
  conversation_id: conversationId,
}: {
  conversation_id: string;
}) {
  const data = useQuery(api.conversations.getConversations) || [];

  console.log("Conversations data:", data);

  const sortedData = [...data].sort((a, b) => {
    const aTime = a?.lastMessage.timestamp ?? 0;
    const bTime = b?.lastMessage.timestamp ?? 0;
    return bTime - aTime;
  });

  const router = useRouter();

  if (data.length === 0) {
    return <ChatSidebarSkeleton />;
  }

  return (
    <div
      className="hidden md:block w-100 border-r border-border/50 backdrop-blur-sm"
      style={{ background: "var(--sidebar-bg)" }}
    >
      <div className="p-6 border-b border-border/50">
        <h1 className="text-xl font-semibold text-foreground">Product Chats</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {sortedData.map((conversation) => (
            <Card
              key={conversation?.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:bg-accent/50 border-border/30 ${
                conversationId === conversation?.id
                  ? "bg-accent/30 border-accent/50"
                  : "bg-card/50"
              } ${conversation.isClosed ? "opacity-60" : ""}`}
              onClick={() => router.push(`/chat/${conversation.id}`)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={conversation?.post?.image || ""}
                    alt={conversation?.post?.title || "Post Image"}
                    height={48}
                    width={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <Avatar className="h-6 w-6 absolute -bottom-1 -right-1 border-2 border-background">
                    <AvatarImage
                      src={conversation?.buyer?.profile_picture || ""}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {`${conversation?.buyer?.firstname?.[0] || ""}${
                        conversation?.buyer?.lastname?.[0] || ""
                      }`.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-card-foreground truncate pr-2">
                      {conversation?.post?.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {conversation?.numberOfUnread > 0 &&
                        !conversation?.isClosed && (
                          <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation?.numberOfUnread}
                          </div>
                        )}
                      {conversation?.lastMessage?.timestamp && (
                        <span className="text-xs text-muted-foreground">
                          {formatShortTimeAgo(
                            conversation?.lastMessage?.timestamp
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-primary font-medium">
                    Rs.{conversation?.post?.price}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation?.buyer?.username}:{" "}
                    {conversation?.lastMessage?.content}
                  </p>
                  {conversation?.isClosed && (
                    <p className="text-xs text-destructive mt-1">Chat Closed</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
