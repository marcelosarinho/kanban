import { relations } from "drizzle-orm";
import { boolean, jsonb, pgEnum, real, timestamp } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { DeviceInfo } from "@custom-types/login";

export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);
export const statusEnum = pgEnum('status', ['todo', 'in_progress', 'testing', 'implemented']);

export const projects = pgTable('projects', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  description: varchar('description', { length: 255 }).notNull(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasks = pgTable('tasks', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  priority: priorityEnum().notNull().default('low'),
  category: varchar('category', { length: 255 }),
  progress: real('progress').notNull().default(0),
  commentary: varchar('commentary', { length: 255 }),
  color: varchar('color', { length: 20 }),
  done: boolean('done').notNull().default(false),
  status: statusEnum().notNull(),
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  projects: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  subtasks: many(subtasks),
}));

export const subtasks = pgTable('subtasks', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  done: boolean('done').notNull().default(false),
  taskId: integer('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
});

export const subtasksRelations = relations(subtasks, ({ one }) => ({
  tasks: one(tasks, {
    fields: [subtasks.taskId],
    references: [tasks.id],
  }),
}));

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  verified: boolean('verified').notNull().default(false),
  verifyToken: varchar('verify_token', { length: 255 }),
  verifyTokenExpiry: timestamp('verify_token_expiry', { mode: 'string' }),
  forgotPasswordToken: varchar('forgot_password_token', { length: 255 }),
  forgotPasswordTokenExpiry: timestamp('forgot_password_token_expiry', { mode: 'string' }),
  verifyLoginToken: varchar('verify_login_token', { length: 255 }),
  lastVerifiedLogin: timestamp('last_verified_login', { mode: 'string' }),
  firstLoginVerify: boolean('first_login_verify').notNull().default(false),
  deviceInfo: jsonb('device_info').$type<DeviceInfo | null>(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

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