import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import db from "../db/db.js";
import { tables } from "../db/index.js";
import { snowflake } from "../schemas.js";
import { proc } from "../trpc.js";

export default {
    checkBanshareIDs: proc
        .input(snowflake.array())
        .output(z.string().nullable())
        .query(async ({ input: ids }) => {
            const councilMembers = await db
                .select({ id: tables.users.id })
                .from(tables.users)
                .where(and(inArray(tables.users.id, ids), eq(tables.users.council, true)));

            if (councilMembers.length > 0)
                return `The following user ID${
                    councilMembers.length === 1 ? " corresponds to a council member" : "s correspond to council members"
                }: ${councilMembers.map((x) => x.id).join(", ")}. Please contact an observer if this is justified.`;

            return null;
        }),
    uploadBanshare: proc
        .input(
            z.object({
                message: snowflake,
                author: snowflake,
                guild: snowflake,
                ids: z.string(),
                reason: z.string(),
                evidence: z.string(),
                severity: z.enum(["P0", "P1", "P2", "DM"]),
                urgent: z.boolean(),
            }),
        )
        .mutation(async ({ input }) => {
            await db.insert(tables.banshares).values({ ...input, created: new Date(), reminded: new Date(), status: "pending" });
        }),
    changeBanshareSeverity: proc
        .input(z.object({ user: snowflake, message: snowflake, severity: z.enum(["P0", "P1", "P2", "DM"]) }))
        .mutation(async ({ input: { user, message, severity } }) => {
            await db.update(tables.banshares).set({ severity }).where(eq(tables.banshares.message, message));
            await db.insert(tables.auditLogs).values({ action: "banshare/change-severity", user, data: { message, severity } });
        }),
    setBanshareChannel: proc.input(z.object({ guild: snowflake, channel: snowflake.nullable() })).mutation(async ({ input: { guild, channel } }) => {
        await db.insert(tables.banshareSettings).values({ guild, channel }).onDuplicateKeyUpdate({ set: { channel } });
    }),
    rejectBanshare: proc.input(z.object({ message: snowflake, user: snowflake })).mutation(async ({ input: { message, user } }) => {
        const { rowsAffected } = await db
            .update(tables.banshares)
            .set({ status: "rejected" })
            .where(and(eq(tables.banshares.message, message), eq(tables.banshares.status, "pending")));

        if (rowsAffected === 0) return false;

        await db.insert(tables.auditLogs).values({ action: "banshare/reject", user, data: { message } });

        return true;
    }),
} as const;