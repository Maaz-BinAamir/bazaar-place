"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip, Check, CheckCheck, User } from "lucide-react";

import ChatSkeleton from "@/components/skeletons/chat";

import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="flex-1 flex flex-col min-h-0 w-full bg-[#FDFBF7]">
      {/* Chat Header */}
      <div className="p-6 sm:pr-12 border-b-2 border-black bg-white z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl border-2 border-black overflow-hidden bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Image
                src={post.image}
                alt={post.title}
                height={56}
                width={56}
                className="h-full w-full object-cover"
                />
            </div>
            
            <div>
              <h2 className="text-xl font-black text-black">
                {post.title}
              </h2>
              <div className="flex items-center gap-2">
                 <span className="bg-[#4ECDC4] text-black text-xs font-bold px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    Rs. {post.price}
                 </span>
                 <p className="text-sm font-medium text-black/60">
                    with <span className="text-black font-bold">{recipient.username}</span>
                 </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-xs font-bold bg-white hover:bg-gray-50 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none transition-all"
              onClick={() => router.push(`/profile/${recipient.id}`)}
            >
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0 p-6 bg-[#FDFBF7]">
        <div className="space-y-6 max-w-4xl mx-auto pb-4">
          {messages.map((message: Messages) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender === recipient.id
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <div className={`flex flex-col ${message.sender === recipient.id ? "items-start" : "items-end"} max-w-xs lg:max-w-md`}>
                <div
                  className={`px-5 py-3 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative ${
                    message.sender === recipient.id
                      ? "bg-white text-black rounded-bl-none"
                      : "bg-black text-white rounded-br-none"
                  }`}
                >
                  <p className="text-sm font-medium leading-relaxed">{message.content}</p>
                </div>
                <div
                  className={`flex items-center gap-1.5 mt-2 px-1 ${
                    message.sender === recipient.id
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <p className="text-[10px] font-bold text-black/40 uppercase tracking-wide">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {message.sender !== recipient.id && (
                    <div className="text-black/60">
                      {message.read ? (
                        <CheckCheck className="h-3 w-3 text-[#4ECDC4]" strokeWidth={3} />
                      ) : (
                        <Check className="h-3 w-3" strokeWidth={3} />
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
              <div className="max-w-xs lg:max-w-md border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white p-2">
                <Image
                  src={previewImage}
                  alt="preview"
                  width={300}
                  height={300}
                  className="rounded-lg max-w-full h-auto object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-6 border-t-2 border-black bg-white shadow-[0px_-4px_0px_0px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto">
          {isClosed ? (
            <div className="text-center py-6 bg-gray-100 border-2 border-dashed border-black/20 rounded-xl">
              <p className="font-bold text-black/40">This conversation is closed.</p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex-1 relative group">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="pr-12 py-6 bg-white border-2 border-black rounded-xl text-black font-medium placeholder:text-black/30 focus-visible:ring-0 focus-visible:border-black focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="h-4 w-4 text-black/40 hover:text-black" />
                </Button>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() && !previewImage}
                className="h-[52px] w-[52px] rounded-xl bg-[#FF6B6B] border-2 border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none hover:bg-[#FF6B6B]/90 transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
              >
                <Send className="h-5 w-5" strokeWidth={3} />
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
