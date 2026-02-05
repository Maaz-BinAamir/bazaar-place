"use client";
import { ScrollArea } from "@/components/ui/scroll-area";

import ChatSidebarSkeleton from "@/components/skeletons/chat-siderbar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
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
    <div className="hidden md:flex flex-col w-80 lg:w-96 border-r-2 border-black bg-[#FDFBF7]">
      <div className="p-6 border-b-2 border-black bg-white">
        <h1 className="text-2xl font-black text-black uppercase tracking-tight">
          Messages
        </h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {sortedData.map((conversation) => (
            <div
              key={conversation?.id}
              className={`p-4 cursor-pointer transition-all duration-200 border-2 border-black rounded-xl relative group ${
                conversationId === conversation?.id
                  ? "bg-[#FFD93D] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]"
                  : "bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:bg-gray-50"
              } ${conversation.isClosed ? "opacity-60 grayscale" : ""}`}
              onClick={() => router.push(`/chat/${conversation.id}`)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={conversation?.post?.image || ""}
                    alt={conversation?.post?.title || "Post Image"}
                    height={48}
                    width={48}
                    className="h-12 w-12 rounded-full border-2 border-black object-cover bg-white"
                  />
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-black bg-white flex items-center justify-center overflow-hidden">
                    <Avatar className="h-full w-full">
                      <AvatarImage
                        src={conversation?.otherUser?.profile_picture || ""}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-[#FFD93D] text-black text-[8px] font-black flex items-center justify-center w-full h-full">
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-0.5">
                    <h3 className="font-bold text-black truncate pr-2 text-sm">
                      {conversation?.post?.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {conversation?.numberOfUnread > 0 &&
                        !conversation?.isClosed && (
                          <div className="bg-[#FF6B6B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                            {conversation?.numberOfUnread}
                          </div>
                        )}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-black/70 mb-1">
                    Rs. {conversation?.post?.price}
                  </p>
                  <div className="flex justify-between items-end">
                    <p className="text-xs text-black/60 truncate max-w-[120px]">
                      <span className="font-semibold text-black">
                        {conversation?.otherUser?.username}:
                      </span>{" "}
                      {conversation?.lastMessage?.content}
                    </p>
                    {conversation?.lastMessage?.timestamp && (
                      <span className="text-[10px] font-medium text-black/40">
                        {formatShortTimeAgo(
                          conversation?.lastMessage?.timestamp,
                        )}
                      </span>
                    )}
                  </div>

                  {conversation?.isClosed && (
                    <div className="mt-2 inline-block px-2 py-0.5 bg-gray-200 border border-black rounded-md">
                      <p className="text-[10px] font-bold text-black">CLOSED</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
