import React, { useContext, useEffect } from "react";
import { AddButton, Button } from "../Style/NavComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useUrl from "../Helper/GeneralUrl";
import { ErrorText, Input, Select, StyledForm } from "../Style/FormStyle";
import UserDetails from "../Authentication";
import toast from "react-hot-toast";
import useCategory from "./CategorywithProducts";
import useCategoryData from "./CategoryData";
export interface FormValues {
  name: string;
  price: string;
  description: string;
  categoryCatId: string;
  image: FileList;
  contact: string;
  email: string;
  role: string;
}

export default function AdminProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { data, error, loading, setResponse, cancelError } = useUrl();
  const { category, loading: isPending } = useCategory();
  const { token } = useContext(UserDetails);

  console.log(category);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // const { name, categoryCatId, details, price, image } = data;
    // console.log(data.image[0]);
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("categoryCatId", data.categoryCatId);
    formData.append("description", data.description);

    formData.append("image", data.image[0]);

    await setResponse({
      url: "http://localhost:5000/product",
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => console.log(err));
  };

  useEffect(() => {
    if (data) {
      toast.success(data.message);
      navigate("/admin/product");

      // Login(data.token, data.userid);
      // navigate("/login");
    }
    if (error) {
      toast.error(`Error: ${error}`);
      cancelError();
      // navigate("/signup");
    }
  }, [data, error]);
  // console.log(category);
  if (loading) {
    return <p>....loading</p>;
  }

  return (
    // <h1>Hello</h1>
    <React.Fragment>
      {category && category.length > 0 ? (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Product Name"
            {...register("name", {
              required: "Product name is required",
              minLength: { value: 3, message: "Must be at least 3 characters" },
            })}
          />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          <Input
            type="text"
            placeholder="Price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 0.01, message: "Price must be greater than 0" },
            })}
          />
          {errors.price && <ErrorText>{errors.price.message}</ErrorText>}
          <Input
            type="text"
            placeholder="Description"
            {...register("description", {
              required: "please add description",
            })}
          />
          {errors.price && <ErrorText>{errors.description?.message}</ErrorText>}

          {category && (
            <Select
              defaultValue={category ? category[0].cat_id : ""}
              {...register("categoryCatId", {
                required: true,
              })}
            >
              {category
                ? category.map((val) => {
                    return <option value={val.cat_id}>{val.name}</option>;
                  })
                : ""}
            </Select>
          )}
          {errors.categoryCatId && (
            <ErrorText>{errors.categoryCatId.message}</ErrorText>
          )}
          <Input
            type="file"
            accept="image/*"
            {...register("image", {
              required: "Product image is required",
            })}
          />
          {errors.image && <ErrorText>{errors.image.message}</ErrorText>}
          <Button type="submit">{loading ? "Submitting..." : "Submit"}</Button>
        </StyledForm>
      ) : (
        <div>
          <h3>Please add category first</h3>

          <Button
            onClick={() => navigate("/admin/addcategory")}
            style={{ backgroundColor: "var(--Icon)" }}
          >
            ➕ Add Category
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}
