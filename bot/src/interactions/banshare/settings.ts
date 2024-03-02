import { ButtonInteraction } from "discord.js";
import api from "../../api.js";
import { renderBanshareSettings } from "../../lib/banshares.js";

export default async function (button: ButtonInteraction, path: "blockDMs" | "noButton" | "daedalus", enable: "true" | "false") {
    await api.setBanshareToggle.mutate({ guild: button.guild!.id, path, enable: enable === "true" });
    await button.update(await renderBanshareSettings(button.guild!));
}
