import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "ban",
      description: "Ban a user from the server",
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: "user",
          description: "The user to ban",
          type: 6,
          required: true,
        },
        {
          name: "reason",
          description: "The reason for the ban",
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

    if (!member.bannable) {
      await interaction.reply({
        content: "I cannot ban that user.",
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    try {
      await member.ban({ reason });
      await interaction.reply(`Banned ${user.tag} for: ${reason}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error trying to ban that user.",
        flags: [MessageFlags.Ephemeral],
      });
    }
  },
});
