import { Record } from "immutable";

import { Role, RoleType } from "models/Role";

export interface IPoint {
  role: Role;
  hang: number;
  fu: number;
  point: number;
}

export const OPoint: IPoint = {
  role: new Role(),
  hang: 1,
  fu: 20,
  point: 0,
};

export const RPoint = Record<IPoint>(OPoint);

export class Point extends RPoint {
  /**
   * ロン上がりの時の点数
   */
  get ron() {
    return this.point;
  }

  /**
   * ツモ上がりの時の点数
   */
  get tsumo() {
    const pays = [];

    if (this.role.type === RoleType.Parent) {
      pays.push(Number(Math.ceil(this.point / 3 / 100) * 100));
    } else {
      pays.push(Number(Math.ceil(this.point / 2 / 2 / 100) * 100));
      pays.push(Number(Math.ceil(this.point / 2 / 100) * 100));
    }

    return pays;
  }
}