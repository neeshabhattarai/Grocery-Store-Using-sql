import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Image } from "../Common/Account";
import UserDetails from "../Authentication";
import { UrlPath } from "../Common/Path";
import { HiOutlineEnvelopeOpen, HiOutlineCog } from "react-icons/hi2";
import { LogoutCOmponent } from "./Logout";
import PersonalInfo from "./PersonalInfo";
import EditUser from "../Common/EditUser";
import EditUsers from "./EditUsers";
import useUrl from "./GeneralUrl";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";
import useCategory from "../Admin/CategorywithProducts";

// Styled components
const StyledBar = styled.div`
  height: 100vh;
  width: 200px;
  background-color: #bc7a7a;

  top: 0;
  left: 0;

  padding: 10rem 1rem 0 1rem;
  @media (min-width: 480px) {
    width: 250px;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  gap: 3rem;
`;
const SettingsWrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 700px;

  /* padding-left: 8rem; */
  background-color: #fefefe;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  @media (min-width: 480px) {
    padding: 1rem;
  }
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`;

const Label = styled.label`
  justify-self: flex-start;
  font-weight: 600;
  color: #333;
`;

const FormFieldWrapper = styled.div`
  width: 100%;
  @media (min-width: 480px) {
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: center;
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  color: #fff;

  &:hover {
    text-decoration: underline;
  }
`;

const ContentArea = styled.div`
  margin: 0 auto;
  /* padding-left: 4rem; */
  padding-top: 2rem;
  width: 1fr;
  @media (min-width: 480px) {
    width: 35%;
    padding: 2rem;
  }
`;

// Placeholder Settings form component
const SettingsForm = ({ user, Changer }) => {
  const { UserReFetch } = useContext(UserDetails);
  const navigate = useNavigate();
  const { setResponse, data, error } = useUrl();

  const handleSave = async ({ headers, body }: { headers?: {}; body: {} }) => {
    // console.log(props);
    console.log("handle save");

    await setResponse({
      url: `http://localhost:5000/user/${user.userid}`,
      method: "PATCH",
      body: body,
      headers,
    });
  };
  useEffect(() => {
    if (data) {
      toast.success(data.message);
      UserReFetch();
      Changer("personal");
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      toast.error(data.message);
    }
  }, [error]);

  return (
    <SettingsWrapper>
      <Heading>Settings</Heading>
      <EditUsers
        datas={user}
        handleSave={handleSave} // Provide this if needed
        Label={Label}
        Wrapper={FormFieldWrapper}
      />
    </SettingsWrapper>
  );
};

// Personal Info Component

export default function SideBar() {
  const { User } = useContext(UserDetails);
  const [activeTab, setActiveTab] = useState("personal"); // 'personal' or 'settings'

  if (!User) return null;

  const currentUser = User[0];

  return (
    <div style={{ display: "flex" }}>
      <StyledBar>
        <Ul>
          <Image src={`${UrlPath}/${currentUser.image}`} alt="User Image" />
          <Li onClick={() => setActiveTab("personal")}>
            <HiOutlineEnvelopeOpen size={"1.5rem"} />
            <span>Personal Info</span>
          </Li>
          <Li onClick={() => setActiveTab("settings")}>
            <HiOutlineCog size={"1.5rem"} />
            <span>Settings</span>
          </Li>
        </Ul>
      </StyledBar>

      <ContentArea>
        {activeTab === "personal" && <PersonalInfo user={currentUser} />}
        {activeTab === "settings" && (
          <SettingsForm Changer={setActiveTab} user={currentUser} />
        )}
      </ContentArea>
    </div>
  );
}
