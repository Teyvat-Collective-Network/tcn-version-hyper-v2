import { and, eq, inArray, isNull, or } from "drizzle-orm";
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
    fetchBanshare: proc.input(snowflake).query(async ({ input: message }) => {
        const query = await db.select().from(tables.banshares).where(eq(tables.banshares.message, message));
        return query.at(0);
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
    transitionBanshare: proc
        .input(z.object({ message: snowflake, user: snowflake, action: z.enum(["reject", "publish", "rescind"]) }))
        .mutation(async ({ input: { message, user, action } }) => {
            const { rowsAffected } = await db
                .update(tables.banshares)
                .set({ status: `${action}ed` })
                .where(
                    and(
                        eq(tables.banshares.message, message),
                        eq(tables.banshares.status, ({ reject: "pending", publish: "pending", rescind: "published" } as const)[action]),
                    ),
                );

            if (rowsAffected === 0) return false;

            await db.insert(tables.auditLogs).values({ action: `banshare/${action}`, user, data: { message } });

            return true;
        }),
    fetchBanshareTargets: proc.input(z.enum(["DM", "P0", "P1", "P2"])).query(async ({ input: severity }) => {
        return await db
            .select({
                channel: tables.banshareSettings.channel,
                noButton: tables.banshareSettings.noButton,
                blockDMs: tables.banshareSettings.blockDMs,
                autobanMember: tables.banshareAutobanSettings.member,
                autobanNonmember: tables.banshareAutobanSettings.nonmember,
            })
            .from(tables.banshareSettings)
            .rightJoin(tables.guilds, eq(tables.banshareSettings.guild, tables.guilds.id))
            .leftJoin(tables.banshareAutobanSettings, eq(tables.banshareAutobanSettings.guild, tables.banshareSettings.guild))
            .where(or(isNull(tables.banshareAutobanSettings.severity), eq(tables.banshareAutobanSettings.severity, severity)));
    }),
} as const;
