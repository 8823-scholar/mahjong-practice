#!/usr/bin/env node

import * as Table from "cli-table";
import * as emoji from "node-emoji";
import optimist from "optimist";
import { question, keyInSelect } from "readline-sync";

import { Point, childPointList, parentPointList } from "models";
import PointCalculator from "services/PointCalculator";

const usage = `
得点表暗記練習
ランダムに出題します

Usage: yarn practice-point-calc
`;

enum InputType {
  Select = "select",
  Text = "text",
}

const defaults = {
  input: InputType.Select,
  list: false,
  help: false,
};

const opts = optimist(defaults)
  .usage(usage)
  .describe("input", "入力方式(select: 選択式、text: 入力式).")
  .describe("list", "得点表を表示.")
  .describe("help", "show help.");

const argv = opts.argv;

// ヘルプの表示
if (argv.help) {
  opts.showHelp(console.log);
  process.exit();
}

// 得点表の表示
if (argv.list) {
  // 子の点数表
  const childTable = new Table({
    head: ["", "1ﾊﾝ", "2ﾊﾝ", "3ﾊﾝ", "4ﾊﾝ"],
    colWidths: [10, 15, 15, 15, 15],
  });
  childPointList.matrix.forEachRow((row, fu) => {
    const cells = [];
    for (let i = 0; i < 4; i++) {
      cells.push(row.get(i) ? `${row.get(i)!.ron}\n${row.get(i)!.tsumo[0]}/${row.get(i)!.tsumo[1]}` : "");
    }
    childTable.push({[`${fu}ﾌ`]: cells});
  });

  console.log(`### ${childPointList.role.name}の得点表`);
  console.log(childTable.toString());

  // 親の点数表
  const parentTable = new Table({
    head: ["", "1ﾊﾝ", "2ﾊﾝ", "3ﾊﾝ", "4ﾊﾝ"],
    colWidths: [10, 15, 15, 15, 15],
  });
  parentPointList.matrix.forEachRow((row, fu) => {
    const cells = [];
    for (let i = 0; i < 4; i++) {
      cells.push(row.get(i) ? `${row.get(i)!.ron}\n${row.get(i)!.tsumo[0]}ｵｰﾙ` : "");
    }
    parentTable.push({[`${fu}ﾌ`]: cells});
  });

  console.log(`### ${parentPointList.role.name}の得点表`);
  console.log(parentTable.toString());

  process.exit();
}

while (true) {
  const quest = PointCalculator.random();
  const collect = quest;
  console.log(`${quest.role.name} ${quest.hang}翻 ${quest.fu}符の得点は？`);

  // 選択式
  let answer: Point;
  if (argv.input === InputType.Select) {
    const answers = PointCalculator.sample(4, {except: [quest], strict: false})
                      .push(collect)
                      .sortBy(Math.random);
    const index = keyInSelect(answers.map((a) => a.point.toString()).toArray());
    if (index < 0) {
      process.exit();
    }
    answer = answers.get(index)!;

  // 入力式
  } else {
    const input = question("ロン時の得点で解答してください: ");
    try {
      answer = PointCalculator.list(collect.role).find(collect.hang, collect.fu, parseInt(input, 10));
    } catch {
      answer = new Point();
    }
  }

  if (answer.same(collect)) {
    console.log(emoji.get(":ok_woman:"));
  } else {
    console.log(emoji.get(":no_good:"));
  }
  console.log(collect.toString());
  console.log("----------------------------------------\n");
}
