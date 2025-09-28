import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { query: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let posts = await ctx.db.query("posts").collect();

    // Apply filtering if query exists
    if (args.query) {
      const lowerQuery = args.query.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery) ||
          post.location.toLowerCase().includes(lowerQuery)
      );
    }

    return Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db.get(post.author as Id<"users">);
        return {
          ...post,
          image: (await ctx.storage.getUrl(post.image)) as string,
          author: author
            ? { name: author.username, email: author.email }
            : null,
        };
      })
    );
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    location: v.string(),
    price: v.number(),
    image: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    // const image = "https://placehold.co/600x400";
    // const authorId = "jh78n0qn4vjs44djzmhe3j69rh7mebkf" as Id<"users">;
    const authorId = (await getAuthUserId(ctx)) as Id<"users">;
    const newPostId = await ctx.db.insert("posts", {
      ...args,
      author: authorId,
      status: "available",
    });
    return newPostId;
  },
});

export const getById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) return null;
    const author = await ctx.db.get(post.author as Id<"users">);
    const isAuthor = (await getAuthUserId(ctx)) === post.author;
    return {
      ...post,
      image: await ctx.storage.getUrl(post.image),
      author: author
        ? {
            _id: author._id,
            name: author.username,
            email: author.email,
            profile_picture: author.profile_picture,
          }
        : null,
      isAuthor,
    };
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const markAsSold = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "sold" });
  },
});
