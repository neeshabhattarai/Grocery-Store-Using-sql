import {  createContext, PropsWithChildren } from "react";
import { BodyContainer, NavContainer } from "../Style/NavComponent";

const ModelWindow=createContext({});
const ModelWindowProvider=({children}:PropsWithChildren)=>{
    return(<ModelWindow.prototype>
        {children}
    </ModelWindow.prototype>)
}
const Header=(props:PropsWithChildren)=>{
    return<NavContainer>
    {props.children}
    </NavContainer>
}
const Body=({children}:PropsWithChildren)=>{
    return(<BodyContainer>{children}</BodyContainer>)

}
ModelWindowProvider.header=Header;
ModelWindowProvider.body=Body;

export default ModelWindowProvider;