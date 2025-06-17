import React, { useContext, useState } from "react";
import { WholeWidth } from "../Style/NavComponent";
import HeaderComponent from "./HeaderComponent";
import BodyCollection from "./AllBodyElement";
import { Toaster } from "react-hot-toast";
import UserDetails, { User } from "../Authentication";
import Footer from "./Footer";

const Apps = () => {
  //     const [Data,setData]=useState<string | null>();
  //     const GetData=async()=>{
  //     const FetchProduct=await fetch("http://localhost:5000").then((res)=>res.json());
  //     console.log(FetchProduct);
  // setData(FetchProduct);
  //     // console.log();
  // }
  //     GetData();
  // if(Data?.length==0){
  //     return<div>No data</div>
  // }
  return (
    <React.Fragment>
      <Toaster position="top-center" gutter={8} reverseOrder={false} />
      <WholeWidth>
        <HeaderComponent />
        <BodyCollection />

        {/* {Data.length==null?<h1>No data found</h1>:""} */}
      </WholeWidth>
    </React.Fragment>
  );
};
export default Apps;
