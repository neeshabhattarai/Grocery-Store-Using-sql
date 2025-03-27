import {  useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import Drawer from "./Drawer";
import LinkHandler from "./LinkHandler";
import styled from "styled-components";
import ProfileHandler from "./ProfileHandler";
import { StyledDrawer } from "../Style/CircularImage";


const Profiler=styled.div`
display: flex;
flex-direction: row;
justify-content:end;
align-items: center;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 6%;
background-color: var(--background);
@media (min-width: 40rem ) {
    display: none;
}
`;

const DrawerHandler=()=>{
    const [open,setOpen]=useState<boolean>(false);
   
    const Close=()=>{
        setOpen(false);
    }
   
   const Toggle=()=>{
    setOpen((c)=>!c);
   }
    return(<Profiler>
    
        <Drawer open={open}  close={Close} > 
       <StyledDrawer open={open}>
        <FiAlignJustify size={"1.5rem"} onClick={Toggle}/>
        </StyledDrawer>
   
       {open && <LinkHandler />}
       
        </Drawer>
     
    
        <ProfileHandler/>
        </Profiler>
        
    )
}
export default DrawerHandler;