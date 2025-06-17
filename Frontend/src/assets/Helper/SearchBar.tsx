import React, { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const StyledSerachBar = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  top: 0.3rem;
  right: 3rem;
  width: 0.5rem;
  color: black;
  height: fit-content;
  @media (min-width: 480px) {
    /* position: absolute; */
    /* top: 5.8rem;
    left: 54.3rem; */
  }
  /* background-color: white; */
`;
const StyleSection = styled.section`
  text-align: center;
  display: flex;
  justify-content: center;
  padding-left: 1rem;
  width: 2rem;
  height: 2rem;
  margin-top: 1rem;
  @media (min-width: 480px) {
    grid-column: 1 / -1;
    top: 6rem;
    left: 40rem;
    margin-top: 0;
  }
`;
const SearchBar = styled.input`
  padding: 0.8rem 1.5rem;

  font-size: 1.2rem;
  font-weight: 100;

  border-radius: 5px;

  background-color: #f5f4f4;
  /* background-color: black; */
  /* position: absolute; */
  /* position: relative; */

  width: 15rem;
  /* left: 0; */
  height: 2.3rem;
  text-align: left;
  outline: none;
  border: none;
  border: 1px solid lightgreen;
  /* box-shadow: 2px 3px 3px #336833; */
  &:hover,
  &:active {
    outline: none;
    border: none;
  }
  color: #382b2b;
  &::placeholder {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 300;
    font-size: 1.2rem;
    color: #292525;
  }
  @media (min-width: 480px) {
    top: 5.5rem;
    left: 42rem;
  }
`;
export default function SearchBars() {
  const [value, setvalue] = useState("");
  const navigate = useNavigate();
  const HandleClick = () => {
    if (value === "" || undefined || null) {
      return navigate("/home");
    }
    navigate(`/product/recommend?item=${value}`);
  };
  return (
    <StyleSection>
      <SearchBar
        placeholder="Search item....."
        value={value}
        onChange={(e) => setvalue(e.target.value)}
      ></SearchBar>
      <StyledSerachBar onClick={HandleClick}>
        <HiOutlineMagnifyingGlass color="#507249" size={"1.6rem"} />
      </StyledSerachBar>
    </StyleSection>
  );
}
