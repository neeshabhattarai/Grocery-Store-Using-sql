import React from "react";
import {
  Column,
  Container,
  Header,
  OrderTable,
  ProductImage,
  TableHeader,
  TableRow,
  Wrapper,
} from "../Style/TableStyel";
import { useTotalOrder } from "./OrderList";
import { UrlPath } from "../Common/Path";

export default function AdminOrderList() {
  const { list: order, loading } = useTotalOrder();

  return (
    <Container>
      <Wrapper>
        <Header>Total Order List</Header>

        {order && order.length > 0 ? (
          <OrderTable>
            <TableHeader>
              <Column flex={0.5}>S.N</Column>
              <Column flex={1}>Image</Column>

              {/* <Column flex={2}>User ID</Column> */}
              <Column flex={1}>Name</Column>

              <Column flex={1}>Product Name</Column>
              <Column flex={1}>Quantity</Column>
              <Column flex={1}>Total Price</Column>
              <Column flex={1}>Order At</Column>
            </TableHeader>

            {order.map((orderItem, orderIndex) =>
              orderItem.products.map((product, productIndex) => {
                const date = new Date(orderItem.createdAt);

                const day = date.getDate();
                const month = date.toLocaleString("en-US", { month: "short" });
                const year = date.getFullYear();

                let hours = date.getHours();
                const minutes = String(date.getMinutes()).padStart(2, "0");
                const ampm = hours >= 12 ? "pm" : "am";

                hours = hours % 12;
                hours = hours ? hours : 12;

                const formatted = `${day} ${month} ${year} (${hours}:${minutes} ${ampm})`;

                return (
                  <TableRow key={`${orderItem.id}-${product.pro_id}`}>
                    <Column flex={0.5}>{orderIndex + 1}</Column>
                    <Column flex={1}>
                      <ProductImage src={`${UrlPath}/${product.image}`} />
                    </Column>
                    {/* <Column flex={2}>{orderItem.userUserid}</Column> */}
                    <Column flex={1}>{orderItem.user.name}</Column>
                    <Column flex={1}>{product.name}</Column>
                    <Column flex={1}>{product.orderItem.quantity}</Column>
                    <Column flex={1}>
                      {product.orderItem.quantity * product.price}
                    </Column>
                    <Column flex={1}>{formatted}</Column>
                  </TableRow>
                );
              })
            )}
          </OrderTable>
        ) : (
          <h3>Order details can't be found</h3>
        )}
      </Wrapper>
    </Container>
  );
}
