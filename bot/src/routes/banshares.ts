import { z } from "zod";
import api from "../api.js";
import bot, { channels } from "../bot.js";
import { banshareComponents } from "../lib/banshares.js";
import { snowflake } from "../schemas.js";
import { proc } from "../trpc.js";

export default {
    submitBanshare: proc
        .input(
            z.object({
                author: snowflake,
                mode: z.enum(["normal", "without-validation", "without-checks"]),
                ids: z.string(),
                reason: z.string().trim().max(250),
                evidence: z.string().trim().max(1000),
                server: snowflake,
                severity: z.enum(["P0", "P1", "P2", "DM"]),
                urgent: z.boolean(),
            }),
        )
        .output(z.string().nullable())
        .mutation(async ({ input: { author, mode, ids, reason, evidence, server, severity, urgent } }) => {
            const user = await bot.users.fetch(author);
            const guild = await api.getGuild.query(server);

            if (!guild) return "That server doesn't seem to exist in the network anymore.";
            if (!(await api.isStaffOf.query({ user: author, guild: server }))) return `You do not have permission to submit banshares from ${guild.name}.`;

            let idlist: string[] = [];

            if (mode === "normal" || mode === "without-validation") {
                idlist = Array.from(new Set(ids.trim().split(/\s+/))).sort((x, y) => Number(BigInt(x) - BigInt(y)));
                ids = idlist.join(" ");

                const error = await api.checkBanshareIDs.query(idlist);
                if (error) return error;
            }

            const tags: string[] = [];

            if (mode === "normal")
                for (const id of ids.trim().split(/\s+/))
                    try {
                        const user = await bot.users.fetch(id);

                        if (user.bot) return `User ID ${id} corresponds to a bot (${user.tag}) and cannot be banshared.`;

                        tags.push(user.tag);
                    } catch {
                        return `User ID ${id} is invalid.`;
                    }

            const message = await channels.banshares.send({
                embeds: [
                    {
                        title: "Banshare",
                        color: 0x2b2d31,
                        fields: [
                            { name: mode === "without-checks" || idlist.length !== 1 ? "IDs" : "ID", value: ids },
                            ...(mode === "normal" && tags.join(" ").length <= 1024
                                ? ([{ name: tags.length === 1 ? "Username" : "Usernames", value: tags.join(" ") }] as { name: string; value: string }[])
                                : []),
                            { name: "Reason", value: reason },
                            { name: "Evidence", value: evidence },
                            { name: "Submitted by", value: `${user} (${user.tag}) from ${guild.name}` },
                            { name: "Severity", value: severity === "DM" ? "DM Scam" : severity },
                        ],
                    },
                ],
                components: banshareComponents(severity),
            });

            await api.uploadBanshare.mutate({ message: message.id, author, guild: server, ids, list: idlist, reason, evidence, severity, urgent });

            const role = urgent ? process.env.ROLE_OBSERVER! : process.env.ROLE_BANSHARE_PING!;

            await channels.execManagement.send({
                content: `<@&${role}> A banshare was just posted; please review it here: ${message.url}`,
                allowedMentions: { roles: [role] },
            });

            return null;
        }),
} as const;
