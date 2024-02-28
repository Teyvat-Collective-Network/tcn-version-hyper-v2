import { and, count, eq, or } from "drizzle-orm";
import { z } from "zod";
import db from "../db/db.js";
import { tables } from "../db/index.js";
import { snowflake } from "../schemas.js";
import { proc } from "../trpc.js";

export default {
    getUser: proc.input(snowflake).query(async ({ input: id }) => {
        const query = await db.select().from(tables.users).where(eq(tables.users.id, id));
        return query.at(0) ?? { id, observer: false, observerSince: new Date(0), owner: false, advisor: false, voter: false, council: false, staff: false };
    }),
    getObservers: proc.query(async () => {
        const ids = (await db.select({ id: tables.users.id }).from(tables.users).where(eq(tables.users.observer, true))).map(({ id }) => id);
        return [process.env.OWNER!, ...ids.filter((x) => x !== process.env.OWNER)];
    }),
    isObserver: proc.input(snowflake).query(async ({ input: user }) => {
        if (user === process.env.OWNER) return true;
        const query = await db.select({ observer: tables.users.observer }).from(tables.users).where(eq(tables.users.id, user));
        const item = query.at(0);
        return item ? item.observer : false;
    }),
    isStaffOf: proc.input(z.object({ user: snowflake, guild: snowflake })).query(async ({ input: { user, guild } }) => {
        const query = await db
            .select({ count: count() })
            .from(tables.guilds)
            .leftJoin(tables.guildUsers, eq(tables.guilds.id, tables.guildUsers.guild))
            .where(
                and(
                    eq(tables.guilds.id, guild),
                    or(
                        eq(tables.guilds.owner, user),
                        eq(tables.guilds.advisor, user),
                        and(eq(tables.guildUsers.user, user), eq(tables.guildUsers.staff, true)),
                    ),
                ),
            );

        return query[0].count > 0;
    }),
} as const;
