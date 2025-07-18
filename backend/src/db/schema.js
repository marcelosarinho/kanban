"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtasksRelations = exports.subtasksTable = exports.tasksRelations = exports.tasksTable = exports.projectsRelations = exports.projectsTable = exports.statusEnum = exports.priorityEnum = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
exports.priorityEnum = (0, pg_core_1.pgEnum)('priority', ['low', 'medium', 'high']);
exports.statusEnum = (0, pg_core_1.pgEnum)('status', ['todo', 'in_progress', 'testing', 'implemented']);
exports.projectsTable = (0, pg_core_2.pgTable)('projects', {
    id: (0, pg_core_2.integer)().primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_2.varchar)({ length: 255 }).notNull().unique(),
    description: (0, pg_core_2.varchar)({ length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { mode: 'string' }).defaultNow().notNull(),
});
exports.projectsRelations = (0, drizzle_orm_1.relations)(exports.projectsTable, ({ many }) => ({
    tasks: many(exports.tasksTable),
}));
exports.tasksTable = (0, pg_core_2.pgTable)('tasks', {
    id: (0, pg_core_2.integer)().primaryKey().generatedByDefaultAsIdentity(),
    name: (0, pg_core_2.varchar)({ length: 255 }).notNull(),
    description: (0, pg_core_2.varchar)({ length: 255 }),
    priority: (0, exports.priorityEnum)().notNull().default('low'),
    category: (0, pg_core_2.varchar)({ length: 255 }),
    progress: (0, pg_core_1.real)().notNull().default(0),
    commentary: (0, pg_core_2.varchar)({ length: 255 }),
    color: (0, pg_core_2.varchar)({ length: 20 }),
    done: (0, pg_core_1.boolean)().notNull().default(false),
    status: (0, exports.statusEnum)().notNull(),
    projectId: (0, pg_core_2.integer)('project_id').notNull().references(() => exports.projectsTable.id, { onDelete: 'cascade' }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { mode: 'string' }).defaultNow().notNull(),
});
exports.tasksRelations = (0, drizzle_orm_1.relations)(exports.tasksTable, ({ one, many }) => ({
    projects: one(exports.projectsTable, {
        fields: [exports.tasksTable.projectId],
        references: [exports.projectsTable.id],
    }),
    subtasks: many(exports.subtasksTable),
}));
exports.subtasksTable = (0, pg_core_2.pgTable)('subtasks', {
    id: (0, pg_core_2.integer)().primaryKey().generatedByDefaultAsIdentity(),
    name: (0, pg_core_2.varchar)({ length: 255 }).notNull(),
    done: (0, pg_core_1.boolean)().notNull().default(false),
    taskId: (0, pg_core_2.integer)('task_id').notNull().references(() => exports.tasksTable.id, { onDelete: 'cascade' }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { mode: 'string' }).defaultNow().notNull(),
});
exports.subtasksRelations = (0, drizzle_orm_1.relations)(exports.subtasksTable, ({ one }) => ({
    tasks: one(exports.tasksTable, {
        fields: [exports.subtasksTable.taskId],
        references: [exports.tasksTable.id],
    }),
}));
