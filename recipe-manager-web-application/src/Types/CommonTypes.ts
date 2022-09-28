export interface PaginatedResponse<T> {
  items: T[];
  offset: number;
  total: number;
}

export type QueryParamters = Record<string, string | string[]>;

export interface MinMaxValue {
  min?: number;
  max?: number;
}
