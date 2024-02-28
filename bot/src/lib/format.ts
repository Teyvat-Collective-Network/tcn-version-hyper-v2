import { BaseMessageOptions, ButtonStyle, Colors, ComponentType } from "discord.js";

export function timestamp(date: number | Date, format?: "t" | "T" | "d" | "D" | "f" | "F" | "R"): string {
    return `<t:${Math.floor((typeof date === "number" ? date : date.getTime()) / 1000)}${format ? `:${format}` : ""}>`;
}

export function timeinfo(date: number | Date | undefined | null) {
    if (!date) return "(unknown time)";
    return `${timestamp(date)} (${timestamp(date, "R")})`;
}

export function embed(title: string, description: string, color: number, ephemeral: boolean = true): BaseMessageOptions & { ephemeral: boolean } {
    return { content: "", embeds: [{ title, description, color }], files: [], components: [], ephemeral };
}

export const template = {
    success: (body: string, ephemeral?: boolean) => embed("OK", body, Colors.Green, ephemeral),
    error: (body: string, ephemeral?: boolean) => embed("Error", body, Colors.Red, ephemeral),
    info: (body: string, ephemeral?: boolean) => embed("Info", body, Colors.Blue, ephemeral),
    progress: (body: string, ephemeral?: boolean) => embed("In Progress", body, Colors.Purple, ephemeral),
    logerror: (context: string, body: string, ephemeral?: boolean) => embed(`Bot Error: ${context}`, body, Colors.Red, ephemeral),
    confirm: (
        body: string,
        user: string,
        key: string,
        { yesLabel, noLabel, ephemeral }: { yesLabel?: string; noLabel?: string; ephemeral?: boolean } = {},
    ): BaseMessageOptions => ({
        ...embed("Confirm", body, Colors.DarkVividPink, ephemeral),
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    { type: ComponentType.Button, customId: `:${user}:${key}`, style: ButtonStyle.Success, label: yesLabel ?? "Confirm" },
                    { type: ComponentType.Button, customId: `:${user}:cancel`, style: ButtonStyle.Danger, label: noLabel ?? "Cancel" },
                ],
            },
        ],
    }),
};
