import React, { useContext, useEffect } from "react";
import useCategory from "../Admin/CategorywithProducts";
import useCategoryList from "../Admin/RawCategory";
import UserDetails from "../Authentication";
import {
  Column,
  Container,
  Header,
  OrderTable,
  TableHeader,
  TableRow,
  Wrapper,
} from "../Style/TableStyel";

export default function AllPaymentDetails() {
  const { token } = useContext(UserDetails);
  const { fetchData, data } = useCategoryList({
    url: "http://localhost:5000/payment",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  console.log(data);

  return (
    <Container>
      {data && data.message.length > 0 ? (
        <Wrapper>
          <Header>Your Complete Transaction List</Header>

          {data && data.message.length > 0 && (
            <OrderTable>
              <TableHeader>
                <Column flex={1}>S.N</Column>
                <Column>Amount</Column>
                <Column flex={1}>Payment At</Column>
                <Column>Payment Method</Column>
              </TableHeader>

              {data.message.map((transaction, idx) => (
                <TableRow key={idx}>
                  <Column flex={1}>{idx + 1}</Column>
                  <Column flex={1}>{transaction.amount}</Column>
                  <Column flex={1} bold>
                    {new Date(transaction.createdAt).toLocaleString()}
                  </Column>
                  <Column>{transaction.method}</Column>
                </TableRow>
              ))}
            </OrderTable>
          )}
        </Wrapper>
      ) : (
        <h3>No order placed yet...</h3>
      )}
    </Container>
  );
}
