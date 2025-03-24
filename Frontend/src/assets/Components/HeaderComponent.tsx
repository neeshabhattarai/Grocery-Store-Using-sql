import React from "react";

import LinkHandler from "../Helper/LinkHandler";
import ModelWindowProvider from "../Helper/ModelWindow";
import DrawerHandler from "../Helper/DrawerHandler";
import ProfileHandler from "../Helper/ProfileHandler";


const HeaderComponent=()=>{
    return(<React.Fragment>
       <DrawerHandler/>
       <ModelWindowProvider.header>
       <LinkHandler/>
       <ProfileHandler/>
       </ModelWindowProvider.header>
       </React.Fragment>
       )
}

export default HeaderComponent;