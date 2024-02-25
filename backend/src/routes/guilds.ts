import { and, count, eq, or } from "drizzle-orm";
import db from "../db/db.js";
import { tables } from "../db/index.js";
import { snowflake } from "../schemas.js";
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
    getBanshareGuilds: proc.input(snowflake).query(async ({ input: user }) => {
        return await db
            .select({ name: tables.guilds.name, id: tables.guilds.id })
            .from(tables.guilds)
            .leftJoin(tables.guildUsers, eq(tables.guilds.id, tables.guildUsers.guild))
            .where(
                or(eq(tables.guilds.owner, user), eq(tables.guilds.advisor, user), and(eq(tables.guildUsers.user, user), eq(tables.guildUsers.staff, true))),
            );
    }),
    getGuild: proc.input(snowflake).query(async ({ input: id }) => {
        return (await db.select().from(tables.guilds).where(eq(tables.guilds.id, id))).at(0);
    }),
} as const;
