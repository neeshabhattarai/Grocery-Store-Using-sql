import React, { useContext, useEffect, useState, useCallback } from "react";
import useUrl from "../Helper/GeneralUrl";
import UserDetails from "../Authentication";

export default function useCategoryList({
  url,
  method = "GET",
  headers,
}: {
  url: string;
  method?: string;
  headers?: {};
}) {
  const { setResponse, data, error, loading } = useUrl();

  const fetchData = useCallback(async () => {
    await setResponse({
      url: url,
      method: method,
      headers: headers,
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // console.log(data);

  return { data, loading, fetchData };
}
