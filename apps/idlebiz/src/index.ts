import { env } from "@/env";
import { loadEvents, registerEvents } from "@/lib/EventHandler";
import { Client } from "discord.js";

const client = new Client({ intents: [] });

const events = loadEvents();
registerEvents(client, events);

(async () => {
  try {
    await client.login(env.DISCORD_TOKEN);
  } catch {
    await client.destroy();
  }
})();
