import { env } from "@/env";
import { MongoClient } from "mongodb";

let _mongo: MongoClient | null = null;

export async function mongo(): Promise<MongoClient> {
  if (!_mongo) {
    _mongo = new MongoClient(env.MONGODB_URI, { appName: "IdleBiz" });
    await _mongo.connect();

    // Verify replicaSet is actually enabled
    try {
      const admin = _mongo.db().admin();
      const status = await admin.command({ replSetGetStatus: 1 });
      if (!status || !status.set) {
        console.warn("WARNING: MongoDB is not running in replicaSet mode.");
      }
    } catch (error) {
      console.warn("WARNING: Failed to verify replicaSet status.", error);
    }
  }

  return _mongo;
}
