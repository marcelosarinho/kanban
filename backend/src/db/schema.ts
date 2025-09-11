import { relations } from "drizzle-orm";
import { boolean, pgEnum, real, timestamp } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);
export const statusEnum = pgEnum('status', ['todo', 'in_progress', 'testing', 'implemented']);

export const projects = pgTable('projects', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }).notNull(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})

export const projectsRelations = relations(projects, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasks = pgTable('tasks', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  priority: priorityEnum().notNull().default('low'),
  category: varchar({ length: 255 }),
  progress: real().notNull().default(0),
  commentary: varchar({ length: 255 }),
  color: varchar({ length: 20 }),
  done: boolean().notNull().default(false),
  status: statusEnum().notNull(),
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  projects: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  subtasks: many(subtasks),
}));

export const subtasks = pgTable('subtasks', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  done: boolean().notNull().default(false),
  taskId: integer('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})

export const subtasksRelations = relations(subtasks, ({ one }) => ({
  tasks: one(tasks, {
    fields: [subtasks.taskId],
    references: [tasks.id],
  }),
}));

export const users = pgTable('users', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  verified: boolean().notNull().default(false),
  verifyToken: varchar('verify_token', { length: 255 }),
  verifyTokenExpiry: timestamp('verify_token_expiry', { mode: 'string' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}))

export const schema = {
  projects,
  tasks,
  subtasks,
  projectsRelations,
  tasksRelations,
  subtasksRelations,
  users,
  usersRelations,
};