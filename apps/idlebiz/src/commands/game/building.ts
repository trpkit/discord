import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "building",
      description: "View a building or purchase buildings",
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: "purchase",
          description: "Purchase a building",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "building",
              description: "The building to purchase",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
          ],
        },
        {
          name: "info",
          description: "Get information about a building",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "building",
              description: "The building to get information about",
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
