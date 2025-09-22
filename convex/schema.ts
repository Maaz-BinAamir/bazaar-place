import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  posts: defineTable({
    title: v.string(),
    description: v.string(),
    image: v.id("_storage"),
    author_id: v.id("users"),
    location: v.string(),
    price: v.number(),
    status: v.string(),
  }),
  users: defineTable({
    username: v.string(),
    email: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    profile_picture: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
  }),
});
