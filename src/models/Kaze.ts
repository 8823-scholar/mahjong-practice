import { Record } from "immutable";

export enum KazeType {
  Ton,
  Nan,
  Sya,
  Pei,
}

export interface IKaze {
  type: KazeType;
  kyoku: number;
  honba: number;
}

export const OKaze: IKaze = {
  type: KazeType.Ton,
  kyoku: 1,
  honba: 0,
};

export const RKaze = Record<IKaze>(OKaze);

export class Kaze extends RKaze {
}
