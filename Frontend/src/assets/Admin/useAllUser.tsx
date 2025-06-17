import React from "react";
import useCategoryList from "./RawCategory";

export default function useAllUser() {
  const { data, loading, fetchData } = useCategoryList({
    url: "http://localhost:5000/user",
    method: "GET",
  });
  return { data, loading, fetchData };
}
