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
import { User, Paperclip, Send, X, Loader2 } from "lucide-react";

export default function NewChat({ postId }: { postId: string }) {
  const router = useRouter();

  const [newMessage, setNewMessage] = useState("");
  const [imageState, setImageState] = useState<{
    file: File;
    blobUrl: string;
    uploading: boolean;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const post = useQuery(api.posts.getById, { id: postId as Id<"posts"> });
  const createConversation = useMutation(api.conversations.createConversation);
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !imageState) return;

    if (imageState) {
      const { file, blobUrl } = imageState;
      setImageState({ file, blobUrl, uploading: true });
      try {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();
        const conversationId = await createConversation({
          postId: postId as Id<"posts">,
          sellerId: post?.author?._id as Id<"users">,
          content: storageId as Id<"_storage">,
          isImage: true,
        });
        router.push(`/chat/${conversationId}`);
      } finally {
        setImageState(null);
      }
      return;
    }

    const conversationId = await createConversation({
      postId: postId as Id<"posts">,
      sellerId: post?.author?._id as Id<"users">,
      content: newMessage.trim(),
      isImage: false,
    });

    setNewMessage("");
    router.push(`/chat/${conversationId}`);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageState({ file, blobUrl: URL.createObjectURL(file), uploading: false });
    event.target.value = "";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FDFBF7] h-full">
      {/* Chat Header */}
      <div className="p-6 pr-12 border-b-2 border-black bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl border-2 border-black overflow-hidden bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Image
                src={post?.image ?? ""}
                alt={post?.title ?? "Post Image"}
                width={56}
                height={56}
                className="h-full w-full object-cover"
                />
            </div>
            
            <div>
              <h2 className="text-xl font-black text-black">
                {post?.title}
              </h2>
              <div className="flex items-center gap-2">
                 <span className="bg-[#4ECDC4] text-black text-xs font-bold px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    Rs. {post?.price}
                 </span>
                 <p className="text-sm font-medium text-black/60">
                    Chat with <span className="text-black font-bold">{post?.author?.name}</span>
                 </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-xs font-bold bg-white hover:bg-gray-50 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none transition-all"
              onClick={() => router.push(`/profile/${post?.author?._id}`)}
            >
              <User className="h-4 w-4 mr-2" />
              User&apos;s Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Placeholder */}
      <ScrollArea className="flex-1 p-6 bg-[#FDFBF7]">
        <div className="space-y-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full min-h-[400px]">
            <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm text-center transform -rotate-1">
                <h3 className="text-xl font-black text-black mb-2">Start a new conversation!</h3>
                <p className="text-black/60 font-medium">
                    Say hello to {post?.author?.name} and ask about this item.
                </p>
            </div>
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-6 border-t-2 border-black bg-white shadow-[0px_-4px_0px_0px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              {imageState?.uploading ? (
                /* Uploading state — thumbnail with spinner, no cancel */
                <div className="flex items-center gap-3 px-3 py-2 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={imageState.blobUrl}
                      alt="uploading"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-lg object-cover border-2 border-black/10 opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-5 w-5 text-black animate-spin" strokeWidth={2.5} />
                    </div>
                  </div>
                  <span className="text-sm text-black/40 font-medium">Uploading image...</span>
                </div>
              ) : imageState ? (
                /* Image picked, ready to send */
                <div className="flex items-center gap-3 px-3 py-2 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={imageState.blobUrl}
                      alt="preview"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-lg object-cover border-2 border-black/10"
                    />
                    <button
                      type="button"
                      onClick={() => setImageState(null)}
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <X className="h-3 w-3" strokeWidth={3} />
                    </button>
                  </div>
                  <span className="text-sm text-black/50 font-medium">Image ready to send</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="ml-auto h-8 w-8 p-0 hover:bg-gray-100 rounded-lg flex-shrink-0"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4 text-black/40 hover:text-black" />
                  </Button>
                </div>
              ) : (
                /* Normal text input */
                <>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your first message..."
                    className="pr-12 py-6 bg-white border-2 border-black rounded-xl text-black font-medium placeholder:text-black/30 focus-visible:ring-0 focus-visible:border-black focus-visible:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-lg"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4 text-black/40 hover:text-black" />
                  </Button>
                </>
              )}
            </div>

            <Button
              type="button"
              onClick={handleSendMessage}
              disabled={(!newMessage.trim() && !imageState) || !!imageState?.uploading}
              className="h-[52px] w-[52px] rounded-xl bg-[#FF6B6B] border-2 border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none hover:bg-[#FF6B6B]/90 transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
            >
              <Send className="h-5 w-5" strokeWidth={3} />
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
