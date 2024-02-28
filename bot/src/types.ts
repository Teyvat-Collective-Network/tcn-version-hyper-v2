import type { ApplicationCommandOptionData, ApplicationCommandSubCommandData, ApplicationCommandSubGroupData } from "discord.js";

export type CommandData = {
    group?: string;
    key: string;
    description: string;
    options?: Exclude<ApplicationCommandOptionData, ApplicationCommandSubCommandData | ApplicationCommandSubGroupData>[];
};
