import { ButtonInteraction } from "discord.js";
import api from "../../../api.js";
import { channels } from "../../../bot.js";
import { template } from "../../../lib/format.js";
import { greyButton } from "../../../lib/responses.js";

export default async function (button: ButtonInteraction, mode: string) {
    await button.deferUpdate();

    const message = await button.message.fetchReference().catch(() => null);
    if (!message) throw "An unexpected error has occurred.";

    const published = await api.transitionBanshare.mutate({ user: button.user.id, message: message.id, action: "publish" });
    if (!published) throw "This banshare is no longer pending.";

    await message.edit(greyButton("Publishing...", "grey"));
    await channels.logs.send(`${message.url} is being published by ${button.user}.`).catch(() => null);

    const banshare = await api.fetchBanshare.query(message.id);
    if (!banshare) throw "No banshare was returned from the database. This error should not be possible.";

    const targets = await api.fetchBanshareTargets.query(banshare.severity);
    return template.info(`\`\`\`json\n${JSON.stringify(targets, null, 4)}\n\`\`\``);
}
