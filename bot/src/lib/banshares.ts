import { BaseMessageOptions, ButtonStyle, ChatInputCommandInteraction, ComponentType, Guild, Message, User } from "discord.js";
import api from "../api.js";
import bot, { channels } from "../bot.js";

export async function ensureCanUseBanshareSettings(cmd: ChatInputCommandInteraction) {
    if (!(await api.isTCNGuild.query(cmd.guild!.id))) throw "Only TCN servers may use the banshare feature.";

    if (cmd.user.id !== cmd.guild?.ownerId && !(await api.isObserver.query(cmd.user.id)))
        throw "Only the owner of this server may update the banshare settings.";
}

export function banshareComponents(severity: string): BaseMessageOptions["components"] {
    return [
        {
            type: ComponentType.ActionRow,
            components: [
                {
                    type: ComponentType.StringSelect,
                    customId: `::banshare/menu`,
                    placeholder: "Select an action",
                    options: [
                        ...(
                            [
                                ["P0", "🟥"],
                                ["P1", "🟦"],
                                ["P2", "🟩"],
                                ["DM", "⬛"],
                            ] as const
                        )
                            .filter(([label]) => severity !== label)
                            .map(([label, emoji]) => ({
                                label,
                                emoji,
                                value: `change-severity/${label}`,
                            })),
                        { label: "Publish & Global Ban", emoji: "✅", value: "publish/global" },
                        { label: "Publish", emoji: "☑", value: "publish/normal" },
                        { label: "Reject", emoji: "❌", value: "reject" },
                    ],
                },
            ],
        },
    ];
}

export async function fetchAutobanTargets(guild: Guild, ids: string[], autobanMember: boolean, autobanNonmember: boolean): Promise<string[]> {
    if (autobanMember && autobanNonmember) return ids;
    if (!autobanMember && !autobanNonmember) return [];

    const output: string[] = [];

    for (const id of ids) {
        const member = await guild.members.fetch({ user: id, force: true }).catch(() => null);
        if (!!member === autobanMember) output.push(id);
    }

    return output;
}

export async function executeBanshare(target: Message, mod: User, banshare: { message: string; list: string[]; reason: string }): Promise<string[]> {
    const guild = target.guild;
    if (!guild) throw "Unexpected error: not in a guild.";

    const banned: string[] = [];
    const failed: string[] = [];

    for (const id of banshare.list)
        try {
            await guild.bans.create(id, { reason: `TCN Banshare: ${banshare.reason}` });
            banned.push(id);
        } catch {
            failed.push(id);
        }

    const logIDs = await api.fetchBanshareLogs.query(guild.id).catch(() => []);
    if (logIDs.length === 0) return [];

    let string = `TCN Banshare Executed: ${target.url}\nExecuted By: ${mod}\nBanned: ${banned.map((x) => `<@${x}>`).join(" ") || "N/A"}\nFailed: ${
        failed.map((x) => `<@${x}>`).join(" ") || "N/A"
    }`;

    const file = string.length > 2000;

    if (file)
        string = `TCN Banshare Executed: ${target.url}\nExecuted By: ${mod.tag} (${mod.id})\nBanned: ${banned.join(" ") || "N/A"}\nFailed: ${
            failed.join(" ") || "N/A"
        }`;

    for (const log of logIDs) {
        const channel = await bot.channels.fetch(log).catch(() => null);
        if (!channel?.isTextBased()) return banned;

        await channel.send(file ? { files: [{ name: "banshare-log.txt", attachment: Buffer.from(string) }] } : { content: string }).catch(() => null);
    }

    return banned;
}

export async function updateBanshareDashboard() {
    const pending = await api.fetchPendingBanshares.query();

    const text =
        pending
            .map((banshare) => `- ${channels.banshares.url}/${banshare.message} (${banshare.severity}) ${banshare.urgent ? "— **urgent**" : ""}`)
            .join("\n") || "No pending banshares at this time.";

    const message = (await channels.banshareDashboard.messages.fetch({ limit: 1 }).catch(console.error))?.first();

    if (message) await message.edit(text).catch(console.error);
    else await channels.banshareDashboard.send(text).catch(console.error);
}

export async function renderBanshareSettings(guild: Guild): Promise<BaseMessageOptions> {
    const settings = await api.getBanshareSettings.query(guild.id);

    return {
        embeds: [
            {
                title: "Banshare Settings",
                color: 0x2b2d31,
                fields: [
                    {
                        name: "Block DMs",
                        value: `${settings.blockDMs ? "Disable" : "Enable"} this setting to ${
                            settings.blockDMs ? "resume" : "stop"
                        } receiving banshares with the DM Scam severity.`,
                    },
                    {
                        name: "No Button",
                        value: `${settings.noButton ? "Disable" : "Enable"} this setting to ${
                            settings.noButton ? "show" : "remove"
                        } the ban button (appears on banshares that aren't automatically executed that allow modos to execuute the banshare easily).`,
                    },
                    {
                        name: "Daedalus Integrationo",
                        value: `${settings.daedalus ? "Disable" : "Enable"} this setting to ${
                            settings.daedalus ? "stop adding" : "automatically add"
                        } banshares into Daedalus user history.`,
                    },
                    {
                        name: "Autoban",
                        value: "Use the dropdown menu below to control autoban thresholds.",
                    },
                ],
            },
        ],
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        style: settings.blockDMs ? ButtonStyle.Success : ButtonStyle.Danger,
                        customId: `::banshare/settings:blockDMs:${!settings.blockDMs}`,
                        label: `Block DMs: ${settings.blockDMs ? "on" : "off"}`,
                    },
                    {
                        type: ComponentType.Button,
                        style: settings.noButton ? ButtonStyle.Success : ButtonStyle.Danger,
                        customId: `::banshare/settings:noButton:${!settings.noButton}`,
                        label: `No Button: ${settings.noButton ? "on" : "off"}`,
                    },
                    {
                        type: ComponentType.Button,
                        style: settings.daedalus ? ButtonStyle.Success : ButtonStyle.Danger,
                        customId: `::banshare/settings:daedalus:${!settings.daedalus}`,
                        label: `Daedalus Integration: ${settings.daedalus ? "on" : "off"}`,
                    },
                ],
            },
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.StringSelect,
                        customId: `::banshare/settings/autoban`,
                        minValues: 0,
                        maxValues: 8,
                        options: ["members", "non-members"].flatMap((type) =>
                            (["P0", "P1", "P2", "DM"] as const).map((severity) => ({
                                label: `${severity} against ${type}`,
                                value: `${severity}-${type}`,
                                default: settings.autoban[severity][type === "members" ? 0 : 1],
                            })),
                        ),
                    },
                ],
            },
        ],
    };
}
