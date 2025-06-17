import React from "react";

import LinkHandler from "../Helper/LinkHandler";
import ModelWindowProvider from "../Helper/ModelWindow";
import DrawerHandler from "../Helper/Drawer/DrawerHandler";
import ProfileHandler from "../Helper/ProfileHandler";
import { User } from "../Authentication";

const HeaderComponent = () => {
  return (
    <div style={{ position: "relative" }}>
      <DrawerHandler />
      <ModelWindowProvider.header>
        <LinkHandler />

        <ProfileHandler />
      </ModelWindowProvider.header>
    </div>
  );
};

export default HeaderComponent;
