import { Record, List } from "immutable";
import { find as _find } from "lodash";

import { Point } from "models/Point";
import { Role } from "models/Role";

export interface IPointList {
  role: Role;
  points: List<Point>;
}

export const OPointList: IPointList = {
  role: new Role(),
  points: List(),
};

export const RPointList = Record<IPointList>(OPointList);

export class PointList extends RPointList {
  get size() {
    return this.points.size;
  }

  get matrix() {
    return this.toMatrix();
  }

  add(hang: number, fu: number, point: number): this {
    return this.update("points", (points) => points.push(new Point({role: this.role, hang, fu, point})));
  }

  list(): this {
    return this;
  }

  find(hang: number, fu: number, point?: number): Point {
    const p = this.points.find((_p) => _p.hang === hang && _p.fu === fu);
    if (! p)
      throw new Error("invalid hang or fu.");
    if (point !== undefined && point !== p.point)
      throw new Error("invalid hang or fu.");
    return p;
  }

  random(option: {except?: Point[], strict?: boolean} = {}): Point {
    const { except = [], strict = true } = option;
    const point = this.points.filterNot((p) => !!_find(except, (e) => e.same(p, strict))).sortBy(Math.random).first();
    if (! point)
      throw new Error("not found.");
    return point;
  }

  toMatrix(): Matrix {
    const matrix = new Matrix(4, 11);

    this.points.forEach((p) => matrix.set(p.matrixCol, p.matrixRow, p));

    return matrix;
  }

  static create(role: Role) {
    return new PointList({role});
  }
}

type MatrixValue = Point | null;
interface MatrixCell {
  col: number;
  row: number;
  value: MatrixValue;
}
type MatrixRow = List<MatrixValue>;

class Matrix {
  rows: number;
  cols: number;
  matrix: List<MatrixRow> = List<MatrixRow>();

  constructor(cols: number, rows: number) {
    this.rows = rows;
    this.cols = cols;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.set(j, i, null);
      }
    }
  }

  set(col: number, row: number, value: MatrixValue) {
    const matrixRow: MatrixRow = this.matrix.get(row) || List<MatrixValue>();
    this.matrix = this.matrix.set(row, matrixRow.set(col, value));
  }

  get(col: number, row: number): MatrixValue {
    const matrixRow = this.matrix.get(row);
    if (! matrixRow)
      return null;

    return matrixRow.get(col) || null;
  }

  forEach(fn: (c: MatrixCell) => void) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        fn({col: j, row: i, value: this.get(j, i)});
      }
    }
  }

  forEachRow(fn: (r: MatrixRow, fu: number) => void) {
    for (let i = 0; i < this.rows; i++) {
      const row = this.matrix.get(i);
      if (row) {
        const fu = row.find((c) => !!c)!.fu;
        fn(row, fu);
      }
    }
  }
}

// 子の得点表を定義
export const childPointList = PointList.create(Role.Child)
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

// 親の得点表を定義
export const parentPointList = PointList.create(Role.Parent)
  .add(1, 30, 1500)
  .add(1, 40, 2000)
  .add(1, 50, 2400)
  .add(1, 60, 2900)
  .add(1, 70, 3400)
  .add(1, 80, 3900)
  .add(1, 90, 4400)
  .add(1, 100, 4800)
  .add(1, 110, 5300)
  .add(2, 20, 2000)
  .add(2, 25, 2400)
  .add(2, 30, 2900)
  .add(2, 40, 3900)
  .add(2, 50, 4800)
  .add(2, 60, 5800)
  .add(2, 70, 6800)
  .add(2, 80, 7700)
  .add(2, 90, 8700)
  .add(2, 100, 9600)
  .add(2, 110, 10600)
  .add(3, 20, 3900)
  .add(3, 25, 4800)
  .add(3, 30, 5800)
  .add(3, 40, 7700)
  .add(3, 50, 9600)
  .add(3, 60, 11600)
  .add(4, 20, 7700)
  .add(4, 25, 9600)
  .add(4, 30, 11600)
  .list();
