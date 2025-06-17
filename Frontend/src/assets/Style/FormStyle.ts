import styled from "styled-components";

export const StyledForm = styled.form`
  width: 97%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;

  @media (min-width: 480px) {
    padding-top: 3rem;
    margin: 0 auto;
    width: 40%;
  }
`;
export const SettingStyledForm=styled(StyledForm)`
width: 80%;
padding-top: 1rem;
`;

export const Input = styled.input`
  display: block;
  width: ${(props=>props.width?props.width:"100%")};
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 2rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
`;
export const Select = styled.select` 
  display: block;
  width: 100%;
  
  padding: 0.7rem 1rem;
  margin-top: 1.7rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  /* Fix default styling differences */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
`;

export const SettingSelect=styled(Select)`
width: 100%;
`;
export const ErrorText = styled.p`
  color: red;
  font-size: 0.85rem;
  margin: 0.25rem 0 0;
`;

export const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem;
  width: 100%;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;