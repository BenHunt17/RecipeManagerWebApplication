import { useCallback, useState } from "react";
import { authProvider, loginRequest } from "../authConfig";

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
  onError?: () => void
) {
  const [loading, setLoading] = useState(false);

  const callback = useCallback(
    (payload: FormData) => {
      setLoading(true);
      authProvider
        .acquireTokenSilent(loginRequest)
        .then((response) => {
          fetch(endpointPath, {
            method: httpMethod,
            headers: new Headers({
              Authorization: `Bearer ${response.accessToken}`,
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
              setLoading(false);
              onError?.();
            });
        })
        .catch((error: Error) => {
          if (error.name === "InteractionRequiredAuthError") {
            return authProvider.acquireTokenPopup(loginRequest);
          }
        })
        .catch((error) => {
          throw Error(error);
        });
    },
    [endpointPath, httpMethod]
  );

  return { callback, loading };
}
