import React, { useContext, useState } from "react";
import styled from "styled-components";
import UserDetails from "../Authentication";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ModelViews, { TextModel } from "../Common/ModelWindowProfile";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  width: 300px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  background: ${(props) => (props.variant === "danger" ? "#e63946" : "#ccc")};
  color: ${(props) => (props.variant === "danger" ? "white" : "black")};
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => (props.variant === "danger" ? "#d62828" : "#bbb")};
  }
`;

const LogoutButton = styled(Button)`
  background: #e63946;
  color: white;
`;

export default function Logouts() {
  const [showDialog, setShowDialog] = useState(false);
  const { Logout } = useContext(UserDetails);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowDialog(false);
    Logout();
    navigate("/home");

    // Add your actual logout logic here
  };
  return { setShowDialog, showDialog, handleLogout };
}
export const LogoutCOmponent = ({ text = "logout" }) => {
  const { showDialog, setShowDialog, handleLogout } = Logouts();
  return (
    <>
      <div onClick={() => setShowDialog(true)}>
        Logout <HiArrowRightOnRectangle size={"1.5rem"} color="#023e8a" />
      </div>
      {showDialog && (
        <Overlay>
          <Modal>
            <h2>Are you sure you want to logout?</h2>
            <div style={{ marginTop: "1.5rem" }}>
              <Button onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Modal>
        </Overlay>
      )}
    </>
  );
};
