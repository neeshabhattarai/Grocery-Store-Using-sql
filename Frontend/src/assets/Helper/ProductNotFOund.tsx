import React from "react";
import Image from "../Style/Nodata.jpeg";
import styled from "styled-components";
import { Button } from "../Style/NavComponent";
import { useNavigate } from "react-router-dom";
export const Div = styled.div`
  margin: 4rem 0;
`;
export const H3 = styled.h3`
  font-size: 1.8rem;
  margin: 0;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-feature-settings: "tnum";
  color: #6c6c73;
  margin: 0.5rem 0 1rem 0;
`;
export const Buttons = styled(Button)`
  padding: 8px 10px;
  background-image: linear-gradient(to right bottom, blue, red, green);
`;
export const Images = styled.img`
  height: 17rem;
  width: 35rem;
  margin-left: -6rem;
`;

export default function ProductNotFOund() {
  const navigate = useNavigate();
  return (
    <Div>
      <Images src={Image} />
      <H3>No product found</H3>
      <Buttons onClick={() => navigate("/category")}>Go to shopping</Buttons>
    </Div>
  );
}
