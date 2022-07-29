import { useCallback, useState } from "react";
import { useAuth } from "../Components/AuthProvider";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default function useMutate<T>(
  endpointPath: string,
  httpMethod: HttpMethod,
  onComplete?: (result: T) => void,
  onError?: () => void,
  jsonData?: boolean
) {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const callback = useCallback(
    (payload?: FormData | string) => {
      setLoading(true);

      fetch(endpointPath, {
        method: httpMethod,
        headers: !jsonData
          ? new Headers({
              Authorization: `Bearer ${auth?.bearerToken}`,
            })
          : new Headers({
              Authorization: `Bearer ${auth?.bearerToken}`,
              "Content-Type": "application/json;charset=utf-8",
            }),
        body: payload,
      })
        .then((result) => {
          if (!result.ok) {
            throw Error("Could not fetch the data");
          }
          return result.json();
        })
        .then((data) => {
          setLoading(false);
          onComplete?.(data);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          onError?.();
        });
    },
    [endpointPath, httpMethod]
  );

  return { callback, loading };
}
