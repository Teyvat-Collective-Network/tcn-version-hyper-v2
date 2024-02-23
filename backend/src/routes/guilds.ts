import { count, eq } from "drizzle-orm";
import db from "../db/db.js";
import { tables } from "../db/index.js";
import { proc } from "../trpc.js";

export default {
    getGuildCount: proc.query(async () => {
        const query = await db.select({ count: count() }).from(tables.guilds);
        return query[0].count;
    }),
    getPartnerPage: proc.query(async () => {
        return await db
            .select({
                id: tables.guilds.id,
                name: tables.guilds.name,
                mascot: tables.guilds.mascot,
                invite: tables.guilds.invite,
                image: tables.characters.image,
            })
            .from(tables.guilds)
            .leftJoin(tables.characters, eq(tables.guilds.mascot, tables.characters.id));
    }),
} as const;
