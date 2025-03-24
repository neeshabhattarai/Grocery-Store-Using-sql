import styled from "styled-components";

export const NavContainer=styled.div`
padding:0 10px;
background-color:var(--background);
position: sticky;
top: 0;
left:0;
display: none;
width: 100%;
height: 3rem;
font-size:1rem ;
color: black;


@media (min-width: 40rem)  {
    display: flex;
align-items: center;
gap: 1rem;
  


}

`;
export const WholeWidth=styled.div`
width: 100%;

height: 100vh;
margin: 0;
padding: 0;
`;
export const BodyContainer=styled.div`
background-color: palegoldenrod;
margin: 0;
padding: 0;

height: 100%;


`
;

