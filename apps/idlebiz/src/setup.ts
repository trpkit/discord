import { env } from "@/env";
import { mongo } from "@/lib/mongo";
import type { Building } from "@/lib/types/building";
import type { Material } from "@/lib/types/material";
import ms from "ms";

(async () => {
  console.log("Setting up initial data...");

  try {
    const client = await mongo();
    const db = client.db(env.MONGODB_DB);

    const materialsCount = await db.collection("materials").countDocuments();

    if (materialsCount === 0) {
      const wood: Material = {
        name: "Wood",
        canonicalName: "wood",
        description: "Basic building material produced from the lumber mill.",
        baseValue: 0.15,
        productionInterval: ms("5s"),
      };

      await db.collection("materials").insertOne(wood);
    } else {
      console.log("Materials collection already has data. Skipping insertion.");
    }

    const buildingsCount = await db.collection("buildings").countDocuments();

    if (buildingsCount === 0) {
      const lumberMill: Building = {
        name: "Lumber Mill",
        canonicalName: "lumber_mill",
        description: "Produces wood.",
        cost: {
          cash: 100,
        },
        output: [
          {
            material: "wood",
            amount: 2,
          },
        ],
      };

      await db.collection("buildings").insertOne(lumberMill);
    } else {
      console.log("Buildings collection already has data. Skipping insertion.");
    }

    console.log("Setup completed successfully!");
  } catch (e) {
    console.error("Error during setup:", e);
  }
})();
