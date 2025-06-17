import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import Drawer from "./Drawer";
import LinkHandler from "../LinkHandler";
import styled from "styled-components";
import ProfileHandler from "../ProfileHandler";
import { StyledDrawer } from "../../Style/CircularImage";

const Profiler = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background-color: var(--background);
  @media (min-width: 480px) {
    display: none;
  }
`;
const WidthManager = styled.div`
  width: 98%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: flex-start;
`;

const DrawerHandler = () => {
  const [open, setOpen] = useState<boolean>(false);

  const Close = () => {
    setOpen(false);
  };

  const Toggle = () => {
    setOpen((c) => !c);
  };
  return (
    <Profiler>
      <WidthManager>
        <Drawer open={open} close={Close}>
          <StyledDrawer open={open}>
            <FiAlignJustify size={"1.5rem"} onClick={Toggle} />
          </StyledDrawer>
          {open && <LinkHandler open={open} />}
        </Drawer>
        <ProfileHandler />
      </WidthManager>
    </Profiler>
  );
};
export default DrawerHandler;
