// convex/conversations.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.union(v.string(), v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const senderId = (await getAuthUserId(ctx))!;

    const messageId = await ctx.db.insert("messages", {
      conversation: args.conversationId,
      sender: senderId,
      content: args.content,
      timestamp: Date.now(),
      read: false,
    });

    return messageId;
  },
});

export const readMessage = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversation", args.conversationId)
      )
      .order("asc")
      .collect();

    for (const message of messages) {
      if (message.sender !== userId && !message.read) {
        await ctx.db.patch(message._id, { read: true });
      }
    }
  },
});
