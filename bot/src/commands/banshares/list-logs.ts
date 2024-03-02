import { ChatInputCommandInteraction } from "discord.js";
import api from "../../api.js";
import { ensureCanUseBanshareSettings } from "../../lib/banshares.js";
import { template } from "../../lib/format.js";
import { CommandData } from "../../types.js";

export const command: CommandData = {
    group: "logs",
    key: "list",
    description: "list this server's banshare logging channels",
};

export default async function (cmd: ChatInputCommandInteraction) {
    await cmd.deferReply({ ephemeral: true });
    await ensureCanUseBanshareSettings(cmd);

    const logs = await api.fetchBanshareLogs.query(cmd.guild!.id);

    return template.info(
        logs.length > 0
            ? `Banshare execution is logged in the following channels:\n${logs.map((x) => `- <#${x}>`).join("\n")}`
            : "Banshare execution is not logged anywhere in this server.",
    );
}
