import React, { useCallback, useContext, useEffect, useState } from "react";
import useUrl from "./GeneralUrl";
import styled from "styled-components";
import UserDetails from "../Authentication";
import toast from "react-hot-toast";
import Product from "../../../public/ProductNotFound.avif";
import { Button } from "../Style/NavComponent";
import useOrder from "./GetOrder";
// import GetOrder from "./GetOrder";
import { redirect, useNavigate } from "react-router-dom";
import GetOrder from "./GetOrder";
import EditHandler from "../Common/EditHandler";
import { DeleteComponentHandler } from "../Common/DeleteHandler";
import ProductNotFOund from "./ProductNotFOund";
import PaymentSystem from "../Common/PaymentSysten";
import PaymentByStripe from "./PaymentByStripe";
const DIV = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
`;

const CartStyled = styled.div`
  width: 100%;
  /* margin-top: 5rem; */
  padding: 1rem;
  margin: 0 auto;
  @media (min-width: 480px) {
    width: 70%;
  }
`;

const CartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: lightgreen;
  border-radius: 0.5rem 1rem;
  padding: 1rem;
  row-gap: 1rem;
`;

const CartHeader = styled.div`
  font-weight: bold;
  font-size: 1rem;
  border-bottom: 2px solid black;
`;

const CartCell = styled.div`
  font-size: 1rem;
  display: block;

  align-items: center;
`;

const CardDetail = styled.div`
  display: block;
  gap: 0.5rem;
  align-items: center;
`;

const AddtoCart = () => {
  const { setResponse, data, loading, error } = useUrl();
  const [cartid, setCartid] = useState();
  const { token } = useContext(UserDetails);
  const navigate = useNavigate();
  console.log(token);
  let TotalPrice = [];

  const DataFetch = useCallback(async () => {
    // console.log(token);

    await setResponse({
      url: "http://localhost:5000/cart",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  }, [token]);
  useEffect(() => {
    DataFetch();
  }, [DataFetch]);

  useEffect(() => {
    if (loading) {
      toast.success("loading");
    }
    if (data) {
      console.log(data);
      setCartid(data.message.id);
    }

    if (error) {
      // toast.error(error.message);
    }
  }, [error, data, loading]);
  if (data == undefined || data.message.products.length == 0) {
    return <ProductNotFOund />;
  }
  // if (error) {
  //   return <h1>{error.message}</h1>;
  // }
  // const HandleSubmit = ({ data }) => {
  //   console.log(data);
  //   GetOrder(data);
  //   navigate("/");
  // };
  // if (data && data.message.length == 0) {
  //   return <h4>Data not found</h4>;
  // }

  // console.log(data);
  // if (!data || !Array.isArray(data.message)) return <h1>Data not found</h1>;
  return (
    <DIV>
      <CartStyled>
        <CartContainer>
          {/* Header */}
          <CartHeader>Product</CartHeader>
          <CartHeader>Quantity</CartHeader>
          <CartHeader>Total Price</CartHeader>
          <CartHeader>Delete</CartHeader>

          {/* Body */}
          {data &&
            data?.message.products.map((val, index) => {
              const quantity = val.cartItem?.quantity ?? 0;
              const price = val.price ?? 0;
              const id = val.cartItem?.id ?? "";
              const totalPrice = quantity * price;
              TotalPrice.push(totalPrice);
              console.log("Value of cart");
              console.log(id);
              return (
                <React.Fragment key={index}>
                  <CartCell>{val.name}</CartCell>
                  <CartCell>
                    <CardDetail>
                      {quantity}
                      {/* <span>{quantity}</span>
                  <span>*</span>
                  <span>{price}</span> */}
                    </CardDetail>
                  </CartCell>
                  <CartCell>{totalPrice}</CartCell>
                  <CartCell>
                    <DeleteComponentHandler
                      deleteid={id}
                      url="http://localhost:5000/cart"
                      onSucess={DataFetch}
                    />
                  </CartCell>
                </React.Fragment>
              );
            })}
        </CartContainer>
      </CartStyled>
      {cartid && (
        <div style={{ display: "flex", justifyContent: "center", gap: "5rem" }}>
          <PaymentSystem
            totalPrice={TotalPrice}
            orderData={data}
            SuccessUrl={`http://localhost:5173/user/payment/${cartid}`}
            cartId={cartid}
          />
          <PaymentByStripe orderData={data} totalPrice={TotalPrice} />
        </div>
      )}
      {/* <GetOrder orderData={data} amount={TotalPrice} /> */}
    </DIV>
  );
};

export default AddtoCart;
