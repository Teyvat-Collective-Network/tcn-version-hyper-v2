import db from "../db/db.js";
import { tables } from "../db/index.js";
import { snowflake } from "../schemas.js";
import { proc } from "../trpc.js";

export default {
    makeMeStaff: proc.input(snowflake).mutation(async ({ input: user }) => {
        const guilds = await db.select({ id: tables.guilds.id }).from(tables.guilds);
        if (guilds.length > 0)
            await db
                .insert(tables.guildUsers)
                .values(guilds.map(({ id }) => ({ guild: id, user, staff: true })))
                .onDuplicateKeyUpdate({ set: { staff: true } });
    }),
} as const;
