import { ChatInputCommandInteraction } from "discord.js";
import { ensureCanUseBanshareSettings, renderBanshareSettings } from "../../lib/banshares.js";
import { CommandData } from "../../types.js";

export const command: CommandData = {
    key: "settings",
    description: "view and modify this server's banshare settings",
};

export default async function (cmd: ChatInputCommandInteraction) {
    await cmd.deferReply({ ephemeral: true });
    await ensureCanUseBanshareSettings(cmd);

    return await renderBanshareSettings(cmd.guild!);
}
