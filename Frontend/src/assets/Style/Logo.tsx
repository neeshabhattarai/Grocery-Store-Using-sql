import styled from "styled-components";
import Backs from "./logo.png";

const Images = styled.img`
  height: 95px;
  width: 95px;
  margin-top: 8px;
  padding-left: 3px;
  /* margin-top: 8px; */
  border-radius: 5%;
  /* background-image: url("C:\Users\User\Desktop\Project\Frontend\public\girl.jpg"); */
`;
const Imaget = styled.img`
  height: 250px;
  width: 200px;

  /* margin-top: 8px; */
  border-radius: 3rem 1rem;
  box-shadow: 3px 4px 5px white;
  border: white;
  /* background-image: url("C:\Users\User\Desktop\Project\Frontend\public\girl.jpg"); */
`;

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "#441f1f",
        fontFamily: "cursive",
      }}
    >
      {" "}
      <Images src={Backs} />
      <h3>NepGrocy</h3>
    </div>
  );
};

export function LogoFooter() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "#441f1f",
        fontFamily: "cursive",
      }}
    >
      {" "}
      <Imaget src={Backs} />
      <h2 style={{ fontSize: "2rem" }}>NepGrocy</h2>
    </div>
  );
}

export default Logo;
