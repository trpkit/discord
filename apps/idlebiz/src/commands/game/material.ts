import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "material",
      description: "View info about a specific material",
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: "info",
          description: "Get information about a material",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "material",
              description: "The material to get information about",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
          ],
        },
      ],
    },
    enabled: false,
  },
  chatInput: async (client, interaction) => {
    await interaction.reply({
      content: "Command not implemented yet.",
    });
  },
});
