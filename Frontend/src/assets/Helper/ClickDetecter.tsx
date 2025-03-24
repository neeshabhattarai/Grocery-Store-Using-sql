import {  RefObject, useEffect } from "react";

const useMouseListener=(ref:RefObject<HTMLInputElement | null>,close:()=>void)=>{
    const HandleEvent=(e:MouseEvent)=>{
        if(ref.current && !ref.current.contains(e.target as Node)){
            close();
        }
    }
useEffect(()=>{
    document.addEventListener('click',(e)=>HandleEvent(e));
})
}
export default useMouseListener;