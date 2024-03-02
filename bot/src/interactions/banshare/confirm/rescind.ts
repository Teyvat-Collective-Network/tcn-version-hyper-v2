import { ButtonStyle, ComponentType, ModalSubmitInteraction } from "discord.js";
import api from "../../../api.js";
import bot, { channels } from "../../../bot.js";
import { template } from "../../../lib/format.js";
import { greyButton, greyButtonItem } from "../../../lib/responses.js";

export default async function (modal: ModalSubmitInteraction, id: string) {
    await modal.deferReply({ ephemeral: true });
    if (!(await api.isObserver.query(modal.user.id))) throw "You are not an observer.";

    const reason = modal.fields.getTextInputValue("explanation");

    const rescinded = await api.transitionBanshare.mutate({ user: modal.user.id, message: id, action: "rescind", reason });
    if (!rescinded) throw "That banshare was already rescinded.";

    await modal.editReply(template.progress("This banshare is being rescinded. You may now dismiss this message."));

    const message = await modal.channel?.messages.fetch(id).catch(() => null);
    await message?.edit(greyButton("Rescinding", "red"));

    await channels.logs.send(`${message?.url} is being rescinded by ${modal.user}:\n\n>>> ${reason}`).catch(() => null);

    await message?.reply(`This banshare was rescinded by an observer. The following explanation was given:\n\n>>> ${reason}`).catch(console.error);

    const crossposts = await api.fetchBanshareCrossposts.query(id);

    for (const { channel: channelId, message: messageId } of crossposts) {
        const channel = await bot.channels.fetch(channelId).catch(() => null);
        if (!channel?.isTextBased() || channel.isDMBased()) continue;

        const message = await channel.messages.fetch(messageId).catch(() => null);
        if (!message) continue;

        const alert = await message
            .reply(`This banshare was rescinded by an observer. The following explanation was given:\n\n>>> ${reason}`)
            .catch(() => null);

        await message
            .edit({
                embeds: [
                    {
                        ...message.embeds[0].toJSON(),
                        title: "Banshare (**Rescinded**)",
                        fields: [...message.embeds[0].fields, { name: "Rescinded", value: "This banshare has been rescinded." }],
                    },
                ],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            alert
                                ? { type: ComponentType.Button, style: ButtonStyle.Link, url: alert.url, label: "Rescinded — click to scroll to explanation" }
                                : greyButtonItem("Rescinded", "red"),
                        ],
                    },
                ],
            })
            .catch(() => null);
    }

    await message?.edit(greyButton("Rescinded", "red")).catch(() => null);
    await modal.editReply(template.success("This banshare has been rescinded.")).catch(() => null);
}
