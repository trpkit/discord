import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "materials",
      description: "View all materials you have in your inventory",
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
