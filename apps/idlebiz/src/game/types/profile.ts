// TODO
import type { PermanentMultiplier, TemporaryMultiplier } from "@/game/types/multiplier";

export type Profile = {
  discordId: string;
  multipliers: ProfileMultipliers;
};

export type ProfileMultipliers = {
  permanent: PermanentMultiplier[];
  temporary: TemporaryMultiplier[];
};
