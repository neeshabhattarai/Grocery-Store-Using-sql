import { useContext, useEffect, useState } from "react";
import useUrl from "./GeneralUrl";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserDetails from "../Authentication";
import SearchBars from "./SearchBar";

export const GridCart = styled.div`
  /* display: block; */
  display: grid;
  /* display: flex; */
  /* flex-direction: column; */
  align-items: center;
  height: fit-content;
  width: 80%;
  flex-wrap: wrap;
  grid-template-columns: 1fr;
  /* margin-left: 1rem; */
  place-items: center;
  margin: 1rem auto 0 auto;
  padding: 0 0.8rem;
  justify-content: center;
  /* gap: rem; */
  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 21rem);
    /* flex-direction: row; */
    margin-top: 1.5rem;
  }
`;

const Product = () => {
  const [Params] = useSearchParams();
  const [pending, setPending] = useState(true); // Set initial value to true
  const { setResponse, loading, error, data } = useUrl();
  const { token } = useContext(UserDetails);
  const TypeRender = Params.get("item") ?? "";

  console.log(TypeRender);
  const UrlDefined = TypeRender
    ? `http://localhost:5000/product/recommend?item=${TypeRender}`
    : "http://localhost:5000/product";

  useEffect(() => {
    console.log("Hello");
    const RenderRecord = async () => {
      setPending(true);
      await setResponse({
        url: UrlDefined,
        headers: {
          "content-Type": "application/json",
          Authentication: "Bearer " + token,
        },
      });
      setPending(false); // Wait until the data is fetched before setting to false
    };
    RenderRecord();
  }, [TypeRender]); // Run only once on component mount
  if (pending) {
    return <h1>loading</h1>;
  }
  if (data && data.message.length == 0) {
    return <h1>No data found</h1>;
  }
  if (data) {
    console.log(data.message[0].name);
  }
  console.log(data);

  return (
    <GridCart>
      {data && <SearchBars />}
      {data &&
        data?.message.map((vals) => (
          <ProductCard
            name={vals.name}
            image={vals.image}
            id={vals.pro_id}
            price={vals.price}
            key={vals.pro_id}
          />
        ))}
    </GridCart>
  );
};

export default Product;
