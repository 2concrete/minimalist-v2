import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    userId: v.string(),
    title: v.string(),
    completed: v.boolean(),
  }),
});
