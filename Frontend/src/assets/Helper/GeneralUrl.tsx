import { useCallback, useEffect, useRef, useState } from "react";

const useUrl = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const refAbort = useRef<AbortController[]>([]);

  const setResponse = useCallback(
    async ({
      url,
      method = "GET",
      body,
      headers = {},
    }: {
      url: string;
      method?: string;
      body?: BodyInit | null;
      headers?: HeadersInit;
    }) => {
      const httpAbort = new AbortController();
      refAbort.current.push(httpAbort);

      try {
        setLoading(true);
        const response = await fetch(url, {
          headers,
          body,
          method,
          signal: httpAbort.signal,
        });

        const responseData = await response.json();

        if (!response.ok) {
          setError(responseData?.message || "Error fetching data");
        } else {
          setData(responseData);
        }
      } catch (err: any) {
        setError(err?.message || "Network error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const cancelError = () => setError(null);

  useEffect(() => {
    return () => {
      refAbort.current.forEach((ab) => ab.abort());
    };
  }, []);

  return { error, data, loading, cancelError, setResponse };
};

export default useUrl;
