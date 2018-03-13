import { PaiList } from "models";

export class PaiListDrawer {
  static draw(list: PaiList): string {
    const lines: string[] = [];

    for (let i = 0; i < list.height; i++) {
      lines.push(list.drawLine(i));
    }

    return lines.join("");
  }
}
