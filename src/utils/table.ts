import { HeadCell } from "model/table";

export class TableUtil {
  static Thead = (
    name: string = "TableName",
    label = "Table Label",
    options: HeadCell = {} as HeadCell
  ): HeadCell => {
    return {
      searchKey: name,
      defaultSortField: name,
      withSort: true,
      ...options,
      id: name,
      label: label,
    };
  };
}
