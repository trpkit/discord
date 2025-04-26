import { env } from "@/env";
import { loadCommands, registerGlobalCommands } from "@/lib/CommandHandler";

(async () => {
  try {
    const commands = loadCommands();
    const options = [...commands.values()].map((cmd) => cmd.metadata.options);
    await registerGlobalCommands(env.DISCORD_TOKEN, env.DISCORD_APPLICATION_ID, options);
  } catch {
    process.exit(1);
  }
})();
