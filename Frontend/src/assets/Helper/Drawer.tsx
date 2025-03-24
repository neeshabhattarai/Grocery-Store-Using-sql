import {  PropsWithChildren, useRef } from "react";
import styled from "styled-components";

import useMouseListener from "./ClickDetecter";

type Container={

    children:PropsWithChildren<React.ReactNode>,open:boolean,close:()=>void
}
const DrawerStyle=styled.div<{open:boolean}>`
display: flex;
/* margin:${({open})=>!open?"5px 10px 5px 0px":""}; */
justify-content:flex-start;
gap: 1.5rem;
flex-direction: column;
position: fixed;
top: 0;
left: 0;
width: ${({open})=>open?"30%":"7%"};
height: ${({open})=>open?"100%":"3%"};

background-image:${({open})=>open?"var(--Drawer)":""};



@media (min-width: 40rem) {
    display: none;
}
`;
const Drawer=({children,open,close}:Container)=>{
    const ref=useRef<HTMLInputElement | null>(null);
    
    useMouseListener(ref,close);
   
    return(<DrawerStyle ref={ref} open={open} >
        {children}
        </DrawerStyle>
    )
}
export default Drawer;