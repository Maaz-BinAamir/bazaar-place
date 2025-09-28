import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  posts: defineTable({
    author: v.id("users"),
    title: v.string(),
    description: v.string(),
    image: v.id("_storage"),
    location: v.string(),
    price: v.number(),
    status: v.string(),
  }),
  users: defineTable({
    username: v.optional(v.string()),
    email: v.string(),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    profile_picture: v.optional(v.id("_storage")),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
  }),
  conversations: defineTable({
    post: v.id("posts"),
    buyer: v.id("users"),
    seller: v.id("users"),
    is_closed: v.boolean(),
  }),
  messages: defineTable({
    conversation: v.id("conversations"),
    sender: v.id("users"),
    content: v.union(v.string(), v.id("_storage")),
    timestamp: v.number(),
    read: v.boolean(),
  }).index("by_conversation", ["conversation", "timestamp"]),
});
