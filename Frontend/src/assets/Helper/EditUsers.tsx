import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ErrorText,
  Input,
  Select,
  StyledForm,
  Button,
  SettingStyledForm,
  SettingSelect,
} from "../Style/FormStyle"; // Ensure Button is also styled
import { FormValues } from "../Admin/ProductForm";
import UserDetails from "../Authentication";

function EditUsers({ datas, handleSave, Label, Wrapper }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { token } = useContext(UserDetails);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, email, contact, image, role } = data;

    const body = new FormData();
    body.append("name", name);
    body.append("email", email);
    body.append("role", role);
    body.append("contact", contact);
    if (image?.[0]) {
      body.append("image", image[0]);
    }

    handleSave({
      body,
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <SettingStyledForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <Label>Name</Label>
        <Input
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
      </Wrapper>

      <Wrapper>
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Email"
          defaultValue={datas.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email must be valid",
            },
          })}
        />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      </Wrapper>

      <Wrapper>
        <Label>Contact</Label>
        <Input
          type="text"
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
      </Wrapper>

      <Wrapper>
        <Label>Role</Label>
        <SettingSelect defaultValue={datas.role} {...register("role")}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </SettingSelect>
      </Wrapper>

      <Wrapper>
        <Label>Profile Picture</Label>
        <Input type="file" accept="image/*" {...register("image")} />
        {errors.image && <ErrorText>{errors.image.message}</ErrorText>}
      </Wrapper>

      <Button type="submit">Update</Button>
    </SettingStyledForm>
  );
}

export default EditUsers;
