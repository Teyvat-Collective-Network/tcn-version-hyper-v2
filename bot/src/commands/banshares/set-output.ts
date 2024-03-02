import { ApplicationCommandOptionType, Channel, ChannelType, ChatInputCommandInteraction } from "discord.js";
import api from "../../api.js";
import { ensureCanUseBanshareSettings } from "../../lib/banshares.js";
import { template } from "../../lib/format.js";
import { CommandData } from "../../types.js";

export const command: CommandData = {
    group: "output",
    key: "set",
    description: "set or remove the output channel for banshares",
    options: [
        {
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildText, ChannelType.PublicThread, ChannelType.PrivateThread],
            name: "channel",
            description: "the channel to which banshares will be posted (leave empty to stop sending banshares)",
        },
    ],
};

export default async function (cmd: ChatInputCommandInteraction, channel?: Channel) {
    await cmd.deferReply({ ephemeral: true });
    await ensureCanUseBanshareSettings(cmd);

    await api.setBanshareChannel.mutate({ guild: cmd.guild!.id, channel: cmd.channel!.id });
    return template.success(channel ? `Banshares will now be posted to ${channel}.` : "Banshares will no longer be posted in this server.");
}
