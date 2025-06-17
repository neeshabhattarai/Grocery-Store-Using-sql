import React, { useEffect } from "react";
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
} from "../Style/TableStyel";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useUrl from "../Helper/GeneralUrl";

import { DeleteComponentHandler } from "../Common/DeleteHandler";
import EditHandler from "../Common/EditHandler";
import { ModelView } from "../Common/ModelHandler";
import { AddButton, Button } from "../Style/NavComponent";
import CateGoryHandler from "../Common/CategoryEditHandler";
import useCategoryData from "./CategoryData";

export default function AllCategory() {
  const { data, loading, fetchData } = useCategoryList({
    url: "http://localhost:5000/category/list",
    method: "GET",
    headers: {
      "content-Type": "application/json",
    },
  });
  const category = data?.message;
  const navigate = useNavigate();

  if (loading) {
    return <h2>...loading</h2>;
  }

  return (
    <Container>
      <Wrapper>
        <Header>Your Category List</Header>

        {category && category.length > 0 ? (
          <OrderTable>
            <TableHeader>
              <Column flex={1}>S.N</Column>
              <Column flex={2}>Name</Column>
              <Column flex={2}>Edit</Column>
              <Column flex={2}>Delete</Column>
            </TableHeader>

            {category.map((cat, idx) => (
              <TableRow key={idx}>
                <Column flex={1}>{idx + 1}</Column>
                <Column flex={2} bold>
                  {cat.name}
                </Column>
                <Column flex={2}>
                  <ModelView>
                    <EditHandler
                      datas={cat}
                      url={"http://localhost:5000/category"}
                      fetchData={fetchData}
                      editid={cat.cat_id}
                      EditText={"Category"}
                      Component={CateGoryHandler}
                    />
                  </ModelView>
                </Column>
                <Column flex={2}>
                  <DeleteComponentHandler
                    url={"http://localhost:5000/category"}
                    deleteid={cat.cat_id}
                    onSucess={fetchData} // <-- refresh after delete
                  />
                </Column>
              </TableRow>
            ))}
          </OrderTable>
        ) : (
          <h3>No categories found.</h3>
        )}
        <AddButton onClick={() => navigate("/admin/addcategory")}>
          ➕ Add Category
        </AddButton>
      </Wrapper>
    </Container>
  );
}
