import styled from "styled-components";

export const NavContainer=styled.div`
/* padding:0 10px; */
background-color:#cecaca;
position: fixed;
top: 0;
left:0;
display: none;
width:100%;
height: 4rem;
font-size:1rem ;
color: black;
z-index: 20;


@media (min-width: 40rem)  {
    display: flex;
align-items: center;
/* justify-content: center; */
gap: 1rem;
place-items: center;
  


}

`;
export const WholeWidth=styled.div`
width: 100%;
margin: 0;
padding: 0;
`;
export const BodyContainer=styled.div`
background-color:rgba(238, 239, 243, 0);
/* margin-top: 3rem; */
padding-top: 3rem;
/* padding-top: auto; */
/* display: flex; */
/* min-width: 40%; */
width: 100%;
/* align-items: center; */
height:100%;

@media (min-width: 480px){
    padding-top: 4rem;
    justify-content: center;
    
    /* max-width: 100%; */

}
`
;
// Button.js


export const Button = styled.button`
    background: #11166eb3;
  color: white;
  padding: 5px 12px;
width: fit-content;
height: fit-content;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
 color: white;
    background: var(--Hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
/* .active{
  background:linear-gradient(to bottom, #22c1c3,#fdbb2d);
} */
  &:active {
    background:linear-gradient(to bottom, #22c1c3,#fdbb2d);
    transform: translateY(0);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
`;
export const AddButton=styled(Button)`
margin-top: 2rem;
  background: var(--Icon);

 `;

// export default Button;


