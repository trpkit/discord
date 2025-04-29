import { createEvent } from "@/lib/EventHandler";

export default createEvent({
  metadata: {
    event: "ready",
  },
  handler: async (client, readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}.`);
  },
});
