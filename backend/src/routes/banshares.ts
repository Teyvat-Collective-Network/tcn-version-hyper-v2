import { and, eq, inArray, isNotNull, isNull, lt, or, sql } from "drizzle-orm";
import { z } from "zod";
import db from "../db/db.js";
import { tables } from "../db/index.js";
import { snowflake } from "../schemas.js";
import { proc } from "../trpc.js";

async function getBanshare(message: string) {
    const query = await db.select().from(tables.banshares).where(eq(tables.banshares.message, message));

    const banshare = query.at(0);
    if (!banshare) return null;

    return {
        ...banshare,
        list: (await db.select({ user: tables.banshareIds.user }).from(tables.banshareIds).where(eq(tables.banshareIds.message, message))).map((x) => x.user),
    };
}

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
        return await getBanshare(message);
    }),
    getBanshareFromCrosspost: proc.input(snowflake).query(async ({ input: message }) => {
        const query = await db
            .select({ origin: tables.banshareCrossposts.origin })
            .from(tables.banshareCrossposts)
            .where(eq(tables.banshareCrossposts.message, message));

        const item = query.at(0);
        if (!item) return null;

        return await getBanshare(item.origin);
    }),
    uploadBanshare: proc
        .input(
            z.object({
                message: snowflake,
                author: snowflake,
                guild: snowflake,
                ids: z.string(),
                list: snowflake.array(),
                reason: z.string(),
                evidence: z.string(),
                severity: z.enum(["P0", "P1", "P2", "DM"]),
                urgent: z.boolean(),
            }),
        )
        .mutation(async ({ input: { list, ...input } }) => {
            await db.insert(tables.banshares).values({ ...input, created: new Date(), reminded: new Date(), status: "pending" });
            if (list.length > 0) await db.insert(tables.banshareIds).values(list.map((user) => ({ message: input.message, user })));
        }),
    addBanshareCrosspost: proc
        .input(z.object({ origin: snowflake, guild: snowflake, channel: snowflake, message: snowflake, executed: z.boolean(), remaining: snowflake.array() }))
        .mutation(async ({ input: { remaining, ...input } }) => {
            await db.insert(tables.banshareCrossposts).values(input);

            if (remaining.length > 0)
                await db.insert(tables.remainingBanshareTargets).values(remaining.map((user) => ({ guild: input.guild, origin: input.origin, user })));
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
        .input(z.object({ message: snowflake, user: snowflake, action: z.enum(["reject", "publish", "rescind"]), reason: z.string().optional() }))
        .mutation(async ({ input: { message, user, action, reason } }) => {
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

            await db.insert(tables.auditLogs).values({ action: `banshare/${action}`, user, data: { message }, reason });

            return true;
        }),
    fetchBanshareTargets: proc.input(z.enum(["DM", "P0", "P1", "P2"])).query(async ({ input: severity }) => {
        return await db
            .select({
                guild: tables.guilds.id,
                name: tables.guilds.name,
                invite: tables.guilds.invite,
                channel: tables.banshareSettings.channel,
                noButton: tables.banshareSettings.noButton,
                blockDMs: tables.banshareSettings.blockDMs,
                autobanMember: tables.banshareAutobanSettings.member,
                autobanNonmember: tables.banshareAutobanSettings.nonmember,
            })
            .from(tables.banshareSettings)
            .rightJoin(tables.guilds, eq(tables.banshareSettings.guild, tables.guilds.id))
            .leftJoin(tables.banshareAutobanSettings, eq(tables.banshareAutobanSettings.guild, tables.banshareSettings.guild))
            .where(
                and(
                    isNotNull(tables.banshareSettings.channel),
                    or(isNull(tables.banshareAutobanSettings.severity), eq(tables.banshareAutobanSettings.severity, severity)),
                ),
            );
    }),
    fetchBanshareLogs: proc.input(snowflake).query(async ({ input: guild }) => {
        return (await db.select({ channel: tables.banshareLogs.channel }).from(tables.banshareLogs).where(eq(tables.banshareLogs.guild, guild))).map(
            (x) => x.channel,
        );
    }),
    executeBanshare: proc.input(snowflake).mutation(async ({ input: message }) => {
        const { rowsAffected } = await db
            .update(tables.banshareCrossposts)
            .set({ executed: true })
            .where(and(eq(tables.banshareCrossposts.message, message), eq(tables.banshareCrossposts.executed, false)));

        return rowsAffected !== 0;
    }),
    fetchBanshareRemainingTargets: proc.input(z.object({ guild: snowflake, message: snowflake })).query(async ({ input: { guild, message } }) => {
        const query = await db
            .select({ user: tables.remainingBanshareTargets.user })
            .from(tables.remainingBanshareTargets)
            .where(and(eq(tables.remainingBanshareTargets.origin, message), eq(tables.remainingBanshareTargets.guild, guild)));

        return query.map((x) => x.user);
    }),
    fetchBanshareCrossposts: proc.input(snowflake).query(async ({ input: origin }) => {
        return await db
            .select({ channel: tables.banshareCrossposts.channel, message: tables.banshareCrossposts.message })
            .from(tables.banshareCrossposts)
            .where(eq(tables.banshareCrossposts.origin, origin));
    }),
    fetchPendingBanshares: proc.query(async () => {
        return await db
            .select({ message: tables.banshares.message, severity: tables.banshares.severity, urgent: tables.banshares.urgent })
            .from(tables.banshares)
            .where(eq(tables.banshares.status, "pending"));
    }),
    processOverdueBanshares: proc.mutation(async () => {
        const { rowsAffected } = await db
            .update(tables.banshares)
            .set({ reminded: new Date() })
            .where(
                and(
                    eq(tables.banshares.status, "pending"),
                    or(
                        and(eq(tables.banshares.urgent, true), lt(tables.banshares.reminded, new Date(Date.now() - 7200000))),
                        and(eq(tables.banshares.urgent, false), lt(tables.banshares.reminded, new Date(Date.now() - 21600000))),
                    ),
                ),
            );

        return rowsAffected > 0;
    }),
    addBanshareLoggingChannel: proc.input(z.object({ guild: snowflake, channel: snowflake })).mutation(async ({ input }) => {
        await db
            .insert(tables.banshareLogs)
            .values(input)
            .onDuplicateKeyUpdate({ set: { guild: sql`guild` } });
    }),
    removeBanshareLoggingChannel: proc.input(z.object({ guild: snowflake, channel: snowflake })).mutation(async ({ input: { guild, channel } }) => {
        const { rowsAffected } = await db
            .delete(tables.banshareLogs)
            .where(and(eq(tables.banshareLogs.guild, guild), eq(tables.banshareLogs.channel, channel)));

        return rowsAffected > 0;
    }),
} as const;
