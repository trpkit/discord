import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "unban",
      description: "Unban a user from the server",
      type: ApplicationCommandType.ChatInput,
      options: [
        {
          name: "user",
          description: "The user ID to unban",
          type: 3,
          required: true,
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

    const userId = interaction.options.getString("user", true);
    const bans = await interaction.guild.bans.fetch();
    const bannedUser = bans.find((ban) => ban.user.id === userId);

    if (!bannedUser) {
      await interaction.reply({
        content: "That user is not banned from this server.",
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }

    try {
      await interaction.guild.members.unban(userId);
      await interaction.reply(`Unbanned ${bannedUser.user.tag}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error trying to unban that user.",
        flags: [MessageFlags.Ephemeral],
      });
    }
  },
});
