import { ButtonInteraction, ButtonStyle, ComponentType } from "discord.js";
import api from "../../../api.js";
import bot, { channels } from "../../../bot.js";
import { executeBanshare, fetchAutobanTargets, updateBanshareDashboard } from "../../../lib/banshares.js";
import { template } from "../../../lib/format.js";
import { greyButton, greyButtonItem } from "../../../lib/responses.js";

export default async function (button: ButtonInteraction, mode: string) {
    await button.deferUpdate();
    if (!(await api.isObserver.query(button.user.id))) throw "You are not an observer.";

    const message = await button.message.fetchReference().catch(() => null);
    if (!message) throw "An unexpected error has occurred.";

    const published = await api.transitionBanshare.mutate({ user: button.user.id, message: message.id, action: "publish" });
    if (!published) throw "This banshare is no longer pending.";

    const banshare = await api.fetchBanshare.query(message.id);
    if (!banshare) throw "No banshare was returned from the database. This error should not be possible.";

    await button.editReply(template.progress("This banshare is being published. You may now dismiss this message."));

    const targets = await api.fetchBanshareTargets.query(banshare.severity);

    await message.edit(greyButton(`Publishing (0 / ${targets.length})`));
    await channels.logs.send(`${message.url} is being published by ${button.user}.`).catch(() => null);
    await updateBanshareDashboard();

    for (let index = 0; index < targets.length; index++) {
        const target = targets[index];

        try {
            const guild = await bot.guilds.fetch(target.guild!).catch(() => null);
            if (!guild) continue;

            const channel = await guild.channels.fetch(target.channel!).catch(() => null);

            if (!channel) throw "Could not fetch the channel. Check permissions, or perhaps the channel has been deleted.";
            if (!channel.isTextBased()) throw "Channel type is invalid; this error should not be possible.";

            const autobanTargets = await fetchAutobanTargets(guild, banshare.list, target.autobanMember ?? false, target.autobanNonmember ?? false);

            const output = await channel
                .send({
                    embeds: message.embeds,
                    components: [
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                autobanTargets.length > 0
                                    ? greyButtonItem("Autobanning")
                                    : target.noButton
                                    ? []
                                    : ({
                                          type: ComponentType.Button,
                                          style: ButtonStyle.Secondary,
                                          customId: "::banshare/execute",
                                          label: "Execute",
                                      } as const),
                                { type: ComponentType.Button, style: ButtonStyle.Danger, customId: "::banshare/report", label: "Report" } as const,
                            ].flat(),
                        },
                    ],
                })
                .catch(() => null);

            if (!output) throw "Could not send message; check permissions.";
            let executed = false;
            let banned = new Set<string>();
            let error: any;

            if (autobanTargets.length > 0) {
                const value = await executeBanshare(output, bot.user!, { ...banshare, list: autobanTargets }).catch((x) => x);

                if (Array.isArray(value)) banned = new Set(value);
                else error = value;

                if (error || autobanTargets.length < banshare.list.length)
                    await output
                        .edit({
                            components: [
                                {
                                    type: ComponentType.ActionRow,
                                    components: [
                                        {
                                            type: ComponentType.Button,
                                            style: ButtonStyle.Secondary,
                                            customId: "::banshare/execute",
                                            label: error ? "Execute" : "Execute (Partially Autobanned)",
                                        },
                                        { type: ComponentType.Button, style: ButtonStyle.Danger, customId: "::banshare/report", label: "Report" },
                                    ],
                                },
                            ],
                        })
                        .catch(() => null);
                else {
                    executed = true;

                    await output
                        .edit({
                            components: [
                                {
                                    type: ComponentType.ActionRow,
                                    components: [
                                        greyButtonItem("Executed Automatically"),
                                        { type: ComponentType.Button, style: ButtonStyle.Danger, customId: "::banshare/report", label: "Report" },
                                    ],
                                },
                            ],
                        })
                        .catch(() => null);
                }
            }

            await api.addBanshareCrosspost.mutate({
                origin: message.id,
                guild: guild.id,
                channel: channel.id,
                message: output.id,
                executed,
                remaining: banshare.list.filter((x) => !banned.has(x)),
            });

            if (error) throw error;
        } catch (e) {
            await channels.logs.send(
                `${message.url} could not be published to <#${target.channel}> in [${target.name}](<https://discord.gg/${target.invite}>): ${
                    typeof e === "string" ? e : `\`\`\`\n${e}\n\`\`\``
                }`,
            );
        }

        if (index !== targets.length - 1 && index % 10 === 9) await message.edit(greyButton(`Publishing (${index + 1} / ${targets.length})`));
    }

    await message.edit({
        components: [
            {
                type: ComponentType.ActionRow,
                components: [{ type: ComponentType.Button, style: ButtonStyle.Danger, customId: "::banshare/rescind", label: "Rescind" }],
            },
        ],
    });

    await button.editReply(template.success("This banshare has been published.")).catch(() => null);
}
