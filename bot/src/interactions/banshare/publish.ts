import { ButtonInteraction } from "discord.js";
import api from "../../api.js";
import { confirmation } from "../../lib/responses.js";

export default async function (button: ButtonInteraction, mode: string) {
    if (!(await api.isObserver.query(button.user.id))) throw "You are not an observer.";
    await button.reply(confirmation(`banshare/confirm/publish:${mode}`));
}
