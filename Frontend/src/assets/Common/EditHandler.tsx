import React, { useCallback, useContext, useEffect, useState } from "react";
import { ModelHander, ModelView } from "./ModelHandler";
import { Input } from "../Style/FormStyle";
import { Button } from "../Style/NavComponent";
import useUrl from "../Helper/GeneralUrl";
import { useNavigate } from "react-router-dom";
import useCategoryList from "../Admin/RawCategory";
import toast from "react-hot-toast";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function EditHandler({
  datas,
  fetchData,
  url,
  editid,
  EditText,
  Component,
}) {
  // console.log(datas);

  const [newName, setNewName] = useState(datas?.name || "");
  const { setResponse, data, error, loading } = useUrl();

  const handleInputChange = useCallback((e) => {
    setNewName(e.target.value);
  }, []);

  const handleSave = async ({ headers, body }: { headers?: {}; body: {} }) => {
    // console.log(props);
    console.log("handle save");

    await setResponse({
      url: `${url}/${editid}`,
      method: "PATCH",
      body: body,
      headers,
    });
  };
  useEffect(() => {
    if (data) {
      toast.success(data.message);
      fetchData();
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      toast.error(data.message);
    }
  }, [error]);

  return (
    <div>
      <ModelView>
        <ModelView.header Text={<HiOutlinePencilSquare size={"1.5rem"} />} />
        <ModelView.body handleSave={handleSave} Text={"Update"}>
          <h3>Edit {EditText}</h3>
          <Component datas={datas} handleSave={handleSave} />
        </ModelView.body>
      </ModelView>
    </div>
  );
}
