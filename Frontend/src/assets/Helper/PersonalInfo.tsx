import styled from "styled-components";

const InfoContainer = styled.div`
  width: 100%;

  padding: 4rem 0 0 0rem;
  border-radius: 12px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: baseline;
  gap: 0rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  @media (min-width: 480px) {
    padding: 2.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
  @media (min-width: 480px) {
    font-size: 2rem;
  }
`;

const InfoItem = styled.div`
  margin: 1rem 0;
`;

const Label = styled.span`
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  color: #34495e;
  width: 83px;
  @media (min-width: 480px) {
    width: 150px;
    font-size: 1.2rem;
  }
`;

const Value = styled.span`
  font-size: 1rem;
  color: #555;
  @media (min-width: 480px) {
    font-size: 1.2rem;
  }
`;

const PersonalInfo = ({ user }) => (
  <InfoContainer>
    <Title>Personal Information</Title>
    <InfoItem>
      <Label>Name:</Label> <Value>{user.name}</Value>
    </InfoItem>
    <InfoItem>
      <Label>Email:</Label> <Value>{user.email}</Value>
    </InfoItem>
    <InfoItem>
      <Label>Contact:</Label> <Value>{user.contact}</Value>
    </InfoItem>
  </InfoContainer>
);

export default PersonalInfo;
