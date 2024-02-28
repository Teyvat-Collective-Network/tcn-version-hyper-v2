import { BaseMessageOptions, ButtonStyle, ComponentType, InteractionReplyOptions } from "discord.js";

export function confirmation(key: string, label: string = "Confirm"): InteractionReplyOptions {
    return {
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        style: ButtonStyle.Success,
                        customId: `::${key}`,
                        label,
                    },
                    {
                        type: ComponentType.Button,
                        style: ButtonStyle.Danger,
                        customId: "::cancel",
                        label: "Cancel",
                    },
                ],
            },
        ],
        ephemeral: true,
    };
}

export function greyButton(label: string, color: "red" | "green" | "blue" | "grey" = "grey"): BaseMessageOptions {
    return {
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.Button,
                        style: ({ red: ButtonStyle.Danger, green: ButtonStyle.Success, blue: ButtonStyle.Primary, grey: ButtonStyle.Secondary } as const)[
                            color
                        ],
                        customId: ".",
                        label,
                        disabled: true,
                    },
                ],
            },
        ],
    };
}
