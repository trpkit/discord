import { createCommand } from "@/lib/CommandHandler";
import { ApplicationCommandType, MessageFlags } from "discord.js";

export default createCommand({
  metadata: {
    options: {
      name: "ping",
      description: "Healthcheck",
      type: ApplicationCommandType.ChatInput,
    },
  },
  chatInput: async (client, interaction) => {
    const sent = await interaction.deferReply({
      flags: [MessageFlags.Ephemeral],
      withResponse: true,
    });

    await interaction.editReply({
      content: `Pong! Heartbeat: ${interaction.client.ws.ping.toFixed(0)}ms | Roundtrip: ${sent.interaction.createdTimestamp - interaction.createdTimestamp}ms`,
    });
  },
});
