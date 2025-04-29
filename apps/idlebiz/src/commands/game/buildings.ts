import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "buildings",
      description: "Show what buildings you own",
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
