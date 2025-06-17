import React, { useContext, useEffect } from "react";
import { StyledButton } from "../Common/PaymentSysten";
import { loadStripe } from "@stripe/stripe-js";
import useUrl from "./GeneralUrl";
import UserDetails from "../Authentication";

const stripePromise = loadStripe(
  "pk_test_51RPd4dB9pn2YM0qy3AA3f9REzyLi6t6jVKFJwUp0jWJbrewvsdJmDZPCwyheLzzgbLij9x85oWO478fme9Aownya00TIPSPzPn"
);

export default function PaymentByStripe({ orderData, totalPrice }) {
  const { setResponse, data } = useUrl();
  const { token } = useContext(UserDetails);

  const HandlePayment = async () => {
    await setResponse({
      url: "http://localhost:5000/payment/stripe",
      body: JSON.stringify({ orderData, totalPrice }),
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "POST",
    });
  };

  useEffect(() => {
    const redirectToStripe = async () => {
      if (data && data.message?.id) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({
          sessionId: data.message.id,
        });
      }
    };

    redirectToStripe();
  }, [data]);

  return <StyledButton onClick={HandlePayment}>Pay By Stripe</StyledButton>;
}
