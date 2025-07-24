"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema_1 = require("./db/schema");
exports.db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL, { schema: schema_1.schema });
