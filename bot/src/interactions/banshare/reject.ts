import { ButtonInteraction } from "discord.js";
import { confirmation } from "../../lib/responses.js";

export default async function (button: ButtonInteraction) {
    await button.reply(confirmation(`banshare/confirm/reject`));
}
