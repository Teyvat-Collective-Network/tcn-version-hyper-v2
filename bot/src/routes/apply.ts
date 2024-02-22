import { Invite, escapeMarkdown } from "discord.js";
import { z } from "zod";
import bot, { channels } from "../bot.js";
import { timestamp } from "../lib/format.js";
import { snowflake } from "../schemas.js";
import { proc } from "../trpc.js";

async function fetchInvite(input: string): Promise<string | Invite> {
    const invite = await bot.fetchInvite(input).catch(() => null);
    if (!invite?.guild) return "That invite does not seem to be valid!";

    if (invite.guild.vanityURLCode === invite.code) return "Please provide a non-vanity invite!";
    if (invite.expiresAt) return "Please provide a permanent invite!";
    if (invite.temporary) return "Please provide a non-temporary invite!";
    if (invite.targetApplication || invite.targetType || invite.targetUser)
        return "Please provide a general invite that does not point to an application/user!";

    return invite;
}

export default {
    fetchInvite: proc
        .input(z.string())
        .output(z.union([z.string(), z.object({ name: z.string(), icon: z.string().nullable() })]))
        .query(async ({ input }) => {
            const invite = await fetchInvite(input);
            if (typeof invite === "string") return invite;
            return { name: invite.guild!.name, icon: invite.guild!.iconURL({ forceStatic: true, size: 128 }) };
        }),
    submitApplication: proc
        .input(
            z.object({
                user: snowflake.nullable(),
                invite: z.string(),
                character: z.string().max(64),
                role: z.enum(["owner", "admin", "mod", "other"]),
                experience: z.string().max(1024),
                goals: z.string().min(1).max(1024),
                history: z.string().min(1).max(1024),
                additional: z.string().max(1024),
            }),
        )
        .output(z.string().nullable())
        .mutation(async ({ input }) => {
            if (!input.user)
                return "It seems you got logged out. Please copy your work to another location and try reloading the page and signing in if needed.";

            const user = await bot.users.fetch(input.user).catch(() => null);
            if (!user) return "Invalid user ID. This sounds like a bug, unless you deleted your account during your application. Please contact an observer.";

            const invite = await fetchInvite(input.invite);

            if (typeof invite === "string")
                return "Your invite seems to have become invalid during the application process. Please go back to the start and fix it.";

            const guild = invite.guild!;

            const channel = await channels.applicants.threads.create({
                name: guild.name,
                message: {
                    embeds: [
                        {
                            title: "New Application",
                            description: `${user} applied for **${escapeMarkdown(guild.name)}** (\`${guild.id}\`). The server has ${
                                invite.memberCount
                            } members and was created ${timestamp(guild.createdAt, "R")}`,
                            color: 0x2b2d31,
                            fields: [{ name: "Invite", value: invite.url }],
                        },
                    ],
                },
                appliedTags: [process.env.APPLICANT_TAG!],
            });

            const message = await channel.send({
                embeds: [
                    {
                        color: 0x2b2d31,
                        fields: [
                            { name: "Prior Experience", value: input.experience || "N/A" },
                            { name: "Future Goals", value: input.goals },
                            { name: "Server History", value: input.history },
                            { name: "Additional Questions/Comments", value: input.additional || "N/A" },
                        ],
                    },
                ],
            });

            await message.pin();

            await channels.officialBusiness.send({
                content: `<@&${process.env.ROLE_NEW_APPLICANTS}> ${user} applied for **${escapeMarkdown(guild.name)}**. Please check out the application in ${
                    channels.applicants
                } here: ${channel.url}`,
                allowedMentions: { roles: [process.env.ROLE_NEW_APPLICANTS!] },
            });

            return null;
        }),
} as const;
