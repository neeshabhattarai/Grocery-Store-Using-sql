import React, { useEffect } from "react";
import useCategoryList from "./RawCategory";
import {
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import useUrl from "../Helper/GeneralUrl";

import { DeleteComponentHandler } from "../Common/DeleteHandler";
import EditHandler from "../Common/EditHandler";
import { ModelView } from "../Common/ModelHandler";
import { AddButton } from "../Style/NavComponent";
import CateGoryHandler from "../Common/CategoryEditHandler";
import { UrlPath } from "../Common/Path";
import EditUser from "../Common/EditUser";
import useAllUser from "./useAllUser";

export default function AllUser() {
  const { data, loading, fetchData } = useAllUser();
  const users = data?.message;
  console.log(users);
  const navigate = useNavigate();

  if (loading) {
    return <h2>...loading</h2>;
  }

  return (
    <Container>
      <Wrapper>
        <Header>User List</Header>

        {users && users.length > 0 ? (
          <OrderTable>
            <TableHeader>
              <Column flex={1}>S.N</Column>
              <Column flex={2}>Image</Column>
              <Column flex={2}>Name</Column>
              <Column flex={2}>Role</Column>

              <Column flex={2}>Email</Column>
              <Column flex={2}>Contact</Column>
              <Column flex={2}>Edit</Column>
              <Column flex={2}>Delete</Column>
            </TableHeader>

            {users.map((user, idx) => (
              <TableRow key={idx}>
                <Column flex={1}>{idx + 1}</Column>
                <Column flex={2} bold>
                  <ProductImage src={`${UrlPath}/${user.image}`} />
                </Column>
                <Column flex={2} bold>
                  {user.name}
                </Column>
                <Column flex={2} bold>
                  {user.role}
                </Column>
                <Column flex={2} bold>
                  {user.email}
                </Column>
                <Column flex={2}>{user.contact}</Column>
                <Column flex={2}>
                  <ModelView>
                    <EditHandler
                      datas={user}
                      url={"http://localhost:5000/user"}
                      fetchData={fetchData}
                      editid={user.userid}
                      EditText={"User"}
                      Component={EditUser}
                    />
                  </ModelView>
                </Column>
                <Column flex={2}>
                  <ModelView>
                    <DeleteComponentHandler
                      url={"http://localhost:5000/user/delete"}
                      deleteid={user.userid}
                      onSucess={fetchData}
                    />
                  </ModelView>
                </Column>
              </TableRow>
            ))}
          </OrderTable>
        ) : (
          <h3>No categories found.</h3>
        )}
        <AddButton onClick={() => navigate("/signup")}>➕ Add User</AddButton>
      </Wrapper>
    </Container>
  );
}
