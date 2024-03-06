import { eq } from "drizzle-orm";
import { z } from "zod";
import db from "../db/db.js";
import { tables } from "../db/index.js";
import { proc } from "../trpc.js";

export default {
    getActivePolls: proc.query(async () => {
        return await db
            .select({ id: tables.polls.id, mode: tables.polls.mode, question: tables.polls.question, server: tables.polls.server, wave: tables.polls.wave })
            .from(tables.polls)
            .where(eq(tables.polls.closed, false));
    }),
    getVoters: proc.input(z.boolean()).query(async ({ input: restricted }) => {
        return (
            await db
                .select({ id: tables.users.id })
                .from(tables.users)
                .where(eq(restricted ? tables.users.voter : tables.users.council, true))
        ).map((x) => x.id);
    }),
} as const;
