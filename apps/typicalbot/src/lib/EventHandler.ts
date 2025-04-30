import { type Client, type ClientEvents, Collection } from "discord.js";
import fg from "fast-glob";

type EventMetadata<E extends keyof ClientEvents> = {
  event: E;
  enabled?: boolean;
};

type EventHandler<C extends Client, E extends keyof ClientEvents> = (
  client: C,
  ...args: ClientEvents[E]
) => Promise<unknown> | unknown;

export function createEvent<C extends Client, E extends keyof ClientEvents>(config: {
  metadata: EventMetadata<E>;
  handler: EventHandler<C, E>;
}) {
  return config;
}

// biome-ignore lint/suspicious/noExplicitAny: can safely ignore
class EventCollection extends Collection<keyof ClientEvents, EventHandler<any, any>[]> {
  // biome-ignore lint/suspicious/noExplicitAny: can safely ignore
  add(event: keyof ClientEvents, handler: EventHandler<any, any>) {
    const item = this.get(event) || [];
    item.push(handler);
    this.set(event, item);
  }
}

export function registerEvents<C extends Client>(client: C, collection: EventCollection) {
  collection.forEach((handlers, event) => {
    const method = event === "ready" ? "once" : "on";

    client[method](event, (...args) => {
      for (const handler of handlers) {
        handler(client, ...args);
      }
    });
  });
}

export function loadEvents() {
  const coll = new EventCollection();

  const files = fg.sync("../events/**/*.js", { cwd: __dirname });

  for (const file of files) {
    const mod = require(file);
    const { metadata, handler } = mod.default || {};

    if (!metadata?.event || !handler) {
      console.warn(`Skipping file: ${file} (missing metadata or handler)`);
      continue;
    }

    const isEnabled = metadata.enabled !== false;

    if (!isEnabled) {
      console.log(`Event '${metadata.event}' in file '${file}' is disabled.`);
      continue;
    }

    coll.add(metadata.event as keyof ClientEvents, handler);
    console.log(`Registered event '${metadata.event}' from file: ${file}`);
  }

  return coll;
}
