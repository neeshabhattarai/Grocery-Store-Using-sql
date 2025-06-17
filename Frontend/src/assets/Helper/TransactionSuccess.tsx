import { nav } from "framer-motion/client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  data,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Div } from "./ProductNotFOund";
import useUrl from "./GeneralUrl";
import UserDetails from "../Authentication";
import ImageT from "../../../public/transaction.png";
import styled from "styled-components";
import { Button } from "../Style/NavComponent";
const ImageStyled = styled.img`
  height: 13rem;
  width: 13rem;
  text-align: center;
  margin-bottom: 1rem;
`;
const Buttons = styled(Button)`
  background-color: #1b3d9d;
  padding: 9px 15px;
`;

export default function TransactionSuccess() {
  const { token } = useContext(UserDetails);
  const { id } = useParams();
  // console.log(cartid.get(id));
  console.log(id);
  const [data, setdata] = useState();
  const [search] = useSearchParams();
  const datas = search.get("data");

  const { setResponse, data: successMessage } = useUrl();
  const navigate = useNavigate();
  useEffect(() => {
    const result = atob(datas);
    const res = JSON.parse(result);
    setdata(res);
    console.log(result);
  }, [datas]);
  useEffect(() => {
    if (data) {
      setResponse({
        url: "http://localhost:5000/payment",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setResponse({
        url: `http://localhost:5000/order/${id}`,
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    }
    // navigate("/order");
  }, [data]);
  const HandleClick = () => {
    navigate("/payment/all");
  };
  return (
    <Div>
      <ImageStyled src={ImageT} />
      <h3>Transaction Succed</h3>
      {data && <h3>Rs:{data.total_amount} received</h3>}
      <Buttons onClick={HandleClick}>View Payment</Buttons>
    </Div>
  );
}
export const TransactionSuccessByStripe = () => {
  const [data, setData] = useState();
  const [sessions] = useSearchParams();
  const sessionDetails = sessions.get("session_id");
  const { token } = useContext(UserDetails);
  const navigate = useNavigate();
  const { setResponse, data: successMessage } = useUrl();
  const HandleClick = () => navigate("/order");

  const hasFetchedPayment = useRef(false);
  const hasPostedOrder = useRef(false); // NEW FLAG

  useEffect(() => {
    if (!hasFetchedPayment.current && sessionDetails) {
      hasFetchedPayment.current = true;
      setResponse({
        url: `http://localhost:5000/payment/success?session_id=${sessionDetails}`,
        headers: {
          Authorization: "Bearer " + token,
          "content-Type": "application/json",
        },
        method: "GET",
      });
    }
  }, [sessionDetails]);

  useEffect(() => {
    if (successMessage && !hasPostedOrder.current) {
      const { cartId } = successMessage?.message;
      if (cartId) {
        hasPostedOrder.current = true; // prevent re-posting
        setData(successMessage.message);
        setResponse({
          url: `http://localhost:5000/order/${Number.parseInt(cartId)}`,
          method: "POST",
          body: JSON.stringify(successMessage.message),
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
      }
    }
  }, [successMessage]);

  return (
    <>
      {data && (
        <Div>
          <ImageStyled src={ImageT} />
          <h3>Transaction Succeeded</h3>
          {successMessage && <h3>Rs:{data.total_amount} received</h3>}
          <Buttons onClick={HandleClick}>View Order</Buttons>
        </Div>
      )}
    </>
  );
};
