import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "vendor",
      description: "Buy or sell materials to the vendor",
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
