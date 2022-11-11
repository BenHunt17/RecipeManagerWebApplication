import { useEffect, useState } from "react";
import { QueryParameters } from "../types/commonTypes";
import { expandQueryParameters } from "../utils/FilterParams";
import { useAuth } from "./contextHooks";

export default function useFetch<T>({
  endpointPath,
  onComplete,
  onError,
  queryParams,
  skip,
}: {
  endpointPath: string;
  onComplete?: () => void;
  onError?: () => void;
  queryParams?: QueryParameters;
  skip?: boolean;
}) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(!skip);

  const auth = useAuth();

  useEffect(() => {
    if (skip) {
      return;
    }
    fetch(
      `${endpointPath}${
        queryParams
          ? `?${new URLSearchParams(
              expandQueryParameters(queryParams)
            ).toString()}`
          : ""
      }`,
      {
        headers: new Headers({
          method: "GET",
          Authorization: `Bearer ${auth?.bearerToken}`,
        }),
      }
    )
      .then((result) => {
        if (!result.ok) {
          throw Error("Could not fetch the data");
        }
        const isJson = result.headers
          .get("content-type")
          ?.includes("application/json");
        return isJson ? result.json() : result.text();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        onComplete?.();
      })
      .catch(() => {
        setLoading(false);
        onError?.();
      });
  }, [endpointPath, queryParams]);

  // Returns the fetched data itself, a loading state and a callback to directly modify the fetch data (useful for when a mutation result needs to be reflected to the user without calling the query again)
  return { data, loading, modifyData: setData };
}
