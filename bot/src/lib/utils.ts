import { Interaction, InteractionEditReplyOptions, InteractionReplyOptions } from "discord.js";

export async function reply(interaction: Interaction, message: (InteractionEditReplyOptions & InteractionReplyOptions) | string) {
    if (!interaction.isRepliable()) return;

    if (interaction.replied) return await interaction.followUp(message);
    else if (interaction.deferred) return await interaction.editReply(message);
    else return await interaction.reply(message);
}
