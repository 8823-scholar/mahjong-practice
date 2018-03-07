#!/usr/bin/env node

import optimist from "optimist";

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

const calculator = new PointCalculator();
