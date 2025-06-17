import React, { useContext } from "react";
import EditHandler from "./EditHandler";
import EditUser from "./EditUser";
import UserDetails from "../Authentication";
import { UrlPath } from "./Path";
import Images from "../Style/CircularImage";
import styled from "styled-components";
import SideBar from "../Helper/SideBar";

// Styled image
export const Image = styled(Images)`
  width: 148px;
  height: 142px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 1px solid black;
`;

// Full-width container
const AccountContainer = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  border-radius: 12px;
  padding: 2rem;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Center content within full-width layout
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Styled headings
const Name = styled.h2`
  margin: 0.5rem 0;
  font-size: 1.5rem;
  color: #333;
`;

const Info = styled.h3`
  margin: 0.3rem 0;
  font-weight: 400;
  color: #555;
`;

export default function Account() {
  const { User } = useContext(UserDetails);
  console.log(User);

  return (
    <>
      {User ? (
        <SideBar />
      ) : (
        // <AccountContainer>
        //   <Content>
        //     <Image src={`${UrlPath}/${User[0].image}`} alt="User Profile" />
        //     <Name>Name: {User[0].name}</Name>
        //     <Info>Email: {User[0].email}</Info>
        //     <Info>Contact: {User[0].contact}</Info>
        //   </Content>
        // </AccountContainer>
        ""
      )}
    </>
  );
}
