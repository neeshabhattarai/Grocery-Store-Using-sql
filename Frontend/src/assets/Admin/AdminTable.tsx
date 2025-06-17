import React from "react";
import { HiOutlineShoppingBag, HiOutlineUserGroup } from "react-icons/hi";
import styled from "styled-components";
import useOrderList from "./OrderList";
import useProductList from "./useProductList";
import { PiCake, PiCakeThin } from "react-icons/pi";
import useAllUser from "./useAllUser";
import useCategory from "./CategorywithProducts";
import CategoryPieChartMaker from "./CategoryPieChartMaker";
import MonthlyOrderBarChart from "./BarChart";
const DIV = styled.div`
  display: flex;
  gap: 3rem;
`;
const Div = styled.div`
  width: 100%;
  height: fit-content;

  margin-left: 10px;
`;
const Card = styled.div`
  background-color: #ebd9d9aa;
  height: 130px;
  width: 300px;
  border-radius: 1rem;
  display: flex;
  padding-right: 5px;
  justify-content: space-between;
  top: 20px;
`;
const Box = styled.div`
  justify-self: flex-end;
  height: 40%;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  margin-top: 15px;
  border-radius: 0.5rem;
`;
const TextDiv = styled.div`
  margin-left: 10px;
  width: 60%;
  height: 100%;
`;
const Text = styled.h3`
  color: #325425;
  width: fit-content;
`;
const H2 = styled.h2`
  text-align: left;
`;

export default function AdminTable() {
  const { totalOrder, data: OrderData } = useOrderList();
  const { data } = useProductList();
  const { data: User } = useAllUser();
  console.log(OrderData);

  return (
    <Div>
      <H2>Dashboard</H2>
      <div style={{ display: "flex", gap: "8rem" }}>
        <Card>
          <TextDiv>
            <Text>Total Orders</Text>
            <h2>{totalOrder}</h2>
          </TextDiv>
          <Box color="lightgreen">
            <HiOutlineShoppingBag color="black" size={"2rem"} />
          </Box>
        </Card>
        <Card>
          <TextDiv>
            <Text>Total Products</Text>
            <h2>{data?.message.length}</h2>
          </TextDiv>
          <Box color="lightyellow">
            <PiCake color="purple" size={"2rem"} />
          </Box>
        </Card>
        <Card>
          <TextDiv>
            <Text>Total Users</Text>
            <h2>{User?.message.length}</h2>
          </TextDiv>
          <Box color="white">
            <HiOutlineUserGroup color="blue" size={"2rem"} />
          </Box>
        </Card>
      </div>
      <DIV>
        <div style={{ width: "40%" }}>
          <H2> Total Category</H2>
          <CategoryPieChartMaker />
        </div>
        <div style={{ width: "50%" }}>
          <H2> Total Sales</H2>
          <MonthlyOrderBarChart />
        </div>
      </DIV>
    </Div>
  );
}
