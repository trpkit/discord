import {
  type ApplicationCommand,
  type ApplicationCommandData,
  type AutocompleteInteraction,
  type ChatInputCommandInteraction,
  type Client,
  Collection,
  REST,
  Routes,
} from "discord.js";
import fg from "fast-glob";

type CommandMetadata = {
  options: ApplicationCommandData;
  enabled?: boolean;
};

type CommandHandler<C extends Client> = {
  metadata: CommandMetadata;
  chatInput: (
    client: C,
    interaction: ChatInputCommandInteraction,
    args: Record<string, unknown>
  ) => Promise<unknown> | unknown;
  autoComplete?: (
    client: C,
    interaction: AutocompleteInteraction,
    args: Record<string, unknown>
  ) => Promise<unknown> | unknown;
};

export function createCommand<C extends Client>(config: CommandHandler<C>) {
  return config;
}

// biome-ignore lint/suspicious/noExplicitAny: can safely ignore
class CommandCollection extends Collection<string, CommandHandler<any>> {
  // biome-ignore lint/suspicious/noExplicitAny: can safely ignore
  add(command: CommandHandler<any>) {
    this.set(command.metadata.options.name.toLowerCase(), command);
  }
}

export function loadCommands() {
  const coll = new CommandCollection();

  const files = fg.sync("../commands/**/*.js", { cwd: __dirname });

  for (const file of files) {
    const mod = require(file);
    const { metadata, chatInput } = mod.default || {};

    if (!metadata?.options || !chatInput) {
      console.warn(`Skipping file: ${file} (missing metadata or chatInput)`);
      continue;
    }

    const isEnabled = metadata.enabled !== false;

    if (!isEnabled) {
      console.log(`Command '${metadata.options.name}' in file '${file}' is disabled.`);
      continue;
    }

    coll.add(mod.default);
    console.log(`Registered command '${metadata.options.name}' from file: ${file}`);
  }

  return coll;
}

export async function registerGlobalCommands(
  token: string,
  applicationId: string,
  commands: ApplicationCommandData[]
) {
  const rest = new REST().setToken(token);

  try {
    await rest.put(Routes.applicationCommands(applicationId), {
      body: commands,
    });
    console.log(`Successfully registered ${commands.length} global commands.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

export async function registerGuildCommands(
  token: string,
  applicationId: string,
  guildId: string,
  commands: ApplicationCommandData[]
) {
  const rest = new REST().setToken(token);

  try {
    await rest.put(Routes.applicationGuildCommands(applicationId, guildId), {
      body: commands,
    });
    console.log(`Successfully registered ${commands.length} guild commands.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

export async function unregisterGlobalCommands(token: string, applicationId: string) {
  const rest = new REST().setToken(token);

  try {
    const commands = (await rest.get(
      Routes.applicationCommands(applicationId)
    )) as ApplicationCommand[];

    for (const command of commands) {
      await rest.delete(Routes.applicationCommand(applicationId, command.id));
    }

    console.log(`Successfully deleted ${commands.length} global commands.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

export async function unregisterGuildCommands(
  token: string,
  applicationId: string,
  guildId: string
) {
  const rest = new REST().setToken(token);

  try {
    const commands = (await rest.get(
      Routes.applicationGuildCommands(applicationId, guildId)
    )) as ApplicationCommand[];

    for (const command of commands) {
      await rest.delete(Routes.applicationCommand(applicationId, command.id));
    }

    console.log(`Successfully deleted ${commands.length} guild commands.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
