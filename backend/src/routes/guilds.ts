import { count } from "drizzle-orm";
import db from "../db/db.js";
import { tables } from "../db/index.js";
import { proc } from "../trpc.js";

export default {
    getGuildCount: proc.query(async () => {
        const query = await db.select({ count: count() }).from(tables.guilds);
        return query[0].count;
    }),
} as const;
