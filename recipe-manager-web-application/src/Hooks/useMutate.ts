import { useCallback, useState } from "react";
import { useAuth } from "./contextHooks";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

//TODO - these fetch hooks need to have the paramters groups/cleaned a bit
export default function useMutate<T>({
  endpointPath,
  httpMethod,
  onComplete,
  onError,
  jsonData,
  textResult,
  includeCredentials,
}: {
  endpointPath: string;
  httpMethod: HttpMethod;
  onComplete?: (result: T) => void;
  onError?: () => void;
  jsonData?: boolean;
  textResult?: boolean;
  includeCredentials?: boolean;
}) {
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
        credentials: includeCredentials ? "include" : "same-origin",
        body: payload,
      })
        .then((result) => {
          if (!result.ok) {
            throw Error("Could not fetch the data");
          }
          if (result.status === 204) {
            //No content
            return null;
          }
          return !textResult ? result.json() : result.text();
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
