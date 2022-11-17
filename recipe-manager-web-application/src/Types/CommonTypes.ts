export interface PaginatedResponse<T> {
  items?: T[];
  offset?: number;
  total?: number;
}

export type QueryParameters = Record<string, string | string[]>;

export interface MinMaxValue {
  min?: number;
  max?: number;
}

export interface RangeOrTrueValue extends MinMaxValue {
  trueValue?: number;
}
