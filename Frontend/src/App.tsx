import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Routing from "./assets/Components/NavComponentAdder";
import Apps from "./assets/Components/IndexComponent";
import UserDetails, { User } from "./assets/Authentication";
import RouteHandler from "./assets/Components/NavComponentAdder";
import { useContext, useEffect, useMemo } from "react";
let LogoutId;
function App() {
  const { userId, token, Login, Logout, ExpiresDate, User } =
    useContext(UserDetails);

  useEffect(() => {
    try {
      const Data = localStorage.getItem("UserData");
      const CheckedData = JSON.parse(Data);
      console.log(CheckedData);
      if (
        CheckedData &&
        CheckedData.token &&
        new Date(CheckedData.expirationDate) > new Date()
      ) {
        Login(CheckedData.token, CheckedData.id, CheckedData.expirationDate);
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
    }
  }, [Login]);

  useEffect(() => {
    if (!ExpiresDate) return;

    let RemainingTime = new Date(ExpiresDate).getTime() - new Date().getTime();

    if (RemainingTime > 0) {
      LogoutId = setTimeout(Logout, RemainingTime);
    } else {
      Logout();
    }

    return () => clearTimeout(LogoutId);
  }, [ExpiresDate, Logout]);

  // console.log(token);
  let RouteSpecification = useMemo(
    () => createBrowserRouter(RouteHandler({ token, User })),
    [token, User]
  );
  return <RouterProvider router={RouteSpecification}></RouterProvider>;
}

export default App;
