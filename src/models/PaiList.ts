import { List } from "immutable";

import { Pai } from "models/Pai";

export class PaiList {
  list: List<Pai> = List();

  add(pai: Pai) {
    this.list = this.list.push(pai);
  }

  drawLine(index: number) {
    const line: string[] = [];

    this.list.forEach((pai) => line.push(pai.drawLine(index)));

    return line.join("") + "\n";
  }

  get(index: number) {
    return this.list.get(index);
  }

  get width() {
    let width = 0;

    this.list.forEach((p) => width = width + p.width);

    return width;
  }

  get height() {
    let height = 0;

    this.list.forEach((p) => height = height < p.height ? p.height : height);

    return height;
  }

  get length() {
    return this.list.size;
  }
}
