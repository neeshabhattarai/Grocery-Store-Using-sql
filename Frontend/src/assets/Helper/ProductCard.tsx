import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  getValue,
  QuantityMaintainer,
  ValueProvider,
} from "./Drawer/IncrementHandler";
import QuantityHandler from "./Drawer/IncrementHandler";
import CardHandler from "./CardHandler";
import { UrlPath } from "../Common/Path";
import { Ratings } from "./Rating";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  description: string;
  id: Int8Array;
}

const Card = styled.div`
  width: 100%;
  height: 23rem;

  overflow: hidden;
  margin: 3rem auto;
  font-family: "Poppins", sans-serif;
  background-color: aliceblue;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  border: 1px solid lightblue;
  @media (min-width: 480px) {
    width: 15rem;
    border-radius: 16px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: fill;
  border-bottom: 2px dotted #9e9eaf;
`;

const CardContent = styled.div`
  /* padding: 7px; */
  padding-left: 8px;
`;

const ProductName = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0px 0 9px 0;
  width: 100%;
  text-align: left;
  color: #04310fde;
  font-family: Georgia, serif;
  font-feature-settings: "liga" 0;
`;

const ProductDescription = styled.p`
  font-size: 13px;
  color: #777;
  margin: 3px 0;
`;

const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #272628;
  width: 100%;

  /* margin: 0.8rem 0 0 0; */
  text-align: left;
`;
export const CardButton = styled.button`
  padding: 8px 4px;

  width: 60%;
  background-color: blue;
  border-radius: 1rem;
  color: white;
  outline: none;
  border: none;
  margin: 14px 0;
  /* transform: translate(0); */
  transition: translate 1s ease;
  &:focus {
    outline-width: 2px;
    outline-color: green;
  }
  &:hover,
  &:active {
    outline: none;
    outline-color: #d9ddc2ac;
    background-color: #6c6cc8;
    outline-width: 2px;
    transform: scale(12px);
  }
`;

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  id,
}) => {
  const [rating, setRating] = useState(0);
  return (
    // <h1>hello</h1>

    <QuantityHandler>
      <Card>
        <CardImage src={`${UrlPath}/${image}`} alt={name} />
        <CardContent>
          <ProductName>{name}</ProductName>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "5px",
              width: "100%",
            }}
          >
            {" "}
            <ProductPrice>
              <span
                style={{
                  borderRadius: "1rem",
                  backgroundColor: "#61cd849c",
                  padding: " 0.2rem 0.4rem",
                  boxShadow: " 2px 2px #3c9271",
                }}
              >
                Rs.{price.toFixed(2)}
              </span>
            </ProductPrice>
            <Ratings rating={rating} setRating={setRating} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <QuantityMaintainer />
          </div>
          <CardHandler id={id} rating={rating} />
        </CardContent>
      </Card>
    </QuantityHandler>
  );
};

export default ProductCard;
