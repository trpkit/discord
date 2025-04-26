import { env } from "@/env";
import { Client } from "discord.js";

const client = new Client({ intents: [] });

client.once("ready", (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

(async () => {
  try {
    await client.login(env.DISCORD_TOKEN);
  } catch {
    await client.destroy();
  }
})();
