import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import imagePath from "../../../../../../Downloads/signupimage.jpeg";
import styled, { keyframes } from "styled-components";
import useUrl from "./GeneralUrl";
import { useNavigate } from "react-router-dom";
import { ErrorText } from "../Style/FormStyle";
import UserDetails from "../Authentication";

interface FormValues {
  email: string;
  password: string;
}

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const BodyContainer = styled.div`
  background: linear-gradient(270deg, #dff5e1, #c0e6c3, #dff5e1);
  background-size: 600% 600%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 4rem 0;
  width: 100vw;
  height: 90vh;
  overflow: hidden;
  @media (min-width: 480px) {
    padding: 3.5rem;
  }
`;

export const StyledForm = styled.form`
  width: 30rem;
  padding: 1rem 1rem;
  text-align: left;
  @media (min-width: 480px) {
    padding: 0 3rem;
  }
`;

export const Input = styled.input`
  padding: 0.8rem;
  width: 90%;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  display: block;
  &:active,
  &:hover {
    outline-style: groove;
    outline-width: 2px;
    outline-color: #2a2ab135;
  }
`;

export const Div = styled.div`
  padding: 8px;
  display: flex;

  width: 100%;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  @media (min-width: 480px) {
    width: 55%;
    margin: 0 auto;

    background-color: #e0dbdb80;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledText = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 550;
  @media (min-width: 480px) {
    font-size: 2.2rem;
  }
`;

const StyledP = styled.p`
  font-size: 0.8rem;
  margin-bottom: 1.8rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1.4rem;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
  @media (min-width: 480px) {
    padding: 0.6rem 1.5rem;
    margin: 1rem 0 0.1rem 0;
  }
`;
export const ImageHandler = styled.img`
  width: 13rem;
  height: 22rem;
  border-radius: 1rem;
  @media (min-width: 480px) {
    width: 26rem;
    height: 29rem;
  }
`;

export const StaticShape = styled.div<{
  shape?: "circle" | "square";
  top: string;
  left: string;
  size: string;
}>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: rgba(0, 128, 0, 0.15);
  border-radius: ${(props) => (props.shape === "circle" ? "50%" : "0%")};
  z-index: 0;
`;

const LoginHandler = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [Pending, setPending] = useState(false);
  const navigate = useNavigate();
  const { data: urlData, error, loading, setResponse, cancelError } = useUrl();
  const { Login } = useContext(UserDetails);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setPending(true);
    const { email, password } = data;

    await setResponse({
      url: "http://localhost:5000/user/login",
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setPending(false);
  };

  useEffect(() => {
    if (!Pending && urlData) {
      toast.success(urlData.message);
      const { token, userid } = urlData;
      Login(token, userid);
      navigate("/home");
    }
    if (!Pending && error) {
      toast.error(`Error: ${error.message}`);
      cancelError();
    }
  }, [urlData, error, Pending]);

  return (
    <BodyContainer>
      <StaticShape shape="circle" top="10%" left="5%" size="60px" />
      <StaticShape shape="square" top="25%" left="85%" size="50px" />
      <StaticShape shape="circle" top="70%" left="15%" size="70px" />
      <StaticShape shape="square" top="75%" left="70%" size="40px" />
      <StaticShape shape="circle" top="40%" left="45%" size="50px" />

      <Div>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledText>Welcome Back</StyledText>
          <StyledP>Hey, welcome back to your special place</StyledP>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email cant be null" })}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password cant be null" })}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          <Button type="submit">{loading ? "loading..." : "Login"}</Button>
          <p style={{ fontSize: "14px" }}>
            Don't have account?
            <button
              style={{ padding: "0.3rem 0.4rem", backgroundColor: "#e0dbdb80" }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </p>
        </StyledForm>
        <ImageHandler src={imagePath} alt="Login Illustration" />
      </Div>
    </BodyContainer>
  );
};

export default LoginHandler;
