export interface PageMetaDto {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface PageDto<T> {
  data: T[];
  meta: PageMetaDto;
}
