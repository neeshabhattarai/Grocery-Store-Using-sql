import { useState } from "react";
import {  WholeWidth } from "../Style/NavComponent";
import HeaderComponent from "./HeaderComponent";
import BodyComponent from "./BodyComponent";

const Apps=()=>{
    const [Data,setData]=useState<string | null>();
    const GetData=async()=>{
    const FetchProduct=await fetch("http://localhost:5000").then((res)=>res.json());
    console.log(FetchProduct);
setData(FetchProduct);
    // console.log();
}
    GetData();
if(Data?.length==0){
    return<div>No data</div>
}
    return(<WholeWidth>
    <HeaderComponent/>
    <BodyComponent/>
    
    
    {/* {Data.length==null?<h1>No data found</h1>:""} */}
    </WholeWidth>)
}
export default Apps;