#!/usr/bin/env node

import * as emoji from "node-emoji";
import optimist from "optimist";
import { keyInSelect } from "readline-sync";

import PointCalculator from "services/PointCalculator";

const usage = `
得点表暗記練習
ランダムに出題します
`;

const opts = optimist({list: false, help: false})
  .usage(`${usage}\nUsage: yarn practice-point-calc`)
  .describe("list", "得点表を表示.")
  .describe("help", "show help.");

const argv = opts.argv;

if (argv.help) {
  opts.showHelp(console.log);
  process.exit();
}

while (true) {
  const question = PointCalculator.random();
  const collect = question;
  const answers = PointCalculator.sample(4, {except: [question], strict: false})
                    .push(collect)
                    .sortBy(Math.random);

  console.log(`${question.role.name} ${question.hang}翻 ${question.fu}符の得点は？`);

  const index = keyInSelect(answers.map((a) => a.point.toString()).toArray());
  if (index < 0) {
    process.exit();
  }

  const answer = answers.get(index)!;
  if (answer.same(collect)) {
    console.log(emoji.get(":ok_woman:"));
  } else {
    console.log(emoji.get(":no_good:"));
  }
  console.log(collect.toString());
  console.log("----------------------------------------\n");
}
