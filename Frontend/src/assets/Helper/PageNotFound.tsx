import styled from "styled-components";
import React from "react";
import Image from "../Style/download.png";
import { Button } from "../Style/NavComponent";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  background-image: url("https://wallpapersok.com/images/hd/cartoon-astronaut-sitting-on-the-moon-6cort7m9ur7bapfr.jpg");
  background-size: contain;
  background-position: bottom 113px left;
  height: 6rem;
  width: 100%;
  font-size: 4rem;
  font-weight: bolder;
  margin: 0 auto;
  padding: 0;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-font-smoothing: antialiased;
  @media (min-width: 480px) {
    font-size: 7rem;
    height: 8rem;
  }
`;
const DIV = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  align-items: center;
  width: 100%;
  height: 100%;

  /* justify-content: center; */
`;
const StyledImage = styled.img`
  width: 9rem;
  margin: 0 0 auto 1rem;
  @media (min-width: 480px) {
    width: 19rem;
    height: 15rem;
    margin: auto 0rem auto 3.5rem;
  }
`;
const ButtonNavigate = styled(Button)`
  padding: 8px 15px;
`;
const H3 = styled.h3`
  width: 100%;
  margin: 1rem 0;
  padding: 0;
`;
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <DIV>
      <StyledImage src={Image} />
      <Div>404</Div>
      <H3>Sorry, the page you are looking for doesnot exists.</H3>
      <ButtonNavigate onClick={() => navigate("/home")}>
        Return Home
      </ButtonNavigate>
    </DIV>
  );
};
export default PageNotFound;
