import { ButtonInteraction } from "discord.js";
import { greyButton } from "../lib/responses.js";

export default async function (button: ButtonInteraction) {
    await button.update(greyButton("Action Canceled"));
}
