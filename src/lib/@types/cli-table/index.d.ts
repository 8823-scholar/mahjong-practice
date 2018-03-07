declare module "cli-table" {
  interface TableOption {
    head: string[];
    colWidths?: number[];
  }

  type TableRow = {[key: string]: string | string[]};

  class Table {
    constructor(option?: TableOption);
    push(row: TableRow): void;
  }

  namespace Table {}

  export = Table;
}
