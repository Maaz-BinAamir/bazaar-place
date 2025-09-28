"use client";

import { useState, useRef } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Id } from "@/convex/_generated/dataModel";
import { User, Paperclip, Send } from "lucide-react";

export default function NewChat({ postId }: { postId: string }) {
  const router = useRouter();

  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const post = useQuery(api.posts.getById, { id: postId as Id<"posts"> });
  const createConversation = useMutation(api.conversations.createConversation);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const conversationId = await createConversation({
      postId: postId as Id<"posts">,
      sellerId: post?.author?._id as Id<"users">,
      content: newMessage.trim(),
    });

    setNewMessage("");
    // redirecting
    router.push(`/chat/${conversationId}`);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-6 pr-12 border-b border-border/50 backdrop-blur-sm bg-card/300">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3 ">
            <Image
              src={post?.image ?? ""}
              alt={post?.title ?? "Post Image"}
              className="h-15 w-15 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-card-foreground">
                {post?.title}
              </h2>
              <p className="text-sm text-primary font-medium">
                Rs. {post?.price}
              </p>
              <p className="text-sm text-muted-foreground">
                Chat with {post?.author?.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground border"
              onClick={() => router.push(`/profile/${post?.author?._id}`)}
            >
              <User className="h-3 w-3 mr-1" />
              User&apos;s Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4 max-w-4xl mx-auto"></div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-6 border-t border-border/50 backdrop-blur-sm bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter Message"
                className="pr-12 py-3 bg-input/80 border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="h-12 w-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
