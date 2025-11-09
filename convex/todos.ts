import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect();
  },
});

export const addTodo = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("todos", {
      title: args.title,
      completed: false,
    });
    return taskId;
  },
});

export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const { id } = args;
    const todo = await ctx.db.get(id);

    await ctx.db.patch(id, { completed: !todo?.completed });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
