import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../Style/NavComponent";
import { v4 } from "uuid";
import Cr from "crypto-js";
import styled from "styled-components";
export const StyledButton = styled(Button)`
  padding: 10px 12px;
`;

export default function PaymentSystem({
  totalPrice,
  orderData,
  SuccessUrl,
  cartId,
}) {
  // console.log(cartId);
  // const { amount } = useParams();
  // console.log(amount);
  // const SuccessUrl = `http://localhost:5173/user/payment/${cartId}`;
  // console.log(SuccessUrl);
  const amount = totalPrice.reduce((a, c) => a + c, 0);
  const [formData, setFormData] = useState({
    amount: amount.toString(),
    tax_amount: "0",
    total_amount: amount.toString(),
    transaction_uuid: "",
    product_code: "EPAYTEST",
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: SuccessUrl,

    failure_url: "http://localhost:5173/",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  const generateSignature = ({
    total_amount,
    transaction_uuid,
    product_code,
    secret,
  }) => {
    const signatureHashed = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hashedGen = Cr.HmacSHA256(signatureHashed, secret);
    const HashedSignature = Cr.enc.Base64.stringify(hashedGen);
    return HashedSignature;
  };
  useEffect(() => {
    const transaction_uuid = v4();
    const newSignature = generateSignature({
      total_amount: formData.total_amount,
      transaction_uuid,
      product_code: formData.product_code,
      secret: formData.secret,
    });

    setFormData((prev) => ({
      ...prev,
      transaction_uuid,
      signature: newSignature,
    }));
  }, [formData.total_amount]);
  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input type="hidden" name="amount" value={formData.amount} />
      <input type="hidden" name="tax_amount" value={formData.tax_amount} />
      <input type="hidden" name="total_amount" value={formData.total_amount} />
      <input
        type="hidden"
        name="transaction_uuid"
        value={formData.transaction_uuid}
      />
      <input type="hidden" name="product_code" value={formData.product_code} />
      <input
        type="hidden"
        name="product_service_charge"
        value={formData.product_service_charge}
      />
      <input
        type="hidden"
        name="product_delivery_charge"
        value={formData.product_delivery_charge}
      />
      <input type="hidden" name="success_url" value={formData.success_url} />
      <input type="hidden" name="failure_url" value={formData.failure_url} />
      <input
        type="hidden"
        name="signed_field_names"
        value={formData.signed_field_names}
      />
      {/* <input type="hidden" name="pid" value={formData.pid} /> */}
      <input type="hidden" name="signature" value={formData.signature} />
      <StyledButton>Pay VIA ESEWA</StyledButton>
    </form>
  );
}
