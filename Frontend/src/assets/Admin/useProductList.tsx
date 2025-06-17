import React from "react";
import useCategoryList from "./RawCategory";

export default function useProductList() {
  const { data, loading, fetchData } = useCategoryList({
    url: "http://localhost:5000/product",
    method: "GET",
  });
  return { data, loading, fetchData };
}
