import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "timeout",
      description: "Timeout a user in the server",
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: "user",
          description: "The user to timeout",
          type: 6,
          required: true,
        },
        {
          name: "duration",
          description: "The duration of the timeout in minutes",
          type: 4,
          required: true,
        },
        {
          name: "reason",
          description: "The reason for the timeout",
          type: 3,
          required: false,
        },
      ],
    },
  },
  chatInput: async (client, interaction) => {
    if (!interaction.guild) {
      await interaction.reply({
        content: "This command can only be used in a server.",
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    const user = interaction.options.getUser("user", true);
    const duration = interaction.options.getInteger("duration", true);
    const reason = interaction.options.getString("reason") || "No reason provided";
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      await interaction.reply({
        content: "That user is not in this server.",
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    if (!member.moderatable) {
      await interaction.reply({
        content: "I cannot timeout that user.",
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    try {
      await member.timeout(duration * 60 * 1000, reason);
      await interaction.reply(`Timed out ${user.tag} for ${duration} minutes. Reason: ${reason}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error trying to timeout that user.",
        flags: [MessageFlags.Ephemeral],
      });
    }
  },
});
