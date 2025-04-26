import { env } from "@/env";
import { unregisterGlobalCommands } from "@/lib/CommandHandler";

(async () => {
  try {
    await unregisterGlobalCommands(env.DISCORD_TOKEN, env.DISCORD_APPLICATION_ID);
  } catch {
    process.exit(1);
  }
})();
