
import styled from "styled-components";

const Image=styled.img`
height: 20px ;
width: 20px ;
border-radius: 50%;
background-color: black;
margin-right:20px ;
@media (min-width: 40rem) {
    height: 30px;
    width: 30px;
}
`;
export const StyledDrawer=styled.div<{open:boolean}>`
height: 25px;
width: 30px;
transition: background-color 1s ease-out;
background-color: ${({open})=>open?"":"#e6e3e1"};
`;
export default Image;