import { QueryParameters } from "../type/commonTypes";

export const PAGINATION_LIMIT = 10;

const defaultFilters = ["offset", "limit"];

export function getProperty(
  QueryParameters: QueryParameters,
  propertyName: string
) {
  return Object.entries(QueryParameters).find(
    (property) => property[0] === propertyName
  )?.[1];
}

export function expandQueryParameters(QueryParameters: QueryParameters) {
  return Object.entries(QueryParameters).reduce(
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

export function getCount(queryParameters: QueryParameters) {
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
