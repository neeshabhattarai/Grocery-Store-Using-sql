import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  HiAcademicCap,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineChatAlt } from "react-icons/hi";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Logo from "../Style/Logo";
import IconSizeAdder from "./IconSizeAdder";
import { Button } from "../Style/NavComponent";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import React, { useContext } from "react";
import UserDetails from "../Authentication";
import Logouts, { LogoutCOmponent } from "./Logout";
import { HiClipboardDocumentList } from "react-icons/hi2";
import SearchBars from "./SearchBar";
const NavRecorder = styled.div<{ open: boolean }>`
  width: 90%;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: color 3s ease-out;
  gap: 3rem;
  align-items: center;
  a.active {
    background-image: var(--Active);
    -webkit-background-clip: text;
    color: transparent;
    /* border-bottom: 4px solid black; */
  }

  @media (min-width: 40rem) {
    flex-direction: row;
    display: flex;
    animation: none;
    gap: 9rem;
    /* gap:2rem;s */
  }
`;
const Links = styled.a<{ btn?: boolean }>`
  color: black;
  transition: color 1s ease-in-out;
  cursor: pointer;
  font-size: 1rem;
  &:hover,
  &.active {
    border-bottom: 2px solid black;
    background-image: var(--Hover);
    -webkit-background-clip: text;
    color: transparent;
    background: ${(props) =>
      props.btn ? "linear-gradient(to bottom, #22c1c3,#fdbb2d);" : ""};
  }
`;
const Divider = styled.div`
  display: flex;
  flex-direction: column;
  width: 3rem;
  gap: 2rem;
  height: 100%;
  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

const LinkHandler = ({ open }: { open?: boolean }) => {
  // let tokens;
  // const Test = useMemo(() => {

  // const { showDialog, setShowDialog } = Logouts();
  const location = useLocation();
  const { token, User } = useContext(UserDetails);
  const role = User && User[0].role == "admin";
  const isAdminRoute = location.pathname.startsWith("/admin");
  //   console.log(token);
  //   tokens = token;
  // }, []);
  // Test();
  return (
    <NavRecorder open={open}>
      <Links as={NavLink} to={"/"}>
        <Logo />
      </Links>

      <Divider>
        {!isAdminRoute && (
          <>
            <Links as={NavLink} to={"home"}>
              <IconSizeAdder Component={HiOutlineHome} />
            </Links>
            <Links as={NavLink} to={"product"}>
              <IconSizeAdder Component={HiOutlineShoppingBag} />
            </Links>
          </>
        )}
        {/* <Links as={NavLink} to={"about"}>
          <IconSizeAdder Component={HiOutlineUserGroup} />
        </Links>
        <Links as={NavLink} to={"contact"}>
          <IconSizeAdder Component={HiOutlineChatAlt} />

        </Links> */}

        {token && !role ? (
          <React.Fragment>
            <Links as={NavLink} to={"/cart"}>
              <IconSizeAdder Component={HiOutlineShoppingCart} />
            </Links>

            <Links as={NavLink} to={"/order"}>
              <IconSizeAdder Component={MdOutlineShoppingCartCheckout} />
            </Links>
            <Links as={NavLink} to={"/payment/all"}>
              <IconSizeAdder Component={HiClipboardDocumentList} />
            </Links>
            <Links as={NavLink} to={"/recommendation"}>
              <IconSizeAdder Component={HiAcademicCap} />
            </Links>
          </React.Fragment>
        ) : (
          ""
        )}

        {token && role ? (
          <React.Fragment>
            <Links as={NavLink} to={"/admin/dashboard"}>
              Dashboard
            </Links>
            <Links as={NavLink} to={"/admin/user"}>
              User
            </Links>
            <Links as={NavLink} to={"/admin/addproduct"}>
              Product
            </Links>
            <Links as={NavLink} to={"/admin/product"}>
              Product List
            </Links>

            <Links as={NavLink} to={"/admin/addcategory"}>
              Category
            </Links>
            <Links as={NavLink} to={"/admin/category"}>
              Category List
            </Links>
            <Links as={NavLink} to={"/admin/orderList"}>
              Order
            </Links>
          </React.Fragment>
        ) : (
          ""
        )}
        {!token ? (
          <Div>
            <Button as={NavLink} to={"signup"}>
              Signup
            </Button>
            <Button as={NavLink} to={"login"}>
              Login
            </Button>
          </Div>
        ) : (
          ""
          // <LogoutCOmponent />
        )}
      </Divider>
    </NavRecorder>
  );
};
export default LinkHandler;
// style={{display:"flex",justifyContent:"center",gap:"16rem",width:"78%",alignItems:"center"}}
