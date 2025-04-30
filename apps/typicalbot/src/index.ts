import { env } from "@/env";
import { ShardingManager } from "discord.js";

const manager = new ShardingManager("./dist/bot.js", { token: env.DISCORD_TOKEN, totalShards: 30 });

manager.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}.`));

manager.spawn();
