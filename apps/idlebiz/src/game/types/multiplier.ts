export enum MultiplierSource {
  DailyReward = "dailyReward",
}

type Multiplier = {
  value: number;
  source: MultiplierSource;
  activatedAt: Date;
};

export type PermanentMultiplier = Multiplier;

export type TemporaryMultiplier = Multiplier & {
  expiredAt: Date;
};
