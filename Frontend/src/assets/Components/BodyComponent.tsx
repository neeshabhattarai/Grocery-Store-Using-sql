import styled from "styled-components";
import ModelWindowProvider from "../Helper/ModelWindow";
const MovingH1=styled.h1`
width: auto;
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
const BodyComponent=()=>{
return(<ModelWindowProvider.body>
    <MovingH1>Hello</MovingH1>
</ModelWindowProvider.body>
)
}
export default BodyComponent;