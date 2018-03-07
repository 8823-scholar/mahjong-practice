import { Record, List } from "immutable";

import { Point } from "models/Point";
import { Role, RoleType } from "models/Role";

export interface IPointList {
  role: Role,
  points: List<Point>;
}

export const OPointList: IPointList = {
  role: new Role(),
  points: List(),
};

export const RPointList = Record<IPointList>(OPointList);

export class PointList extends RPointList {
  add(hang: number, fu: number, point: number): this {
    return this.update("points", (points) => points.push(new Point({role: this.role, hang, fu, point})));
  }

  list(): this {
    return this;
  }

  find(hang: number, fu: number): Point {
    const point = this.points.find((p) => p.hang === hang && p.fu === fu);
    if (! point)
      throw new Error("invalid hang or fu.");
    return point;
  }

  static create(role: RoleType) {
    return new PointList({role: new Role({type: role})});
  }
}

// 子の得点表を定義
export const childPointList = PointList.create(RoleType.Child)
  .add(1, 30, 1000)
  .add(1, 40, 1300)
  .add(1, 50, 1600)
  .add(1, 60, 2000)
  .add(1, 70, 2300)
  .add(1, 80, 2600)
  .add(1, 90, 2900)
  .add(1, 100, 3200)
  .add(1, 110, 3600)
  .add(2, 20, 1300)
  .add(2, 25, 1600)
  .add(2, 30, 2000)
  .add(2, 40, 2600)
  .add(2, 50, 3200)
  .add(2, 60, 3900)
  .add(2, 70, 4500)
  .add(2, 80, 5200)
  .add(2, 90, 5800)
  .add(2, 100, 6400)
  .add(2, 110, 7100)
  .add(3, 20, 2600)
  .add(3, 25, 3200)
  .add(3, 30, 3900)
  .add(3, 40, 5200)
  .add(3, 50, 6400)
  .add(3, 60, 7700)
  .add(4, 20, 5200)
  .add(4, 25, 6400)
  .add(4, 30, 7700)
  .list();
