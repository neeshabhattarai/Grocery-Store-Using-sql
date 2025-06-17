import React from "react";
import Image from "../Style/or.jpg";
import { Buttons, Div, H3, Images } from "./ProductNotFOund";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const OrderImage = styled(Images)`
  margin-left: -5rem;
  height: 21rem;
`;
const Divs = styled(Div)`
  margin: 0rem 0;
`;

export default function Order() {
  const navigate = useNavigate();
  return (
    <Divs>
      <OrderImage src={Image} />
      <H3>No order placed yet...</H3>
      <Buttons onClick={() => navigate("/category")}>Start Order</Buttons>
    </Divs>
  );
}
