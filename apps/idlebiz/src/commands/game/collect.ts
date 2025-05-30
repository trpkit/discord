import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "collect",
      description: "Collect the materials produced by your buildings",
      type: ApplicationCommandType.ChatInput,
    },
    enabled: false,
  },
  chatInput: async (client, interaction) => {
    await interaction.reply({
      content: "Command not implemented yet.",
    });
  },
});
