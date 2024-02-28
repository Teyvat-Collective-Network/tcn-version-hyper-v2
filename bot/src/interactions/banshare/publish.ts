import { ButtonInteraction } from "discord.js";
import { confirmation } from "../../lib/responses.js";

export default async function (button: ButtonInteraction, mode: string) {
    await button.reply(confirmation(`banshare/confirm/publish:${mode}`));
}
