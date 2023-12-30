import { connect } from "@planetscale/database";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { users } from "./db-schemas.js";

export const connection = connect({
    host: Bun.env.DATABASE_HOST,
    username: Bun.env.DATABASE_USERNAME,
    password: Bun.env.DATABASE_PASSWORD,
});

const db = drizzle(connection);

export async function isObserver(id: string): Promise<boolean> {
    if (id === Bun.env.OWNER) return true;

    const [entry] = await db.select({ observer: users.observer }).from(users).where(eq(users.id, id));
    return entry?.observer ?? false;
}
