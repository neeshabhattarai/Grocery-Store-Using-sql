import React, { useContext, useEffect } from "react";

import useUrl from "../Helper/GeneralUrl";
import toast from "react-hot-toast";
import { ModelHander, ModelView } from "./ModelHandler";
import { Button } from "../Style/NavComponent";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import UserDetails from "../Authentication";
export const DeleteComponentHandler = ({
  deleteid,
  onSucess,
  url,
}: {
  deleteid: number;
  onSucess: {};

  url: string;
  headers?: {};
}) => {
  const { setResponse, data, error } = useUrl();
  const Path = `${url}/${deleteid}`;
  const { closeView } = useContext(ModelHander);
  const { token } = useContext(UserDetails);

  const handledelete = async () => {
    await setResponse({
      url: `${Path}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Add your actual logout logic here
  };
  useEffect(() => {
    if (data) {
      toast.success(data.message);
      onSucess();
    }
    if (error) {
      toast.error(data.message);
    }
  }, [data, error]);
  //   console.log(deleteid);
  return (
    <ModelView>
      <ModelView.header Text={<HiArchiveBoxXMark size={"1.5rem"} />} />
      <ModelView.body>
        <h2>Are you sure want to delete</h2>
        <Button
          variant={"primary"}
          onClick={() => {
            closeView();
            handledelete();
          }}
        >
          Delete
        </Button>
      </ModelView.body>
    </ModelView>
  );
};
