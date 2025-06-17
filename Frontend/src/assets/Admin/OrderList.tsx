import { useContext, useEffect, useState } from "react";
import useCategoryList from "./RawCategory";
import UserDetails from "../Authentication";
import { ClearButton } from "../Style/TableStyel";
import toast from "react-hot-toast";
import useUrl from "../Helper/GeneralUrl";

export default function useOrderList() {
  const { token } = useContext(UserDetails);
  const [totalOrder, setTotalOrder] = useState(0);

  const { data, loading } = useCategoryList({
    url: "http://localhost:5000/order/list",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (data && Array.isArray(data.message)) {
      let total = 0;
      console.log("Total" + data.message);
      data.message.forEach((order) => {
        total += 1;
      });

      setTotalOrder(total);
    }
  }, [data]);

  return { data, totalOrder, loading };
}
export const useTotalOrder = () => {
  const { token } = useContext(UserDetails);
  const [list, setList] = useState(null);

  const { data, loading } = useCategoryList({
    url: "http://localhost:5000/order/list",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    if (data) {
      console.log(data);
      setList(data.message);
    }
  }, [data]);
  console.log("Order Render");
  return { list, loading };
};
export const DeleteOrder = ({ ClearItem }) => {
  const { token } = useContext(UserDetails);
  const { setResponse, data, error } = useUrl();
  const handleClear = () => {
    setResponse({
      url: "http://localhost:5000/order/all",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      order,
    });
    ClearItem([]);
  };
  useEffect(() => {
    if (data) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(data.message);
    }
  }, [data, error]);
  return <ClearButton onClick={handleClear}>Clear</ClearButton>;
};
