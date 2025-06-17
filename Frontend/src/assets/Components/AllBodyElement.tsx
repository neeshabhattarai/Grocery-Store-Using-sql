import BodyComponent from "./BodyComponent";
import { Outlet } from "react-router-dom";

const BodyCollection = () => {
  return (
    <BodyComponent>
      <Outlet />
    </BodyComponent>
  );
};
export default BodyCollection;
