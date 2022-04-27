import { useEffect, useState } from "react";
import { authProvider, loginRequest } from "../authConfig";

export default function useFetch<T>({
  endpointPath,
  onComplete,
  onError,
}: {
  endpointPath: string;
  onComplete?: () => void;
  onError?: () => void;
}) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authProvider
      .acquireTokenSilent(loginRequest)
      .then((response) => {
        fetch(endpointPath, {
          headers: new Headers({
            method: "GET",
            Authorization: `Bearer ${response.accessToken}`,
          }),
        })
          .then((result) => {
            if (!result.ok) {
              throw Error("Could not fetch the data");
            }
            return result.json();
          })
          .then((data) => {
            setData(data);
            setLoading(false);
            onComplete?.();
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
  }, [endpointPath]);

  // Returns the fetched data itself, a loading state and a callback to directly modify the fetch data (useful for when a mutation result needs to be reflected to the user without calling the query again)
  return { data, loading, modifyData: setData };
}
