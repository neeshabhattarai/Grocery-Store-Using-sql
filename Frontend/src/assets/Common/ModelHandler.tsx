import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { Column } from "../Style/TableStyel";

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
  background-color: lightblue;
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

export const ModelHander = createContext({
  showDialog: false,
  OpenView: () => {},
  closeView: () => {},
});

export const ModelView = ({ children }) => {
  const [showDialog, setShowDialog] = useState(false);

  const closeView = () => setShowDialog(false);
  const OpenView = () => setShowDialog(true);

  return (
    <ModelHander.Provider value={{ showDialog, closeView, OpenView }}>
      {children}
    </ModelHander.Provider>
  );
};

const HeaderText = ({ Text }) => {
  const { OpenView } = useContext(ModelHander);

  return <Column onClick={OpenView}>{Text}</Column>;
};

const BodyText = ({ children }) => {
  const { showDialog, closeView } = useContext(ModelHander);

  return (
    <>
      {showDialog && (
        <Overlay>
          <Modal>
            {children}

            <div style={{ marginTop: "1.5rem" }}>
              <Button variant="danger" onClick={closeView}>
                Cancel
              </Button>
            </div>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

ModelView.header = HeaderText;
ModelView.body = BodyText;
