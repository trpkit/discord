import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "vote",
      description: "Vote for IdleBiz on top.gg to receive some rewards",
      type: ApplicationCommandType.ChatInput,
    },
  },
  chatInput: async (client, interaction) => {
    await interaction.reply({
      content: "Command not implemented yet.",
    });
  },
});
