import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const NavRecorder=styled.div`
width: 95%;
font-size: 1.3rem;
display: flex;
flex-direction: column;
justify-content: space-between;

gap:1.5rem;
align-items: center;
a.active{
    background-image:var(--Active);
 -webkit-background-clip: text;
 color:transparent;
}
@media (min-width: 40rem) {
    flex-direction: row;

    gap:2rem;
}
`;
const Links=styled.a`
color: black;
&:hover, .active{
 background-image:var(--Hover);
 -webkit-background-clip: text;
 color:transparent;
};


`;




const LinkHandler=()=>{
    return(<NavRecorder>
    <Links as={NavLink} to={'home'} >Home</Links>
    <Links as={NavLink} to={'contact'}  >About</Links>
    <Links as={NavLink} to={'*'}  >About</Links>
   

    </NavRecorder>)
}
export default LinkHandler;