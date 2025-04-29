import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "vendor",
      description: "Buy or sell materials to the vendor",
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: "buy",
          description: "Buy materials from the vendor",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "material",
              description: "The material to buy",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
            {
              name: "amount",
              description: "The amount to buy",
              type: ApplicationCommandOptionType.Integer,
              required: true,
            },
          ],
        },
        {
          name: "sell",
          description: "Sell materials to the vendor",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "material",
              description: "The material to sell",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
            {
              name: "amount",
              description: "The amount to sell",
              type: ApplicationCommandOptionType.Integer,
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
