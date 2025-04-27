import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "support",
      description: "Join our support server",
      type: ApplicationCommandType.ChatInput,
    },
  },
  chatInput: async (client, interaction) => {
    await interaction.reply({
      content: "You can join our support server at https://discord.gg/trpkit.",
      flags: [MessageFlags.Ephemeral],
    });
  },
});
