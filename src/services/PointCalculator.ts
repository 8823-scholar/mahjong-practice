import { List } from "immutable";

import { childPointList, parentPointList, PointList, Role, Point } from "models";

export default class PointCalculator {
  static calc(role: Role, hang: number, fu: number): Point {
    return this.list(role).find(hang, fu);
  }

  static random(option: {
    role?: Role,
    except?: Point[],
    strict?: boolean,
  } = {}): Point {
    const { role, except = [], strict } = option;
    return this.list(role).random({except, strict});
  }

  static sample(count: number, option: {
    role?: Role,
    except?: Point[],
    strict?: boolean,
  } = {}): List<Point> {
    let samples: List<Point> = List();
    const { role, strict, except = [] } = option;

    for (let i = 0; i < count; i++) {
      const sample = this.random({role, except, strict});
      samples = samples.push(sample);
      except.push(sample);
    }

    return samples;
  }

  static list(role?: Role): PointList {
    if (!role) {
      const rand = Math.random() * 10;
      return rand < 5 ? childPointList : parentPointList;
    } else {
      return role.isChild ? childPointList : parentPointList;
    }
  }
}
