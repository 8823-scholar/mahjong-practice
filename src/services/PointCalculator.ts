import { childPointList, RoleType, Point } from "models";

export default class PointCalculator {
  static calc(role: RoleType, hang: number, fu: number): Point {
    const list = childPointList;
    return list.find(hang, fu);
  }
}
