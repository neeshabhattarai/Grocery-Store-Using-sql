import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorText, Input, Select } from "../Style/FormStyle";
import { Button } from "../Style/NavComponent";
import useCategory from "../Admin/CategorywithProducts";
import { FormValues } from "../Admin/ProductForm";
import { ModelHander, ModelView } from "./ModelHandler";
import UserDetails from "../Authentication";

function CateGoryHandler({ datas, handleSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(datas);
  const { closeView } = useContext(ModelHander);
  const { token } = useContext(UserDetails);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name } = data;

    console.log(data.name);
    let body = JSON.stringify({
      name: name,
    });
    const headers = {
      "content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    };

    handleSave({ headers, body });
    closeView();
  };
  return (
    <div>
      <Input
        width={"95%"}
        type="text"
        placeholder="Product Name"
        defaultValue={datas.name}
        {...register("name", {
          required: "Product name is required",
          minLength: { value: 3, message: "Must be at least 3 characters" },
        })}
      />
      {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
      <button onClick={handleSubmit(onSubmit)}>Update</button>
    </div>
  );
}

export default CateGoryHandler;
