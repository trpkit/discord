export enum MultiplierSource {
  DailyReward = "dailyReward",
  ReferralBonus = "referralBonus",
  ReferralClaim = "referralClaim",
}

export enum MultiplierType {
  MaterialProduction = "materialProduction",
}

type Multiplier = {
  value: number;
  source: MultiplierSource;
  type: MultiplierType;
  activatedAt: Date;
};

export type PermanentMultiplier = Multiplier;

export type TemporaryMultiplier = Multiplier & {
  expiredAt: Date;
};
