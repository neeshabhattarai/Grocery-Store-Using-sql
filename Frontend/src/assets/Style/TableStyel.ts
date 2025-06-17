import styled from "styled-components";

export const Container = styled.div`
 
  width: 100%;
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  @media (min-width: 480px) {
     padding: 2rem;
  }
`;

export const Wrapper = styled.div`
width: 100%;
   @media (min-width: 480px) {
    width: 90%;
  }
`;

export const Header = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #2e7d32;
`;

export const OrderTable = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #e3fce3;
  padding: 2rem;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.div`
  display: flex;
  font-weight: bold;
  border-bottom: 2px solid #aaa;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  color: #2e7d32;
  gap: 1rem;
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const Column = styled.div`
  flex: ${(props) => props.flex || 1};
  padding: 0.25rem 0;
  font-size: ${(props) => (props.bold ? "1.05rem" : "1rem")};
  font-weight: ${(props) => (props.bold ? "600" : "normal")};
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

export const TotalPrice = styled.p`
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 2rem;
  color: #2e7d32;
`;

export const ClearButton = styled.button`
  background-color: #c62828;
  color: #fff;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  float: right;

  &:hover {
    background-color: #b71c1c;
  }
`;
