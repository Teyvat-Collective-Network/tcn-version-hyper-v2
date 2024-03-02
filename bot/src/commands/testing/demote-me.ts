import { ChatInputCommandInteraction } from "discord.js";
import api from "../../api.js";
import { template } from "../../lib/format.js";
import { CommandData } from "../../types.js";

export const command: CommandData = {
    key: "demote-me",
    description: "removes your observer title",
};

export default async function (cmd: ChatInputCommandInteraction) {
    await api.setObserverStatus.mutate({ user: cmd.user.id, observer: false });
    return template.success("You are no longer an observer.");
}
