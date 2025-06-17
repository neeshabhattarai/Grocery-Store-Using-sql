import { useContext, useEffect } from "react";
import useUrl from "./GeneralUrl";
import UserDetails from "../Authentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "../Style/NavComponent";

const GetOrder = ({ orderData }) => {
  console.log(orderData);
  const { token } = useContext(UserDetails);
  const { setResponse, data, error } = useUrl();
  const navigate = useNavigate();

  const HandleClick = async () => {
    await setResponse({
      url: "http://localhost:5000/order",
      method: "POST",
      body: JSON.stringify(orderData.message),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };
  useEffect(() => {
    if (data) {
      toast.success(data.message);
      navigate("/order");
    }
  }, [data]);

  return <Button onClick={HandleClick}>Order now!</Button>;
};

export default GetOrder;
