import {
    ApplicationCommandData,
    ApplicationCommandOptionData,
    ApplicationCommandOptionType,
    ApplicationCommandSubCommandData,
    ApplicationCommandSubGroupData,
    ApplicationCommandType,
    AutocompleteInteraction,
    Channel,
    ChatInputCommandInteraction,
    Client,
    Colors,
    Events,
    ForumChannel,
    Guild,
    IntentsBitField,
    TextChannel,
} from "discord.js";
import { readdirSync } from "fs";
import interactions from "./interactions.js";
import { template } from "./lib/format.js";
import { reply } from "./lib/utils.js";

const Intents = IntentsBitField.Flags;

const bot = new Client({
    intents: Intents.Guilds | Intents.GuildMembers | Intents.MessageContent,
    sweepers: { messages: { lifetime: 86400, interval: 600 } },
    allowedMentions: { parse: [] },
});

const promise = new Promise<Client<true>>((r) => bot.on(Events.ClientReady, r));

promise.then((client) => interactions(client));

bot.login(process.env.TOKEN);

export default bot;

async function fetchChannel<T extends Channel>(id?: string) {
    return (await bot.channels.fetch(id!)) as T;
}

type Channels = {
    applicants: ForumChannel;
    banshareDashboard: TextChannel;
    banshares: TextChannel;
    execManagement: TextChannel;
    officialBusiness: TextChannel;
    logs: TextChannel;
};

const keys: Record<keyof Channels, string> = {
    applicants: "CH_APPLICANTS",
    banshareDashboard: "CH_BANSHARE_DASHBOARD",
    banshares: "CH_BANSHARES",
    execManagement: "CH_EXEC_MANAGEMENT",
    officialBusiness: "CH_OFFICIAL_BUSINESS",
    logs: "CH_LOGS",
};

export const channels = {} as Channels;

export let hq: Guild = {} as Guild;
export let hub: Guild = {} as Guild;

