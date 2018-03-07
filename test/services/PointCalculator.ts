import { expect } from "chai";
import "mocha";

import { Point, Role, RoleType, childPointList } from "models";
import PointCalculator from "services/PointCalculator";

describe("PointCalculator", () => {
  describe("PointCalculator.calc", () => {
    it("得点の計算ができる", () => {
      const point = PointCalculator.calc(Role.Child, 2, 20);
      expect(point.ron).to.equal(1300);
      expect(point.tsumo).to.deep.equal([400, 700]);
    });
  });

  describe("PointCalculator.random", () => {
    it("親、子問わず、ランダムに一つの点数を取得する", () => {
      const point = PointCalculator.random();
      expect(point).to.be.instanceOf(Point);
    });
  });

  describe("PointCalculator.sample", () => {
    it("サンプルをランダムにピックする", () => {
      const points = PointCalculator.sample(4);
      expect(points).to.have.property("size", 4);
    });

    it("Roleを指定してピックする場合", () => {
      const points = PointCalculator.sample(4, {role: Role.Child});
      expect(points.map((p) => p.role.type).toArray()).to.not.include(RoleType.Parent);
    });

    it("特定の得点を除外してピックする場合", () => {
      const target = new Point({role: Role.Child, hang: 3, fu: 30});
      const points = PointCalculator.sample(childPointList.size - 1, {
        role: Role.Child,
        except: [target],
      });
      for (const point of points) {
        expect(point.same(target)).to.equal(false);
      }
    });
  });
});
