import React, { useContext, useEffect, useState } from "react";
import useUrl from "../Helper/GeneralUrl";
import UserDetails from "../Authentication";

export default function useCategory() {
  const [category, setCategory] = useState();
  const { setResponse, data, error, loading } = useUrl();

  useEffect(() => {
    setResponse({
      url: "http://localhost:5000/category",
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
  }, []);
  useEffect(() => {
    if (data) {
      console.log(data);
      setCategory(data.message);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      // setCategory(data.message);
      console.log(error);
    }
  }, [error]);

  return { category, loading, error };
}