(async () => {
    await promise;

    for (const [name, key] of Object.entries(keys)) {
        channels[name as keyof Channels] = await fetchChannel(process.env[key]);
    }

    hq = await bot.guilds.fetch(process.env.HQ!);
    hub = await bot.guilds.fetch(process.env.HUB!);

    const commands: ApplicationCommandData[] = [];
    const hqCommands: ApplicationCommandData[] = [];
    const hubCommands: ApplicationCommandData[] = [];

    const commandHandlers: Record<number, Record<string, any>> = {};
    const eventListeners: Record<string, any[]> = {};

    for (const module of readdirSync("./src/events")) {
        for (const name of readdirSync(`./src/events/${module}`)) {
            const { default: handle } = await import(`./events/${module}/${name.slice(0, -3)}.js`);
            (eventListeners[Events[name.slice(0, -3) as keyof typeof Events]] ??= []).push(handle);
        }
    }

    for (const [key, handlers] of Object.entries(eventListeners)) bot.on(key, (...args) => handlers.forEach((fn) => fn(...args)));

    for (const module of readdirSync("./src/commands")) {
        const handlers: Record<string, any> = {};
        const options: ApplicationCommandOptionData[] = [];
        const groups: Record<string, ApplicationCommandSubCommandData[]> = {};

        for (const name of readdirSync(`./src/commands/${module}`)) {
            const data = await import(`./commands/${module}/${name.slice(0, -3)}.js`);
            const { command } = data;
            command.options ??= [];

            if (command.key) {
                if (command.group) {
                    (groups[command.group] ??= []).push({
                        type: ApplicationCommandOptionType.Subcommand,
                        name: command.key,
                        description: command.description,
                        options: command.options,
                    });

                    handlers[`${command.group} ${command.key}`] = data;
                } else {
                    options.push({
                        type: ApplicationCommandOptionType.Subcommand,
                        name: command.key,
                        description: command.description,
                        options: command.options,
                    });

                    handlers[command.key] = data;
                }
            } else {
                commands.push(command);
                (commandHandlers[command.type] ??= {})[command.name] = data;
            }
        }

        const data = {
            type: ApplicationCommandType.ChatInput,
            name: module,
            description: `commands in the ${module} module`,
            options: [
                ...Object.entries(groups).map(
                    ([group, options]): ApplicationCommandSubGroupData => ({
                        type: ApplicationCommandOptionType.SubcommandGroup,
                        name: group,
                        description: `commands in the ${group} group in the ${module} module`,
                        options,
                    }),
                ),
                ...options,
            ],
        };

        if (["hq"].includes(module)) hqCommands.push(data);
        else if (["hub"].includes(module)) hubCommands.push(data);
        else commands.push(data);

        (commandHandlers[ApplicationCommandType.ChatInput] ??= {})[module] = {
            async default(cmd: ChatInputCommandInteraction, ...args: any[]) {
                const group = cmd.options.getSubcommandGroup(false);
                const key = `${group ? `${group} ` : ""}${cmd.options.getSubcommand()}`;
                if (!handlers[key]?.default) throw "This command has not been implemented yet.";
                return await handlers[key].default(cmd, ...args);
            },
            async autocomplete(cmd: AutocompleteInteraction, ...args: any[]) {
                const group = cmd.options.getSubcommandGroup(false);
                const key = `${group ? `${group} ` : ""}${cmd.options.getSubcommand()}`;
                if (!handlers[key]?.autocomplete) return [];
                return await handlers[key].autocomplete(cmd, ...args);
            },
        };
    }

    await bot.application!.commands.set(commands);
    await hq.commands.set(hqCommands);
    await hub.commands.set(hubCommands);

    bot.on(Events.InteractionCreate, async (interaction) => {
        try {
            if (interaction.isCommand() || interaction.isAutocomplete()) {
                const handler = commandHandlers[interaction.commandType]?.[interaction.commandName];
                if (!handler) throw "This command has not been implemented yet.";

                const values: any[] = interaction.isUserContextMenuCommand()
                    ? [interaction.targetUser]
                    : interaction.isMessageContextMenuCommand()
                    ? [interaction.targetMessage]
                    : interaction.isAutocomplete()
                    ? [interaction.options.getFocused()]
                    : [];

                const required: { type: number; name: string }[] = [];

                if (interaction.isChatInputCommand()) {
                    for (const option of interaction.command!.options) {
                        if (option.type === ApplicationCommandOptionType.SubcommandGroup) {
                            if (option.name === interaction.options.getSubcommandGroup(false))
                                for (const suboption of option.options ?? [])
                                    if (suboption.name === interaction.options.getSubcommand(false))
                                        for (const leaf of suboption.options ?? []) required.push(leaf);
                        } else if (option.type === ApplicationCommandOptionType.Subcommand) {
                            if (option.name === interaction.options.getSubcommand(false)) for (const leaf of option.options ?? []) required.push(leaf);
                        } else required.push(option);
                    }

                    for (const option of required)
                        switch (option.type) {
                            case ApplicationCommandOptionType.Attachment:
                                values.push(interaction.options.getAttachment(option.name));
                                break;
                            case ApplicationCommandOptionType.Boolean:
                            case ApplicationCommandOptionType.Number:
                            case ApplicationCommandOptionType.Integer:
                            case ApplicationCommandOptionType.String:
                                values.push(interaction.options.get(option.name)?.value);
                                break;
                            case ApplicationCommandOptionType.Channel:
                                values.push(interaction.options.getChannel(option.name));
                                break;
                            case ApplicationCommandOptionType.Role:
                                values.push(interaction.options.getRole(option.name));
                                break;
                            case ApplicationCommandOptionType.User:
                                values.push(interaction.options.getUser(option.name));
                                break;
                            case ApplicationCommandOptionType.Mentionable:
                                values.push(interaction.options.getMentionable(option.name));
                                break;
                            default:
                                values.push(null);
                                console.error(
                                    { details: `${option.name} (type ${option.type})` },
                                    "3a52f612-3ddd-458e-b1bf-8af7ae6fcdc5 Unrecognized option type:",
                                );
                        }
                }

                if (interaction.isCommand()) {
                    let response = await handler.default(interaction, ...values);
                    if (!response) return;

                    if (typeof response === "string") response = template.success(response);

                    response.ephemeral ??= true;

                    await reply(interaction, response);
                } else {
                    let response = await handler.autocomplete(interaction, ...values);
                    if (!response) return;
                    if (!Array.isArray(response)) response = [response];

                    response = response.slice(0, 25).map((x: any) => (typeof x === "object" && "name" in x ? x : { name: `${x}`, value: x }));

                    await interaction.respond(response);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(
                    error,
                    `f93aad73-bb0c-4e26-8950-774ae5b77d20 Error handling interaction ${
                        interaction.isCommand() || interaction.isAutocomplete()
                            ? `/${interaction.commandName}${interaction.isAutocomplete() ? " [autocomplete]" : ""}`
                            : "{unidentified}"
                    }`,
                );

                await reply(interaction, {
                    embeds: [
                        {
                            title: "Unexpected Error",
                            description: "An unexpected error occurred. If this issue persists, please contact a developer.",
                            color: Colors.Red,
                        },
                    ],
                    components: [],
                    files: [],
                    ephemeral: true,
                });
            } else if (typeof error === "string") await reply(interaction, template.error(error));
            else if (typeof error === "object") await reply(interaction, { embeds: [{ title: "Error", color: Colors.Red, ...error }], ephemeral: true });
        }
    });
})();
