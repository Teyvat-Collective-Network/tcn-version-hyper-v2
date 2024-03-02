import { ApplicationCommandOptionType, Channel, ChannelType, ChatInputCommandInteraction } from "discord.js";
import api from "../../api.js";
import { ensureCanUseBanshareSettings } from "../../lib/banshares.js";
import { template } from "../../lib/format.js";
import { CommandData } from "../../types.js";

export const command: CommandData = {
    group: "logs",
    key: "remove",
    description: "remove a banshare logging channel",
    options: [
        {
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildText, ChannelType.PublicThread, ChannelType.PrivateThread],
            name: "channel",
            description: "the channel to remove as a logging channel",
            required: true,
        },
    ],
};

export default async function (cmd: ChatInputCommandInteraction, channel: Channel) {
    await cmd.deferReply({ ephemeral: true });
    await ensureCanUseBanshareSettings(cmd);

    return (await api.removeBanshareLoggingChannel.mutate({ guild: cmd.guild!.id, channel: channel.id }))
        ? template.success(`Banshare execution will no longer be logged in ${channel}.`)
        : template.error(`${channel} is not a banshare log channel.`);
}
