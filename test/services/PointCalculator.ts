import { expect } from "chai";
import "mocha";

import { RoleType } from "models";
import PointCalculator from "services/PointCalculator";

describe("PointCalculator", () => {
  it("得点の計算ができる", () => {
    const point = PointCalculator.calc(RoleType.Child, 2, 20);
    expect(point.ron).to.equal(1300);
    expect(point.tsumo).to.deep.equal([400, 700]);
  })
});
