import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "kick",
      description: "Kick a user from the server",
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: "user",
          description: "The user to kick",
          type: 6,
          required: true,
        },
        {
          name: "reason",
          description: "The reason for the kick",
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
    const reason = interaction.options.getString("reason") || "No reason provided";
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      await interaction.reply({
        content: "That user is not in this server.",
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    if (!member.kickable) {
      await interaction.reply({
        content: "I cannot kick that user.",
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    try {
      await member.kick(reason);
      await interaction.reply(`Kicked ${user.tag} for: ${reason}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error trying to kick that user.",
        flags: [MessageFlags.Ephemeral],
      });
    }
  },
});
