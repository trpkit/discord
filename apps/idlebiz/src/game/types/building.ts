import type { Material } from "./material";

export type BuildingMaterial = {
  material: Material["canonicalName"];
  amount: number;
};

export type BuildingCost = {
  cash?: number;
  materials?: BuildingMaterial[];
};

export type BuildingInput = BuildingMaterial[];

export type BuildingOutput = BuildingMaterial[];

export type Building = {
  name: string;
  canonicalName: string;
  description: string;
  cost: BuildingCost;
  input?: BuildingInput;
  output: BuildingOutput;
};
