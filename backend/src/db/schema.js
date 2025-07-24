"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.subtasksRelations = exports.subtasks = exports.tasksRelations = exports.tasks = exports.projectsRelations = exports.projects = exports.statusEnum = exports.priorityEnum = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
exports.priorityEnum = (0, pg_core_1.pgEnum)('priority', ['low', 'medium', 'high']);
exports.statusEnum = (0, pg_core_1.pgEnum)('status', ['todo', 'in_progress', 'testing', 'implemented']);
exports.projects = (0, pg_core_2.pgTable)('projects', {
    id: (0, pg_core_2.integer)().primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_2.varchar)({ length: 255 }).notNull().unique(),
    description: (0, pg_core_2.varchar)({ length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { mode: 'string' }).defaultNow().notNull(),
});
exports.projectsRelations = (0, drizzle_orm_1.relations)(exports.projects, ({ many }) => ({
    tasks: many(exports.tasks),
}));
exports.tasks = (0, pg_core_2.pgTable)('tasks', {
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
    projectId: (0, pg_core_2.integer)('project_id').notNull().references(() => exports.projects.id, { onDelete: 'cascade' }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { mode: 'string' }).defaultNow().notNull(),
});
exports.tasksRelations = (0, drizzle_orm_1.relations)(exports.tasks, ({ one, many }) => ({
    projects: one(exports.projects, {
        fields: [exports.tasks.projectId],
        references: [exports.projects.id],
    }),
    subtasks: many(exports.subtasks),
}));
exports.subtasks = (0, pg_core_2.pgTable)('subtasks', {
    id: (0, pg_core_2.integer)().primaryKey().generatedByDefaultAsIdentity(),
    name: (0, pg_core_2.varchar)({ length: 255 }).notNull(),
    done: (0, pg_core_1.boolean)().notNull().default(false),
    taskId: (0, pg_core_2.integer)('task_id').notNull().references(() => exports.tasks.id, { onDelete: 'cascade' }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { mode: 'string' }).defaultNow().notNull(),
});
exports.subtasksRelations = (0, drizzle_orm_1.relations)(exports.subtasks, ({ one }) => ({
    tasks: one(exports.tasks, {
        fields: [exports.subtasks.taskId],
        references: [exports.tasks.id],
    }),
}));
exports.schema = {
    projects: exports.projects,
    tasks: exports.tasks,
    subtasks: exports.subtasks,
    projectsRelations: exports.projectsRelations,
    tasksRelations: exports.tasksRelations,
    subtasksRelations: exports.subtasksRelations,
};
