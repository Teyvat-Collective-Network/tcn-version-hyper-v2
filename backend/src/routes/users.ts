import { eq } from "drizzle-orm";
import db from "../db/db.js";
import { tables } from "../db/index.js";
import { snowflake } from "../schemas.js";
import { proc } from "../trpc.js";

export default {
    getUser: proc.input(snowflake).query(async ({ input: id }) => {
        const query = await db.select().from(tables.users).where(eq(tables.users.id, id));
        return query.at(0) ?? { id, observer: false, observerSince: new Date(0), owner: false, advisor: false, voter: false, council: false, staff: false };
    }),
} as const;
