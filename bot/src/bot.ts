import { Channel, Client, Events, ForumChannel, IntentsBitField, TextChannel } from "discord.js";

const Intents = IntentsBitField.Flags;

const bot = new Client({ intents: Intents.Guilds | Intents.GuildMembers, sweepers: {}, allowedMentions: { parse: [] } });
const promise = new Promise((r) => bot.on(Events.ClientReady, r));

bot.login(process.env.TOKEN);

export default bot;

async function fetchChannel<T extends Channel>(id?: string) {
    await promise;
    return (await bot.channels.fetch(id!)) as T;
}

type Channels = {
    applicants: ForumChannel;
    officialBusiness: TextChannel;
};

const keys: Record<keyof Channels, string> = {
    applicants: "CH_APPLICANTS",
    officialBusiness: "CH_OFFICIAL_BUSINESS",
};

export const channels = {} as Channels;

(async () => {
    for (const [name, key] of Object.entries(keys)) {
        channels[name as keyof Channels] = await fetchChannel(process.env[key]);
    }
})();
