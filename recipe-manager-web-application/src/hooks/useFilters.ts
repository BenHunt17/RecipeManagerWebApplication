import { useEffect, useState } from "react";
import { QueryParameters } from "../types/commonTypes";
import { PAGINATION_LIMIT } from "../Utilities/FilterUtilities";

export function useFilters() {
  const [queryParams, setQueryParams] = useState<QueryParameters>({
    offset: "PAGE:0",
    limit: `PAGE:${PAGINATION_LIMIT}`,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setQueryParams(() => {
      return {
        ...queryParams,
        offset: `PAGE:${(pageNumber - 1) * PAGINATION_LIMIT}`,
      };
    });
  }, [setQueryParams, pageNumber]);

  useEffect(
    () =>
      setQueryParams({
        offset: "PAGE:0",
        limit: `PAGE:${PAGINATION_LIMIT}`,
        ...(!!searchQuery.length ? { searchQuery: `LIKE:${searchQuery}` } : {}),
      }),
    [setQueryParams, searchQuery]
  );

  const appendFilters = (filters: QueryParameters) =>
    setQueryParams({
      offset: "PAGE:0",
      limit: `PAGE:${PAGINATION_LIMIT}`,
      ...(!!searchQuery.length ? { searchQuery: `LIKE:${searchQuery}` } : {}),
      ...filters,
    });

  const clearFilters = () =>
    setQueryParams({
      offset: "PAGE:0",
      limit: `PAGE:${PAGINATION_LIMIT}`,
      ...(!!searchQuery.length ? { searchQuery: `LIKE:${searchQuery}` } : {}),
    });

  return {
    queryParams,
    pageNumber,
    appendFilters,
    clearFilters,
    onSearch: (searchString: string) => setSearchQuery(searchString),
    onPageChange: (pageNumber: number) => setPageNumber(pageNumber),
  };
}
