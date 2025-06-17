import React, { useContext, useEffect, useState } from "react";
import useUrl from "./GeneralUrl";
import UserDetails from "../Authentication";
import { GridCart } from "./Product";
import ProductCard from "./ProductCard";

export default function ReccommendationFeature() {
  const { setResponse, data } = useUrl();
  const [recommend, setReccomend] = useState();
  const { token } = useContext(UserDetails);
  useEffect(() => {
    setResponse({
      url: "http://localhost:5000/order/recommend",
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }, []);
  useEffect(() => {
    if (data) {
      setReccomend(data.message);
    }
  }, [data]);
  if (!data) {
    return <h1>loading...</h1>;
  }
  if (data.length == 0) {
    return <h1>No data found</h1>;
  }
  return (
    <GridCart>
      {recommend
        ? recommend.map((vals) => (
            <ProductCard
              name={vals.name}
              image={vals.image}
              id={vals.pro_id}
              price={vals.price}
              key={vals.pro_id}
            />
          ))
        : "No data found"}
    </GridCart>
  );
}
