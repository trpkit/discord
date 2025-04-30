import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType, EmbedBuilder, MessageFlags } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "about",
      description: "Learn about IdleBiz and its features",
      type: ApplicationCommandType.ChatInput,
    },
  },
  chatInput: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("🏭 Welcome to IdleBiz! 🏭")
      .setDescription(
        "Build your empire from the ground up! Start small, dream big, and watch your business flourish while you're away."
      )
      .setColor("#2b2d31")
      .addFields(
        {
          name: "🎮 The Ultimate Idle Tycoon Experience",
          value:
            "• 🏢 Manage multiple buildings and optimize production\n• 📈 Play the market and make strategic investments\n• 🤝 Trade with other players in a dynamic economy\n• ⚡️ Progress even while offline with idle mechanics\n• 🏆 Compete for dominance in the global economy",
        },
        {
          name: "💡 Why Choose IdleBiz?",
          value:
            "• Perfect blend of strategy and idle gameplay\n• Deep economic simulation\n• Active community and trading system\n• Regular updates and new content\n• No pay-to-win mechanics",
        }
      )
      .setFooter({
        text: "Ready to start your business empire? Use /start to begin your journey!",
      });

    await interaction.reply({
      embeds: [embed],
      flags: [MessageFlags.Ephemeral],
    });
  },
});
