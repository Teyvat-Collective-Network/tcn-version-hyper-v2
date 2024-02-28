import { ApplicationCommandOptionType, Channel, ChannelType, ChatInputCommandInteraction } from "discord.js";
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
    return "Not Implemented";
}
