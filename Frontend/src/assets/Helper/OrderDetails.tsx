import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import useUrl from "./GeneralUrl";
import UserDetails from "../Authentication";
import { UrlPath } from "../Common/Path";
import {
  ClearButton,
  Column,
  Container,
  Header,
  OrderTable,
  ProductImage,
  TableHeader,
  TableRow,
  TotalPrice,
  Wrapper,
} from "../Style/TableStyel";
import { DeleteOrder } from "../Admin/OrderList";
import Order from "./Order";

export default function OrderDetails() {
  const { setResponse, data } = useUrl();
  const { token } = useContext(UserDetails);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const DataFetch = async () => {
      await setResponse({
        url: "http://localhost:5000/order",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    };
    DataFetch();
  }, []);

  useEffect(() => {
    if (data && data.message) {
      console.log(data.message);
      const loadedProducts = [];
      data.message.forEach((order) => {
        order.products.forEach((product) => {
          loadedProducts.push({
            ...product,
            quantity: product.orderItem.quantity || 1,
            orderedAt: order.createdAt,
            transaction: product.orderItem.transactionid,
          });
        });
      });
      console.log(loadedProducts);
      setProducts(loadedProducts);
    }
  }, [data]);

  const grandTotal = products.reduce((sum, product) => {
    return (
      sum + Number(product.price || 0) * Number(product.orderItem.quantity || 1)
    );
  }, 0);

  if (!products || products.length == 0) {
    return <Order />;
  }

  return (
    <Container>
      <Wrapper>
        <Header>Your Complete Order List</Header>

        {products.length > 0 && (
          <>
            <OrderTable>
              <TableHeader>
                <Column flex={1}>S.N</Column>

                <Column flex={1}>Image</Column>
                <Column flex={1}>Name</Column>
                <Column flex={1}>Price</Column>
                <Column flex={1}>Quantity</Column>
                <Column flex={1}>Total</Column>
                <Column flex={1}>Ordered On</Column>
              </TableHeader>

              {products.map((product, idx) => {
                const totalPerItem =
                  Number(product.price || 0) *
                  Number(product.orderItem.quantity || 1);
                return (
                  <TableRow key={idx}>
                    <Column flex={1}>{idx + 1}</Column>
                    <Column flex={1}>
                      <ProductImage
                        src={`${UrlPath}/${product.image}`}
                        alt={product.name}
                      />
                    </Column>
                    <Column flex={1} bold>
                      {product.name}
                    </Column>
                    <Column flex={1}>Rs {product.price}</Column>
                    <Column flex={1}>{product.orderItem.quantity}</Column>
                    <Column flex={1}>Rs {totalPerItem.toFixed(2)}</Column>
                    <Column flex={1}>
                      {new Date(product.orderedAt).toLocaleString()}
                    </Column>
                  </TableRow>
                );
              })}

              <TotalPrice>Grand Total: Rs {grandTotal.toFixed(2)}</TotalPrice>
            </OrderTable>

            <DeleteOrder ClearItem={setProducts} />
          </>
        )}
      </Wrapper>
    </Container>
  );
}
