import {
  MultiplierSource,
  type MultiplierType,
  type PermanentMultiplier,
  type Profile,
  type TemporaryMultiplier,
} from "@/game/types";
import { mongo } from "@/lib/mongo";

export async function addTemporaryMultiplier(
  discordId: string,
  value: number,
  duration: number,
  source: MultiplierSource,
  type: MultiplierType
) {
  const now = new Date();
  const expiredAt = new Date(now.getTime() + duration);

  const multiplier: TemporaryMultiplier = {
    value,
    source,
    type,
    activatedAt: now,
    expiredAt,
  };

  const client = await mongo();
  const db = client.db();

  return await db
    .collection<Profile>("profiles")
    .updateOne({ discordId: discordId }, { $push: { "multipliers.temporary": multiplier } });
}

export async function addPermanentMultiplier(
  discordId: string,
  value: number,
  source: MultiplierSource,
  type: MultiplierType
) {
  const now = new Date();

  const multiplier: PermanentMultiplier = {
    value,
    source,
    type,
    activatedAt: now,
  };

  const client = await mongo();
  const db = client.db();

  return await db
    .collection<Profile>("profiles")
    .updateOne({ discordId: discordId }, { $push: { "multipliers.permanent": multiplier } });
}

export async function updateReferralBonusMultiplier(discordId: string, value: number) {
  const client = await mongo();
  const db = client.db();

  return await db
    .collection<Profile>("profiles")
    .updateOne(
      { discordId: discordId, "multipliers.permanent.source": MultiplierSource.ReferralBonus },
      { $set: { "multipliers.permanent.$.value": value } }
    );
}
