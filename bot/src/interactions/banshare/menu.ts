import { StringSelectMenuInteraction } from "discord.js";
import api from "../../api.js";
import { banshareComponents } from "../../lib/banshares.js";
import { confirmation } from "../../lib/responses.js";

export default async function (menu: StringSelectMenuInteraction) {
    if (!(await api.isObserver.query(menu.user.id))) throw "You are not an observer.";

    const id = menu.values[0];

    if (id.startsWith("change-severity/")) {
        const severity = id.slice(16) as "P0" | "P1" | "P2" | "DM";

        await menu.deferUpdate();

        await api.changeBanshareSeverity.mutate({ user: menu.user.id, message: menu.message.id, severity });

        await menu.editReply({
            embeds: [
                {
                    ...menu.message.embeds[0].toJSON(),
                    fields: menu.message.embeds[0].fields.map((field) => ({
                        ...field,
                        value: field.name === "Severity" ? (severity === "DM" ? "DM Scam" : severity) : field.value,
                    })),
                },
            ],
            components: banshareComponents(severity),
        });
    } else if (id.startsWith("publish/")) {
        const mode = id.slice(8);
        await menu.reply(confirmation(`banshare/confirm/publish:${mode}`));
    } else if (id === "reject") {
        await menu.reply(confirmation(`banshare/confirm/reject`));
    }
}
