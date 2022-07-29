import { useEffect, useState } from "react";
import { useAuth } from "../Components/AuthProvider";

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

  const auth = useAuth();

  useEffect(() => {
    fetch(endpointPath, {
      headers: new Headers({
        method: "GET",
        Authorization: `Bearer ${auth?.bearerToken}`,
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
      .catch(() => {
        setLoading(false);
        onError?.();
      });
  }, [endpointPath]);

  // Returns the fetched data itself, a loading state and a callback to directly modify the fetch data (useful for when a mutation result needs to be reflected to the user without calling the query again)
  return { data, loading, modifyData: setData };
}
