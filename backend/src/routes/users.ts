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
    getObservers: proc.query(async () => {
        const ids = (await db.select({ id: tables.users.id }).from(tables.users).where(eq(tables.users.observer, true))).map(({ id }) => id);
        return [process.env.OWNER!, ...ids.filter((x) => x !== process.env.OWNER)];
    }),
} as const;
