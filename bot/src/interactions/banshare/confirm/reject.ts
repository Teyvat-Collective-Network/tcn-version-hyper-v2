import { ButtonInteraction } from "discord.js";
import api from "../../../api.js";
import { channels } from "../../../bot.js";
import { updateBanshareDashboard } from "../../../lib/banshares.js";
import { greyButton } from "../../../lib/responses.js";

export default async function (button: ButtonInteraction) {
    await button.deferUpdate();
    if (!(await api.isObserver.query(button.user.id))) throw "You are not an observer.";

    const message = await button.message.fetchReference().catch(() => null);
    if (!message) throw "An unexpected error has occurred.";

    const rejected = await api.transitionBanshare.mutate({ user: button.user.id, message: message.id, action: "reject" });
    if (!rejected) throw "That banshare is no longer pending.";

    await message.edit(greyButton("Rejected", "red"));
    await channels.logs.send(`${message.url} was rejected by ${button.user}.`).catch(() => null);
    await updateBanshareDashboard();

    return greyButton("Banshare Rejected");
}
