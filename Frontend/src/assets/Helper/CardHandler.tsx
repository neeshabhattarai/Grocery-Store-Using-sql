import { useContext, useEffect } from "react";
import { getValue, ValueProvider } from "./Drawer/IncrementHandler";
import { CardButton } from "./ProductCard";
import useUrl from "./GeneralUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserDetails, { User } from "../Authentication";

const CardHandler = ({ id, rating }) => {
  const navigate = useNavigate();
  const { setResponse, data, error } = useUrl();
  const { value } = useContext(ValueProvider);
  const { token } = useContext(UserDetails);
  // console.log(value);
  const HandleSubmit = async () => {
    if (!token) {
      return navigate("/login");
    }
    console.log(id, value);
    await setResponse({
      url: "http://localhost:5000/cart",
      method: "POST",
      body: JSON.stringify({
        proId: id,
        quantity: Number(value),
        rating: rating,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };

  useEffect(() => {
    if (data) {
      toast.success(data.message);
      navigate("/cart");
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [error]);

  return <CardButton onClick={HandleSubmit}>Add to cart</CardButton>;
};
export default CardHandler;
