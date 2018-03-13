import { Record } from "immutable";
import { ManNames, SouNames, PinNames, KazeNames, ThreeNames } from "services/PaiNames";

const klt = "┌";
const krt = "┐";
const klb = "└";
const krb = "┘";
const ks = "│";
const kt = "--";
const s2 = "  ";
const nr = "\n";

export enum PaiType {
  None,
  Man,
  Sou,
  Pin,
  Kaze,
  Three,
}

export enum PaiFlag {
  None = 0,
  Aka = 1,
  Pon = 2,
  Chi = 4,
}

export interface IPai {
  type: PaiType;
  number: number;
  flag: PaiFlag;
}

export const OPai: IPai = {
  type: PaiType.None,
  number: 0,
  flag: PaiFlag.None,
};

export const RPai = Record<IPai>(OPai);

export class Pai extends RPai {
  draw(option?: {x?: number, y?: number}): string {
    const matrix = this.matrix;

    if (! option)
      return matrix.map((r) => r.join("")).join(nr);

    const { x = 0, y = 0 } = option;
    return matrix[y] && matrix[y][x] ? matrix[y][x] : "";
  }

  drawLine(index: number) {
    const matrix = this.matrix;
    return matrix[index] ? matrix[index].join("") : "";
  }

  get name() {
    switch (this.type) {
      case PaiType.Man:
        return ManNames[this.number];
      case PaiType.Sou:
        return SouNames[this.number];
      case PaiType.Pin:
        return PinNames[this.number];
      case PaiType.Kaze:
        return KazeNames[this.number];
      case PaiType.Three:
        return ThreeNames[this.number];
      default:
        return "-";
    }
  }

  get width() {
    return this.isNaki ? 4 : 3;
  }

  get height() {
    return 4;
  }

  get matrix() {
    if (this.isNaki) {
      return [
        [s2, s2, s2, s2],
        [klt, kt, kt, krt],
        [ks, this.name.charAt(1), this.name.charAt(0), ks],
        [klb, kt, kt, krb],
      ];
    } else {
      return [
        [klt, kt, krt],
        [ks, this.name.charAt(0), ks],
        [ks, this.name.charAt(1), ks],
        [klb, kt, krb],
      ];
    }
  }

  get isNaki() {
    return this.isPon || this.isChi;
  }

  get isPon() {
    return this.flag & PaiFlag.Pon;
  }

  get isChi() {
    return this.flag & PaiFlag.Chi;
  }
}
