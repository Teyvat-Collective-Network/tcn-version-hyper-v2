import { ButtonInteraction } from "discord.js";
import api from "../../../api.js";
import { channels } from "../../../bot.js";
import { greyButton } from "../../../lib/responses.js";

export default async function (button: ButtonInteraction) {
    await button.deferUpdate();

    const message = await button.message.fetchReference().catch(() => null);
    if (!message) throw "An unexpected error has occurred.";

    const rejected = await api.transitionBanshare.mutate({ user: button.user.id, message: message.id, action: "reject" });
    if (!rejected) throw "That banshare is no longer pending.";

    await message.edit(greyButton("Rejected", "red"));
    await channels.logs.send(`${message.url} was rejected by ${button.user}.`).catch(() => null);
    return greyButton("Banshare Rejected");
}
