import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorText, Input, Select } from "../Style/FormStyle";
import { Button } from "../Style/NavComponent";
import useCategory from "../Admin/CategorywithProducts";
import { FormValues } from "../Admin/ProductForm";
import { ModelHander, ModelView } from "./ModelHandler";
import { useNavigate } from "react-router-dom";
import useCategoryList from "../Admin/RawCategory";
import UserDetails from "../Authentication";

function EditUser({ datas, handleSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { token } = useContext(UserDetails);
  console.log(datas);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, email, contact, image, role } = data;

    console.log(data);
    const body = new FormData();
    body.append("name", name);
    body.append("email", email);
    body.append("role", role);
    body.append("contact", contact);
    body.append("image", image[0]);

    handleSave({
      body,
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div>
      <Input
        width={"95%"}
        type="text"
        placeholder="Name"
        defaultValue={datas.name}
        {...register("name", {
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Must be greater than 3 characters",
          },
        })}
      />
      {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

      <Input
        type="email"
        width={"95%"}
        placeholder="Email"
        defaultValue={datas.email}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Email must start with a letter and be valid",
          },
        })}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <Input
        type="text"
        width={"95%"}
        placeholder="Contact"
        defaultValue={datas.contact}
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
      <Select name="role" defaultValue={datas.role} {...register("role")}>
        <option value={"admin"}>Admin</option>
        <option value={"user"}>User</option>
      </Select>

      <Input
        type="file"
        accept="image/*"
        placeholder="choose a profile picture"
        {...register("image")}
      />
      {errors.image && <ErrorText>{errors.image.message}</ErrorText>}
      <button onClick={handleSubmit(onSubmit)}>Update</button>
    </div>
  );
}

export default EditUser;
