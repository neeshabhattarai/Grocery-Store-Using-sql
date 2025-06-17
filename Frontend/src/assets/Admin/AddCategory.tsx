import React, { useContext, useEffect } from "react";
import { ErrorText, Input, StyledForm } from "../Style/FormStyle";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useUrl from "../Helper/GeneralUrl";
import UserDetails from "../Authentication";
import toast from "react-hot-toast";
import { Button } from "../Style/NavComponent";
interface FormValues {
  name: string;
}
export default function AddCategory({ Category = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const { data, error, loading, setResponse, cancelError } = useUrl();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name } = data;

    await setResponse({
      url: "http://localhost:5000/category",
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "content-Type": "application/json",
      },
    });
  };
  useEffect(() => {
    if (data) {
      toast.success(data.message);
      navigate("/admin/category");
    } else if (error) {
      toast.error(data.message);
    }
  }, [data, error]);
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Input
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
      <Button type="submit">{loading ? "Submitting..." : "Submit"}</Button>
    </StyledForm>
  );
}
