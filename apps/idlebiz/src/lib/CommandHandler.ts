import {
  type ApplicationCommandData,
  type AutocompleteInteraction,
  type ChatInputCommandInteraction,
  type Client,
  Collection,
} from "discord.js";
import fg from "fast-glob";

type CommandMetadata = {
  options: ApplicationCommandData;
  enabled?: boolean;
};

type CommandHandler<C extends Client> = {
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

export function createCommand<C extends Client>(
  config: {
    metadata: CommandMetadata;
  } & CommandHandler<C>
) {
  return config;
}

// biome-ignore lint/suspicious/noExplicitAny: can safely ignore
class CommandCollection extends Collection<string, CommandHandler<any>> {
  // biome-ignore lint/suspicious/noExplicitAny: can safely ignore
  add(command: CommandHandler<any> & { metadata: CommandMetadata }) {
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
