import { Client, IntentsBitField } from "discord.js";

const Intents = IntentsBitField.Flags;

const bot = new Client({ intents: Intents.Guilds | Intents.GuildMembers, sweepers: {}, allowedMentions: { parse: [] } });

bot.login(process.env.TOKEN);

export default bot;
