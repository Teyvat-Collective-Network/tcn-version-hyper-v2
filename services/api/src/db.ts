import { connect } from "@planetscale/database";
import { TCNUser } from "@teyvat-collective-network/shared-hyper-v2";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { users } from "./db-schemas.js";
import { getUserId } from "./transformation.js";

export const connection = connect({
    host: Bun.env.DATABASE_HOST,
    username: Bun.env.DATABASE_USERNAME,
    password: Bun.env.DATABASE_PASSWORD,
});

const db = drizzle(connection);

export async function isObserver(user: TCNUser | string) {
    const id = getUserId(user);
    if (id === Bun.env.OWNER) return true;

    const [entry] = await db.select({ observer: users.observer }).from(users).where(eq(users.id, id));
    return entry?.observer ?? false;
}
