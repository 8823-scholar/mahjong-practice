import { Record } from "immutable";

import { ManNames, SouNames, PinNames, KazeNames, ThreeNames } from "services/PaiNames";

export enum PaiType {
  None,
  Man = "Man",
  Sou = "Sou",
  Pin = "Pin",
  Kaze = "Kaze",
  Three = "Three",
}

export enum PaiFlag {
  None = 0,
  Red = 1,
}

export interface IPai {
  type: PaiType;
  index: number;
  flag: PaiFlag;
}

export const OPai: IPai = {
  type: PaiType.None,
  index: 0,
  flag: PaiFlag.None,
};

export const RPai = Record<IPai>(OPai);

export class Pai extends RPai {
  get name() {
    switch (this.type) {
      case PaiType.Man:
        return ManNames[this.index];
      case PaiType.Sou:
        return SouNames[this.index];
      case PaiType.Pin:
        return PinNames[this.index];
      case PaiType.Kaze:
        return KazeNames[this.index];
      case PaiType.Three:
        return ThreeNames[this.index];
      default:
        return "-";
    }
  }
}
