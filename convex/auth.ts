import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { MutationCtx } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        return {
          email: params.email as string,
          username: params.username as string,
        };
      },
    }),
  ],
  callbacks: {
    async createOrUpdateUser(ctx: MutationCtx, args) {
      // `args.profile` contains form data
      console.log("Profile data:", args);
      const email = args.profile.email as string;
      const username = args.profile.username as string;
      // if (!username) {
      //   throw new Error("Username is required");
      // }

      // If user already exists, return existing ID
      if (args.existingUserId) {
        return args.existingUserId;
      }

      // Insert user with required fields
      return await ctx.db.insert("users", {
        email,
        username,
      });
    },
  },
});
