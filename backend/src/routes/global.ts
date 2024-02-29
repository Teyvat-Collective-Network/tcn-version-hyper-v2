import { sql } from "drizzle-orm";
import { z } from "zod";
import db from "../db/db.js";
import { tables } from "../db/index.js";
import { snowflake } from "../schemas.js";
import { proc } from "../trpc.js";

export default {
    globalBan: proc
        .input(z.object({ id: z.number().int().min(1), user: snowflake, guild: snowflake.nullable() }))
        .mutation(async ({ input: { id, user, guild } }) => {
            if (guild)
                await db
                    .insert(tables.globalConnectionBans)
                    .values({ id, guild, user })
                    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
            else
                await db
                    .insert(tables.globalChannelBans)
                    .values({ id, user })
                    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
        }),
} as const;
