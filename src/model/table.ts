export interface HeadCell {
  disablePadding?: boolean;
  id?: any;
  label?: string;
  align?: "center" | "left" | "right" | "inherit" | "justify" | undefined;
  showSelect?: boolean;
  searchKey?: string;
  withSearchBox?: boolean;
  listItems?: any[];
  defaultSortField?: any;
  withSort?: boolean;
  showMultiSelect?: boolean;
}
export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}
