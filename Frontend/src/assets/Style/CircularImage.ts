
import styled from "styled-components";

 const Images=styled.img`
height: ${(props)=>props.height?props.height:"33px" };
width:  ${(props)=>props.width?props.width:"33px" } ;
border-radius: 50%;
background-color: black;

/* align-self: flex-end; */
@media (min-width: 40rem) {
    height: 38px;
    width: 47px;
    margin-right:5px ;
    border: 1px solid black;
}
`;
export const StyledDrawer=styled.div<{open:boolean}>`
height: 25px;
width: 30px;
transition: background-color 1s ease-out;
background-color: ${({open})=>open?"":"#e6e3e1"};
`;
export const ImageWrapper=styled.div`
width:8%;

@media (min-width: 40rem) {
    width: 10%;
    text-align: right;
    margin-top: 6px;
    
}
`;
export default Images;