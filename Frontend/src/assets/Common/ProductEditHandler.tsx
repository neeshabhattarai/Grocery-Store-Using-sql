import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorText, Input, Select } from "../Style/FormStyle";
import { Button } from "../Style/NavComponent";
import useCategory from "../Admin/CategorywithProducts";
import { FormValues } from "../Admin/ProductForm";
import { ModelHander, ModelView } from "./ModelHandler";
import UserDetails from "../Authentication";

function BodyHandler({ datas, handleSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(datas);
  const { closeView } = useContext(ModelHander);
  const { token } = useContext(UserDetails);
  const { category, loading: isPending } = useCategory();
  if (category) {
    console.log(category);
    console.log(category[datas.categoryCatId]);
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { image } = data;

    console.log(data.name);
    let body = new FormData();
    body.append("name", data.name);
    body.append("price", data.price);
    body.append("categoryCatId", data.categoryCatId);
    if (image) {
      body.append("image", data.image[0]);
    }
    body.append("description", data.description);

    handleSave({
      body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    closeView();
  };
  return (
    <div>
      <Input
        type="text"
        placeholder="Product Name"
        width={"95%"}
        defaultValue={datas.name}
        {...register("name", {
          required: "Product name is required",
          minLength: { value: 3, message: "Must be at least 3 characters" },
        })}
      />
      {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
      <Input
        type="text"
        placeholder="Description"
        width={"95%"}
        defaultValue={datas.description}
        {...register("description", {
          required: "Description is required",
        })}
      />
      {errors.name && <ErrorText>{errors.description?.message}</ErrorText>}
      <Input
        type="text"
        placeholder="Price"
        width={"95%"}
        defaultValue={datas.price}
        {...register("price", {
          required: "Price is required",
          valueAsNumber: true,
          min: { value: 0.01, message: "Price must be greater than 0" },
        })}
      />
      {errors.price && <ErrorText>{errors.price.message}</ErrorText>}

      {errors.details && <ErrorText>{errors.details.message}</ErrorText>}
      {category && (
        <Select
          defaultValue={category[datas.categoryCatId]}
          {...register("categoryCatId", {
            required: true,
          })}
        >
          {category.map((val) => {
            return <option value={val.cat_id}>{val.name}</option>;
          })}
        </Select>
      )}
      {errors.categoryCatId && (
        <ErrorText>{errors.categoryCatId.message}</ErrorText>
      )}
      <Input type="file" accept="image/*" {...register("image")} />
      <div style={{ marginTop: "1.5rem" }}>
        <button
          style={{ backgroundColor: "lavender" }}
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}

export default BodyHandler;
