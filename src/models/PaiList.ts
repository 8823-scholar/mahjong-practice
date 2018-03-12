import { Record } from "immutable";

import { Pai } from "models/Pai";

export interface IPaiList {
  list: Pai[];
  tsumo: Pai;
}

export const OPaiList: IPaiList = {
  list: [],
  tsumo: new Pai(),
};

export const RPaiList = Record<IPaiList>(OPaiList);

export class PaiList extends RPaiList {
}
