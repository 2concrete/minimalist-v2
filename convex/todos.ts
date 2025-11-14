import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return;
    }

    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const addTodo = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return;
    }

    const taskId = await ctx.db.insert("todos", {
      title: args.title,
      completed: false,
      userId: identity.subject,
    });
    return taskId;
  },
});

export const migrateTodos = mutation({
  args: {
    todos: v.array(
      v.object({
        title: v.string(),
        completed: v.boolean(),
        uuid: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { todos } = args;

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return;
    }

    for (const todo of todos) {
      const id = await ctx.db.insert("todos", {
        userId: identity?.subject,
        title: todo.title,
        completed: todo.completed,
      });
    }
  },
});

export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return;
    }

    const { id } = args;
    const todo = await ctx.db.get(id);

    if (!todo) {
      throw new Error("Todo not found");
    }

    // Critical: verify the todo belongs to the current user
    if (todo.userId !== identity.subject) {
      throw new Error("Unauthorized - you can only toggle your own todos");
    }

    await ctx.db.patch(id, { completed: !todo.completed });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return;
    }

    const todo = await ctx.db.get(args.id);

    if (!todo) {
      throw new Error("Todo not found");
    }

    // Critical: verify the todo belongs to the current user
    if (todo.userId !== identity.subject) {
      return;
    }

    await ctx.db.delete(args.id);
  },
});
