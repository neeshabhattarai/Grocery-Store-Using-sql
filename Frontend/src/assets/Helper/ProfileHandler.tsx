import { createContext, useContext, useEffect } from "react";
import Girl from "../../../public/girl.jpg";
import UserDetails from "../Authentication";
import Image, { ImageWrapper } from "../Style/CircularImage";
import styled from "styled-components";
import useUrl from "./GeneralUrl";
import { UrlPath } from "../Common/Path";
import { HiDotsVertical } from "react-icons/hi";
import { ModelView } from "../Common/ModelHandler";
import ModelViews from "../Common/ModelWindowProfile";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  gap: 0;
  margin: 0;
  padding: 0;
  font-weight: bold;
  justify-content: center;
  color: var(--Icon);
`;
const ProfileHandler = () => {
  const { User } = useContext(UserDetails);
  // const { image } = User;

  return (
    <Div>
      {User ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={`${UrlPath}/${User[0]?.image}`} />
          <ModelViews>
            <ModelViews.header />
            <ModelViews.body />
          </ModelViews>
        </div>
      ) : (
        ""
      )}
      {/* {User && (
        <span
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            textShadow: "3px 3px 5px white",
          }}
        >
          {User[0]?.name}
        </span>
      )} */}
    </Div>
  );
};
export default ProfileHandler;
