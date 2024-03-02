import { ButtonInteraction, PermissionFlagsBits } from "discord.js";
import { confirmation } from "../../lib/responses.js";

export default async function (button: ButtonInteraction) {
    await button.deferReply({ ephemeral: true });
    const member = await button.guild?.members.fetch(button.user).catch(() => null);

    if (!member) throw "Could not fetch your member object; this is likely a bug.";
    if (!member.permissions.has(PermissionFlagsBits.BanMembers)) throw "You do not have permission to ban users in this server.";

    return confirmation(`banshare/confirm/execute`);
}
