import { createContext, useContext, useEffect, useReducer } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.1rem;
  border: 2px solid #d1d5db;
  border-radius: 9999px; /* Pill shape */
  background-color: #ffffff;
  gap: 0.5rem;
  width: fit-content;
  font-family: "Poppins", sans-serif;
  height: 1.9rem;

  width: 7rem;
  margin: 0 auto;

  div {
    /* Light indigo */

    font-size: 1.3rem;

    color: #1e3a8a; /* Dark indigo */
    cursor: pointer;
    transition: background 0.2s ease;
    &:first-child {
      border-right: 1px solid #d1d5db;
      padding: 0.05rem 0.8rem;
    }
    &:last-child {
      border-left: 1px solid #d1d5db;
      padding: 0.05rem 0.8rem;
    }

    &:hover {
      /* background-color: #c7d2fe; Lighter on hover */
    }

    &:active {
      transform: scale(0.95);
    }
  }

  span {
    font-size: 1.3rem;
    font-weight: 500;
    color: #111827; /* Dark gray */
    min-width: 32px;
    text-align: center;
  }
`;

const initialState = {
  value: 0,
};
export const ValueProvider = createContext({ initialState });

const QuantityHandler = ({ children }) => {
  const reducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
      case "inc":
        return {
          value: state.value + 1,
        };
      case "dec":
        if (state.value == 0) {
          return { ...state };
        }
        return { value: state.value - 1 };
    }
  };
  const Increment = () => {
    dispatch({ type: "inc" });
  };
  const Decrement = () => {
    dispatch({ type: "dec" });
  };
  const [{ value }, dispatch] = useReducer(reducer, initialState);

  return (
    <ValueProvider.Provider value={{ value, Increment, Decrement }}>
      {children}
    </ValueProvider.Provider>
  );
};
export const getValue = () => {
  const { value } = useContext(ValueProvider);
  // console.log(value);
  return value;
};

export function QuantityMaintainer() {
  const { value, Increment, Decrement } = useContext(ValueProvider);
  return (
    <StyledDiv>
      <div onClick={Increment}>+</div>
      <span>{value}</span>
      <div onClick={Decrement}>-</div>
    </StyledDiv>
  );
}
export default QuantityHandler;
