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
          author: author
            ? { name: author.first_name, email: author.email }
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
    }),
  },
  handler: async (ctx, args) => {
    const image = "https://placehold.co/600x400";
    const authorId = "jh78n0qn4vjs44djzmhe3j69rh7mebkf" as Id<"users">;
    const newPostId = await ctx.db.insert("posts", {
      ...args.post,
      image,
      author_id: authorId,
      status: "available",
    });
    return newPostId;
  },
});
