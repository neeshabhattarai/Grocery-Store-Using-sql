import React, { useContext, useEffect } from "react";
import useCategoryList from "./RawCategory";
import {
  Column,
  Container,
  Header,
  OrderTable,
  TableHeader,
  TableRow,
  TotalPrice,
  Wrapper,
  ProductImage,
} from "../Style/TableStyel";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useUrl from "../Helper/GeneralUrl";

import { DeleteComponentHandler } from "../Common/DeleteHandler";
import EditHandler from "../Common/EditHandler";
import { ModelView } from "../Common/ModelHandler";
import { AddButton } from "../Style/NavComponent";
import { UrlPath } from "../Common/Path";
import { Input } from "../Style/FormStyle";
import BodyHandler from "../Common/ProductEditHandler";
import UserDetails from "../Authentication";
import useProductList from "./useProductList";

export default function AllProduct() {
  const { token } = useContext(UserDetails);
  const { data, loading, fetchData } = useProductList();
  const product = data?.message;
  const navigate = useNavigate();

  if (loading) {
    return <h2>...loading</h2>;
  }

  return (
    <Container>
      <Wrapper>
        <Header>Your Product List</Header>

        {product && product.length > 0 ? (
          <OrderTable>
            <TableHeader>
              <Column flex={1}>S.N</Column>
              <Column flex={2}>Image</Column>
              <Column flex={2}>Name</Column>
              <Column flex={2}>Description</Column>
              <Column flex={2}>Price</Column>

              <Column flex={2}>Edit</Column>
              <Column flex={2}>Delete</Column>
            </TableHeader>

            {product.map((pro, idx) => (
              <TableRow key={idx}>
                <Column flex={1}>{idx + 1}</Column>
                <Column flex={2}>
                  <ProductImage src={`${UrlPath}/${pro.image}`} />
                </Column>
                <Column flex={2} bold>
                  {pro.name}
                </Column>
                <Column flex={2}>{pro.price}</Column>
                <Column flex={2}>{pro.description}</Column>
                <Column flex={2}>
                  <ModelView>
                    <EditHandler
                      datas={pro}
                      fetchData={fetchData}
                      editid={pro.pro_id}
                      EditText={"Product"}
                      url={"http://localhost:5000/product"}
                      Component={BodyHandler}
                    />
                  </ModelView>
                </Column>
                <Column flex={2}>
                  <DeleteComponentHandler
                    token={token}
                    url={"http://localhost:5000/product"}
                    deleteid={pro.pro_id}
                    onSucess={fetchData} // <-- refresh after delete
                  />
                </Column>
              </TableRow>
            ))}
          </OrderTable>
        ) : (
          <h3>No product found.</h3>
        )}
        <AddButton onClick={() => navigate("/admin/addproduct")}>
          ➕ Add Product
        </AddButton>
      </Wrapper>
    </Container>
  );
}
