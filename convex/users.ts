import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    console.log("Fetching current user...");

    const userId = await getAuthUserId(ctx);

    console.log("ctx:", ctx);

    if (userId === null) {
      return null;
    }

    console.log("Fetching user with ID:", userId);

    const user = await ctx.db.get(userId);

    const profilePictureUrl = user?.profile_picture
      ? await ctx.storage.getUrl(user.profile_picture)
      : null;

    console.log("Profile picture URL:", profilePictureUrl);

    return {
      ...user,
      profile_picture: profilePictureUrl,
    };
  },
});

export const getProfile = query({
  args: { id: v.optional(v.id("users")) },
  handler: async (ctx, { id }) => {
    let user_id = null;
    if (!id) {
      user_id = await getAuthUserId(ctx);
    } else {
      user_id = id;
    }

    if (!user_id) {
      throw new Error("No profile found");
    }

    const allPosts = await ctx.db.query("posts").collect();
    const posts = allPosts.filter((post) => post.author === user_id);
    const enriched = await Promise.all(
      posts.map(async (post) => {
        return {
          ...post,
          image: (await ctx.storage.getUrl(post.image)) as string,
        };
      })
    );

    const user = await ctx.db.get(user_id);

    const profilePictureUrl = user?.profile_picture
      ? await ctx.storage.getUrl(user.profile_picture)
      : null;

    return {
      user: {
        ...user,
        profile_picture: profilePictureUrl,
      },
      posts: enriched,
    };
  },
});

export const updateProfile = mutation({
  args: {
    username: v.optional(v.string()),
    first_name: v.string(),
    last_name: v.string(),
    phone: v.string(),
    address: v.string(),
    profile_picture: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db.get(userId);
    if (args.profile_picture && user?.profile_picture) {
      await ctx.storage.delete(user.profile_picture);
    }

    await ctx.db.patch(userId, {
      ...user,
      first_name: args.first_name ? args.first_name : user?.first_name,
      last_name: args.last_name ? args.last_name : user?.last_name,
      phone: args.phone ? args.phone : user?.phone,
      address: args.address ? args.address : user?.address,
      profile_picture: args.profile_picture
        ? args.profile_picture
        : user?.profile_picture,
      username: args.username ? args.username : user?.username,
    });
  },
});
