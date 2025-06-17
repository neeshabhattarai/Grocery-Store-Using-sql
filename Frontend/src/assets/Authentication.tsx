import {
  createContext,
  createRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import App from "../App";
import useUrl from "./Helper/GeneralUrl";
import { useNavigate } from "react-router-dom";

let UserDetails = createContext({
  token: null,
  User: null,
  userId: null,
  Login: () => {},
  Logout: () => {},
  UserReFetch: () => {},
});
export const User = ({ children }) => {
  const { setResponse, data, error, loading } = useUrl();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const [User, setUser] = useState(null);
  const [ExpiresDate, setExpiresDate] = useState(null);
  const Login = useCallback(
    (tokens, id, expirationDate) => {
      let ExpiresDate =
        expirationDate instanceof Date
          ? expirationDate
          : new Date(expirationDate || new Date().getTime() + 1000 * 60 * 60);
      localStorage.setItem(
        "UserData",
        JSON.stringify({
          id: id,
          token: tokens,
          expirationDate: ExpiresDate.toISOString(),
        })
      );
      setUserId(id);
      setToken(tokens);
    },
    [token]
  );
  const Logout = useCallback(() => {
    localStorage.removeItem("UserData");
    setToken(null);
    setUserId(null);
    setExpiresDate(null);
    setUser(null);
  }, []);
  // useEffect(() => console.log("hello"));

  const UserReFetch = useCallback(async () => {
    if (userId) {
      console.log(userId);
      await setResponse({
        url: `http://localhost:5000/user/${userId}`,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    }
  }, [setResponse, userId]);
  useEffect(() => {
    UserReFetch();
  }, [UserReFetch]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setUser(data.message);
    }
  }, [data]);

  return (
    <UserDetails.Provider
      value={{ token, userId, Login, Logout, ExpiresDate, User, UserReFetch }}
    >
      {children}
    </UserDetails.Provider>
  );
};
export default UserDetails;
