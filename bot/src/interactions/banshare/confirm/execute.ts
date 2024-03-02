import { ButtonInteraction, ButtonStyle, ComponentType, PermissionFlagsBits } from "discord.js";
import api from "../../../api.js";
import { executeBanshare } from "../../../lib/banshares.js";
import { template } from "../../../lib/format.js";
import { greyButtonItem } from "../../../lib/responses.js";

export default async function (button: ButtonInteraction) {
    await button.deferUpdate();

    const member = await button.guild?.members.fetch(button.user).catch(() => null);

    if (!member) throw "Could not fetch your member object; this is likely a bug.";
    if (!member.permissions.has(PermissionFlagsBits.BanMembers)) throw "You do not have permission to ban users in this server.";

    const message = await button.message.fetchReference().catch(() => null);
    if (!message) throw "An unexpected error has occurred.";

    const executed = await api.executeBanshare.mutate(message.id);
    if (!executed) throw "This banshare was already executed or is currently being executed.";

    const banshare = await api.getBanshareFromCrosspost.query(message.id);
    if (!banshare) throw "This does not appear to be a banshare prompt. This is likely a bug.";

    await button.editReply(template.progress("This banshare is being executed. You may now dismiss this message."));

    await message.edit({
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    greyButtonItem("Executing"),
                    { type: ComponentType.Button, style: ButtonStyle.Danger, customId: "::banshare/report", label: "Report" },
                ],
            },
        ],
    });

    const value = await executeBanshare(message, button.user, {
        ...banshare,
        list: await api.fetchBanshareRemainingTargets.query({ guild: message.guild!.id, message: banshare.message }),
    }).catch((x) => x);

    const error = Array.isArray(value) ? null : value;

    if (error) console.error(error);

    await message
        .edit({
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        error ? greyButtonItem("Errored", "red") : greyButtonItem("Executed"),
                        { type: ComponentType.Button, style: ButtonStyle.Danger, customId: "::banshare/report", label: "Report" },
                    ],
                },
            ],
        })
        .catch(() => null);

    await button
        .editReply(
            error
                ? template.error("An error occurred executing this banshare. Please ban the users manually.")
                : template.success("This banshare has been executed."),
        )
        .catch(() => null);
}
