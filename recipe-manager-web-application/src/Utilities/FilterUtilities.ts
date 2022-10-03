import { QueryParamters } from "../Types/CommonTypes";

export const PAGINATION_LIMIT = 10;

const defaultFilters = ["offset", "limit"];

export function getProperty<T>(
  record: Record<string, T>,
  propertyName: string
) {
  return Object.entries(record).find(
    (property) => property[0] === propertyName
  )?.[1];
}

export function expandQueryParamters(queryParamters: QueryParamters) {
  return Object.entries(queryParamters).reduce(
    (expandedQueryParameters: string[][], queryParameter) => [
      ...expandedQueryParameters,
      ...(queryParameter[1] instanceof Array
        ? queryParameter[1].map((queryParameterValue) => [
            queryParameter[0],
            queryParameterValue,
          ])
        : [[queryParameter[0], queryParameter[1]]]),
    ],
    []
  );
}

export function getCount(queryParameters: QueryParamters) {
  return Object.entries(queryParameters).reduce(
    (accumulator, current) =>
      (accumulator += !defaultFilters.includes(current[0])
        ? current[1] instanceof Array
          ? current[1].length
          : 1
        : 0),
    0
  );
}
