import { Client, GatewayIntentBits } from "discord.js";
import { env } from "./env";
import { loadEvents, registerEvents } from "./lib/EventHandler";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const events = loadEvents();
registerEvents(client, events);

(async () => {
  try {
    await client.login(env.DISCORD_TOKEN);
  } catch (e) {
    console.error(e);
    await client.destroy();
  }
})();
