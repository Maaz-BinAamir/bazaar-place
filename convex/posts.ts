import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    const enriched = await Promise.all(
      posts.map(async (post) => {
        const author = await ctx.db.get(post.author_id as Id<"users">);
        return {
          ...post,
          image: (await ctx.storage.getUrl(post.image)) as string,
          author: author
            ? { name: author.username, email: author.email }
            : null,
        };
      })
    );
    return enriched;
  },
});

export const create = mutation({
  args: {
    post: v.object({
      title: v.string(),
      description: v.string(),
      location: v.string(),
      price: v.number(),
      image: v.id("_storage"),
    }),
  },
  handler: async (ctx, args) => {
    // const image = "https://placehold.co/600x400";
    // const authorId = "jh78n0qn4vjs44djzmhe3j69rh7mebkf" as Id<"users">;
    const authorId = (await getAuthUserId(ctx)) as Id<"users">;
    const newPostId = await ctx.db.insert("posts", {
      ...args.post,
      // image,
      author_id: authorId,
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
    const author = await ctx.db.get(post.author_id as Id<"users">);
    return {
      ...post,
      author: author
        ? {
            name: author.username,
            email: author.email,
            profile_picture: author.profile_picture,
          }
        : null,
    };
  },
});

export const getByAuthorId = query({
  args: { authorId: v.id("users") },
  handler: async (ctx, args) => {
    const allPosts = await ctx.db.query("posts").collect();
    const posts = allPosts.filter((post) => post.author_id === args.authorId);
    console.log("Posts by author:", posts);
    const enriched = await Promise.all(
      posts.map(async (post) => {
        return {
          ...post,
          image: (await ctx.storage.getUrl(post.image)) as string,
        };
      })
    );
    return enriched;
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
