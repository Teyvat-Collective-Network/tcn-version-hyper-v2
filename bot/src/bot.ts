import { Channel, Client, Events, ForumChannel, IntentsBitField, TextChannel } from "discord.js";
import interactions from "./interactions.js";

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
    await promise;
    return (await bot.channels.fetch(id!)) as T;
}

type Channels = {
    applicants: ForumChannel;
    banshares: TextChannel;
    execManagement: TextChannel;
    officialBusiness: TextChannel;
    logs: TextChannel;
};

const keys: Record<keyof Channels, string> = {
    applicants: "CH_APPLICANTS",
    banshares: "CH_BANSHARES",
    execManagement: "CH_EXEC_MANAGEMENT",
    officialBusiness: "CH_OFFICIAL_BUSINESS",
    logs: "CH_LOGS",
};

export const channels = {} as Channels;

(async () => {
    for (const [name, key] of Object.entries(keys)) {
        channels[name as keyof Channels] = await fetchChannel(process.env[key]);
    }
})();
