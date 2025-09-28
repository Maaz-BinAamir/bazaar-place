"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Check, CheckCheck, User } from "lucide-react";

import ChatSkeleton from "@/components/skeletons/chat";

import { useRouter } from "next/navigation";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id, Doc } from "@/convex/_generated/dataModel";

type Messages = Doc<"messages">;

export default function Chat({
  conversation_id: conversationId,
}: {
  conversation_id: string;
}) {
  const data = useQuery(api.conversations.getMessages, {
    conversationId: conversationId as Id<"conversations">,
  });

  const sendMessage = useMutation(api.messages.sendMessage);
  const markRead = useMutation(api.messages.readMessage);

  const router = useRouter();

  const [newMessage, setNewMessage] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      data &&
      data.messages.some((m) => !m.read && m.sender === data.recipient.id)
    ) {
      markRead({ conversationId: conversationId as Id<"conversations"> });
    }
  }, [data, conversationId, markRead]);

  if (!data) {
    return <ChatSkeleton />;
  }

  const { recipient, post, isClosed, messages } = data;

  const handleSendMessage = () => {
    if (!newMessage.trim() && !previewImage) return;

    sendMessage({
      conversationId: conversationId as Id<"conversations">,
      content: previewImage ? previewImage : newMessage.trim(),
    });

    setNewMessage("");
    setPreviewImage(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 w-full">
      {/* Chat Header */}
      <div className="p-6 sm:pr-12 border-b border-border/50 backdrop-blur-sm bg-card/300">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3 ">
            <img
              src={post.image}
              alt={post.title}
              className="h-15 w-15 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-card-foreground">
                {post.title}
              </h2>
              <p className="text-sm text-primary font-medium">
                Rs. {post.price}
              </p>
              <p className="text-sm text-muted-foreground">
                Chat with {recipient.username}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground border"
              onClick={() => router.push(`/profile/${recipient.id}`)}
            >
              <User className="h-3 w-3 mr-1" />
              User's Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0 p-6">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message: Messages) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender === recipient.id
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div className="max-w-xs lg:max-w-md">
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === recipient.id
                      ? "bg-chat-bubble-other text-chat-bubble-other-foreground rounded-bl-md"
                      : "bg-chat-bubble-user text-chat-bubble-user-foreground rounded-br-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <div
                  className={`flex items-center gap-1 mt-1 ${
                    message.sender === recipient.id
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <p className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                  {message.sender !== recipient.id && (
                    <div className="text-muted-foreground">
                      {message.read ? (
                        <CheckCheck className="h-3 w-3 text-primary" />
                      ) : (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Image preview before sending */}
          {previewImage && (
            <div className="flex justify-end">
              <div className="max-w-xs lg:max-w-md">
                <img
                  src={previewImage}
                  alt="preview"
                  className="rounded-lg max-w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-6 border-t border-border/50 backdrop-blur-sm bg-card/30">
        <div className="max-w-4xl mx-auto">
          {isClosed ? (
            <div className="text-center text-muted-foreground py-4">
              This conversation has been closed and no new messages can be sent.
            </div>
          ) : (
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
                disabled={!newMessage.trim() && !previewImage}
                className="h-12 w-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          )}
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
