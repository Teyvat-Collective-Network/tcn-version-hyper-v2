import { BaseMessageOptions, ComponentType } from "discord.js";

export function banshareComponents(severity: string): BaseMessageOptions["components"] {
    return [
        {
            type: ComponentType.ActionRow,
            components: [
                {
                    type: ComponentType.StringSelect,
                    customId: `::banshare/menu`,
                    placeholder: "Select an action",
                    options: [
                        ...(
                            [
                                ["P0", "🟥"],
                                ["P1", "🟦"],
                                ["P2", "🟩"],
                                ["DM", "⬛"],
                            ] as const
                        )
                            .filter(([label]) => severity !== label)
                            .map(([label, emoji]) => ({
                                label,
                                emoji,
                                value: `change-severity/${label}`,
                            })),
                        { label: "Publish & Global Ban", emoji: "✅", value: "publish/global" },
                        { label: "Publish", emoji: "☑", value: "publish/normal" },
                        { label: "Reject", emoji: "❌", value: "reject" },
                    ],
                },
            ],
        },
    ];
}
