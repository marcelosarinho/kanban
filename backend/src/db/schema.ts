import { boolean, decimal, doublePrecision, pgEnum, real, timestamp } from "drizzle-orm/pg-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);
const statusEnum = pgEnum('status', ['todo', 'in_progress', 'testing', 'implemented']);

export const projectsTable = pgTable('projects', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  description: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})

export const tasksTable = pgTable('tasks', {
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
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})