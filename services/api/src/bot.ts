import { Client, IntentsBitField } from "discord.js";

const bot = new Client({ intents: IntentsBitField.Flags.Guilds });
await bot.login(Bun.env.DISCORD_TOKEN);

export default bot;
