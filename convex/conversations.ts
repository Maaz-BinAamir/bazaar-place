import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getConversations = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await getAuthUserId(ctx)) as Id<"users">;
    if (!userId) return [];

    const conversations = await ctx.db.query("conversations").collect();
    const userConversations = conversations.filter(
      (c) => c.buyer === userId || c.seller === userId,
    );

    return Promise.all(
      userConversations.map(async (conversation) => {
        const [post, buyer, seller] = await Promise.all([
          ctx.db.get(conversation.post as Id<"posts">),
          ctx.db.get(conversation.buyer as Id<"users">),
          ctx.db.get(conversation.seller as Id<"users">),
        ]);

        const otherUser = userId === conversation.buyer ? seller : buyer;
        const otherUserProfileUrl = otherUser?.profile_picture
          ? await ctx.storage.getUrl(otherUser.profile_picture)
          : null;

        // Fetch last message
        const messages = await ctx.db
          .query("messages")
          .withIndex("by_conversation", (q) =>
            q.eq("conversation", conversation._id),
          )
          .order("desc")
          .take(1);

        const lastMessageDoc = messages[0] || null;

        const unreadMessages = await ctx.db
          .query("messages")
          .withIndex("by_conversation", (q) =>
            q.eq("conversation", conversation._id),
          )
          .filter((q) =>
            q.and(
              q.eq(q.field("read"), false),
              q.neq(q.field("sender"), userId),
            ),
          )
          .collect();

        const profilePictureUrl = buyer?.profile_picture
          ? await ctx.storage.getUrl(buyer.profile_picture)
          : null;

        const numberOfUnread = unreadMessages.length;

        // Resolve last message content: if image, get the public URL
        let lastMessageContent: string | null = null;
        if (lastMessageDoc?.content) {
          lastMessageContent = lastMessageDoc.isImage
            ? (await ctx.storage.getUrl(lastMessageDoc.content as Id<"_storage">)) ?? null
            : (lastMessageDoc.content as string);
        }

        return {
          id: conversation._id,
          isClosed: conversation.is_closed,
          post: {
            title: post?.title,
            price: post?.price,
            image: post?.image ? await ctx.storage.getUrl(post.image) : null,
          },
          otherUser: {
            username: otherUser?.username,
            first_name: otherUser?.first_name || "",
            last_name: otherUser?.last_name || "",
            profile_picture: otherUserProfileUrl,
          },
          buyer: {
            id: buyer?._id,
            username: buyer?.username,
            firstname: buyer?.first_name,
            lastname: buyer?.last_name,
            profile_picture: profilePictureUrl,
          },
          lastMessage: {
            content: lastMessageContent,
            isImage: lastMessageDoc?.isImage ?? false,
            sender: lastMessageDoc?.sender,
            timestamp: lastMessageDoc?.timestamp,
          },
          numberOfUnread,
        };
      }),
    );
  },
});

export const createConversation = mutation({
  args: {
    sellerId: v.id("users"),
    postId: v.id("posts"),
    content: v.union(v.string(), v.id("_storage")),
    isImage: v.boolean(),
  },
  handler: async (ctx, args) => {
    const buyerId = (await getAuthUserId(ctx))!;

    const conversationId = await ctx.db.insert("conversations", {
      post: args.postId,
      buyer: buyerId,
      seller: args.sellerId,
      is_closed: false,
    });

    await ctx.db.insert("messages", {
      conversation: conversationId,
      sender: buyerId,
      content: args.content,
      isImage: args.isImage,
      timestamp: Date.now(),
      read: false,
    });

    return conversationId;
  },
});

export const getMessages = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) throw new Error("Conversation not found");

    const recipientId =
      conversation.buyer === userId ? conversation.seller : conversation.buyer;

    const recipient = (await ctx.db.get(recipientId))!;

    const rawMessages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversation", args.conversationId),
      )
      .order("asc")
      .collect();

    const post = await ctx.db.get(conversation.post);
    if (!post) throw new Error("Post not found");

    // Resolve any image storage IDs to public URLs
    const messages = await Promise.all(
      rawMessages.map(async (msg) => {
        const resolvedContent = msg.isImage
          ? await ctx.storage.getUrl(msg.content as Id<"_storage">) ?? msg.content
          : msg.content;

        return { ...msg, content: resolvedContent };
      }),
    );

    return {
      recipient: {
        id: recipient._id,
        username: recipient.username,
        profile_picture: recipient.profile_picture,
      },
      post: {
        id: post._id,
        title: post.title,
        image: post.image
          ? (await ctx.storage.getUrl(post.image))!
          : "https://placehold.co/200x200?text=No+Image",
        price: post.price,
      },
      isClosed: conversation.is_closed,
      messages: messages,
    };
  },
});
