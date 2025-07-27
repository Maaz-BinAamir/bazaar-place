import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

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

    return await ctx.db.get(userId);
  },
});
