import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import { LogoutCOmponent } from "../Helper/Logout";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import EditUser from "./EditUser";
import Account from "./Account";
import { useNavigate } from "react-router-dom";
import useClickHandelr from "./ClickHandler";
import { set } from "react-hook-form";
const ModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 2rem;
  right: 0.5rem;
  /* height: 100px; */
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #c0b6d3;
`;
export const TextModel = styled.div`
  font-size: 1rem;

  font-weight: bold;
`;

let Model = createContext();
const ModelViews = ({ children }) => {
  const [open, setOpen] = useState(false);
  const Close = useCallback(() => setOpen(false), []);
  const Toggle = useCallback(() => {
    setOpen((c) => !c);
  }, [open]);

  return (
    <Model.Provider value={{ open, Toggle, Close }}>{children}</Model.Provider>
  );
};
const HeaderText = () => {
  const { Toggle } = useContext(Model);
  return <HiDotsVertical onClick={Toggle} />;
};
const BodyText = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { open, Close } = useContext(Model);
  useClickHandelr({ ref, Close });
  return (
    <>
      {open && (
        <ModalStyle ref={ref}>
          <TextModel
            onClick={() => {
              navigate("/account");
            }}
          >
            Account <HiOutlinePencilSquare size={"1.5rem"} />
          </TextModel>
          <TextModel>
            <LogoutCOmponent />
          </TextModel>
          {/* <TextModel>Logout{children}</TextModel> */}
        </ModalStyle>
      )}
    </>
  );
};
ModelViews.header = HeaderText;
ModelViews.body = BodyText;
export default ModelViews;
