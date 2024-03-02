import { ChatInputCommandInteraction } from "discord.js";
import api from "../../api.js";
import { template } from "../../lib/format.js";
import { CommandData } from "../../types.js";

export const command: CommandData = {
    key: "promote-me",
    description: "makes you an observer",
};

export default async function (cmd: ChatInputCommandInteraction) {
    await api.setObserverStatus.mutate({ user: cmd.user.id, observer: true });
    return template.success("You are now an observer.");
}
