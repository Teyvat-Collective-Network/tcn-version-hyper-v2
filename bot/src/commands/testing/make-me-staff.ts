import { ChatInputCommandInteraction } from "discord.js";
import api from "../../api.js";
import { template } from "../../lib/format.js";
import { CommandData } from "../../types.js";

export const command: CommandData = {
    key: "make-me-staff",
    description: "makes you staff in all test servers",
};

export default async function (cmd: ChatInputCommandInteraction) {
    await api.makeMeStaff.mutate(cmd.user.id);
    return template.success("You are now staff in all test servers.");
}
