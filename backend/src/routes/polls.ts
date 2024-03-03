import { eq } from "drizzle-orm";
import db from "../db/db.js";
import { tables } from "../db/index.js";
import { proc } from "../trpc.js";

export default {
    getActivePolls: proc.query(async () => {
        return await db.select().from(tables.polls).where(eq(tables.polls.closed, false));
    }),
} as const;
