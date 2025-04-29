import { loadCommands } from "@/lib/CommandHandler";
import { createEvent } from "@/lib/EventHandler";
import { ApplicationCommandType } from "discord.js";

const coll = loadCommands();

export default createEvent({
  metadata: {
    event: "interactionCreate",
  },
  handler: async (client, interaction) => {
    if (!interaction.isCommand() && !interaction.isAutocomplete()) return;

    const command = coll.get(interaction.commandName.toLowerCase());
    if (!command) return;

    switch (interaction.commandType) {
      case ApplicationCommandType.ChatInput: {
        const args = Object.fromEntries(
          interaction.options.data.map((option) => [option.name, option.value])
        );

        if (interaction.isAutocomplete() && command.autoComplete) {
          await command.autoComplete(client, interaction, args);
        } else if (interaction.isCommand()) {
          await command.chatInput(client, interaction, args);
        }

        break;
      }
    }
  },
});
