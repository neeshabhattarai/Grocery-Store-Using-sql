import React, { useCallback, useEffect } from "react";
import useUrl from "../Helper/GeneralUrl";

export default function useUpdateHandler({ url, body, method = "GET" }) {
  const { setResponse, data, error, loading } = useUrl();

  const fetchData = useCallback(async () => {
    await setResponse({
      url,
      body,
      method,
      headers: {
        "content-Type": "application/json",
      },
    });
  }, [setResponse]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, fetchData };
}
