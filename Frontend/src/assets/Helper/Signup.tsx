import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import useUrl from "./GeneralUrl";
import { useNavigate } from "react-router-dom";
import { ErrorText, Select } from "../Style/FormStyle";
import { BodyContainer } from "../Style/NavComponent";
import UserDetails from "../Authentication";
import imagePath from "../../../../../../Downloads/signupimage.jpeg";
import {
  Div,
  Input,
  ImageHandler,
  StaticShape,
  StyledForm,
  StyledText,
  Button,
} from "./Login";
const StyledTexts = styled(StyledText)`
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: linear-gradient(to bottom left, red, purple, green);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0;
  }
`;
const EditInput = styled(Input)`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  &:active,
  &:hover {
    outline-style: groove;
    outline-width: 2px;
    outline-color: #2a2ab135;
  }

  @media (min-width: 480px) {
    margin: ${({ file }) => (file != "file" ? "1.5rem 0 1.5rem 0" : "")};
    width: 95%;
  }
`;
const ImageHandlers = styled(ImageHandler)`
  width: 14rem;
  height: 27rem;
  border-radius: 1rem;
  @media (min-width: 480px) {
    margin-right: 1rem;
    width: 26rem;
    height: 29rem;
  }
`;
const BodyContains = styled(BodyContainer)`
  background-color: #9d9dff8f;
  height: 90vh;
  width: 100vw;
  padding: 3rem 0;
`;
const Selects = styled.select`
  padding: 0.8rem;
  width: 90%;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  display: block;
  @media (min-width: 480px) {
    min-width: 95%;
  }
`;
const EditButton = styled(Button)`
  text-align: center;
  display: block;
  //margin-top: 0.5rem;
  padding: 0.5rem 0.9rem;
  margin: 0 auto 1rem auto;
  width: 50%;
`;
export interface FormValues {
  name: string;
  email: string;
  password: string;
  contact: string;
  image: FileList;
  role: string;
}

// Styled Components (unchanged)

const FormHandler = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const { data, error, loading, setResponse, cancelError } = useUrl();
  const { Login } = useContext(UserDetails);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, email, password, contact, image, role } = data;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("contact", contact);
    formData.append("image", image[0]);
    formData.append("role", role);

    await setResponse({
      url: "http://localhost:5000/user/signup",
      method: "POST",
      body: formData,
    });
  };

  useEffect(() => {
    if (data) {
      toast.success(data.message);
      // Login(data.token, data.userid);
      navigate("/login");
    }
    if (error) {
      toast.error(`Error: ${error}`);
      cancelError();
      navigate("/signup");
    }
  }, [data, error]);

  return (
    <BodyContains>
      <StaticShape shape="circle" top="10%" left="5%" size="60px" />
      <StaticShape shape="square" top="25%" left="85%" size="50px" />
      <StaticShape shape="circle" top="70%" left="15%" size="70px" />
      <StaticShape shape="square" top="75%" left="70%" size="40px" />
      <StaticShape shape="circle" top="40%" left="45%" size="50px" />
      <Div>
        <StyledForm
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <StyledTexts>Create Account</StyledTexts>
          <EditInput
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Must be greater than 3 characters",
              },
            })}
          />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

          <EditInput
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email must start with a letter and be valid",
              },
            })}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <EditInput
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Must be greater than 5 characters",
              },
            })}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          <EditInput
            type="text"
            placeholder="Contact"
            {...register("contact", {
              required: "Contact is required",
              pattern: {
                value: /^(98|97)\d{8}$/,
                message:
                  "Contact must start with 98 or 97 and be exactly 10 digits",
              },
            })}
          />
          {errors.contact && <ErrorText>{errors.contact.message}</ErrorText>}
          <Selects
            defaultValue={"user"}
            {...register("role", {
              required: "role is required",
            })}
          >
            <option value={"admin"}>Admin</option>
            <option value={"user"}>User</option>
          </Selects>

          <EditInput
            file={"file"}
            type="file"
            accept="image/*"
            placeholder="choose a profile picture"
            {...register("image", {
              required: "Image is required",
            })}
          />
          {errors.image && <ErrorText>{errors.image.message}</ErrorText>}

          <EditButton type="submit">
            {loading ? "Submitting..." : "Submit"}
          </EditButton>
        </StyledForm>
        <ImageHandlers src={imagePath} alt="Login Illustration" />
      </Div>
    </BodyContains>
  );
};

export default FormHandler;
