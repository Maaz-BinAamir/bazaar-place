import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    description: v.string(),
    image: v.string(),
    author_id: v.id("users"),
    location: v.string(),
    price: v.number(),
    status: v.string(),
  }),
  users: defineTable({
    email: v.string(),
    first_name: v.string(),
    last_name: v.string(),
    profile_picture: v.string(),
    phone: v.string(),
    address: v.string(),
  }),
});
