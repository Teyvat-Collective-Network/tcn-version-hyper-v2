import { ButtonComponent, ButtonInteraction, ComponentType } from "discord.js";
import api from "../../api.js";

export default async function (button: ButtonInteraction, severity: "P0" | "P1" | "P2" | "DM") {
    await button.deferUpdate();

    await api.changeBanshareSeverity.mutate({ user: button.user.id, message: button.message.id, severity });

    await button.editReply({
        embeds: [
            {
                ...button.message.embeds[0].toJSON(),
                fields: button.message.embeds[0].fields.map((field) => ({ ...field, value: field.name === "Severity" ? severity : field.value })),
            },
        ],
        components: button.message.components.map((row) => ({
            type: ComponentType.ActionRow,
            components: row.components.map(
                (x) =>
                    ({
                        ...x.data,
                        disabled: x.customId?.match(/^::banshare\/change-severity:(P[012]|DM)$/) ? x.customId.endsWith(severity) : x.disabled,
                    } as ButtonComponent),
            ),
        })),
    });
}
