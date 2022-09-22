export interface PaginatedResponse<T> {
  items: T[];
  offset: number;
  total: number;
}
