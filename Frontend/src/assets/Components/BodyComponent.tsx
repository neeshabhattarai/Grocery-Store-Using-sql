import styled from "styled-components";
import ModelWindowProvider from "../Helper/ModelWindow";
import { PropsWithChildren, PropsWithoutRef } from "react";
import FormHandler from "../Helper/Signup";
const MovingH1 = styled.h1`
  width: auto;
  color: black;
  /* animation:2s 1s linear infinite running move; */

  /* animation-name:move;
animation-duration: 2s;
animation-delay: 1s;
animation-timing-function: linear;
animation-play-state: running; */
  /* @keyframes move {
 0%{
        transform: translate(0%);
    }
    50%{
        transform: translate(100%);
    }
    100%{
        transform: translate(-100%);
    }
    
} */
`;
const BodyComponent = ({ children }: { children: PropsWithoutRef<"div"> }) => {
  return <ModelWindowProvider.body>{children}</ModelWindowProvider.body>;
};
export default BodyComponent;
