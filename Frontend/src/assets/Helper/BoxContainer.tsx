import React from "react";
import { HiAcademicCap, HiAnnotation } from "react-icons/hi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useAnimation, motion } from "framer-motion";
import {
  LiaGratipay,
  LiaGrinTongueSquint,
  LiaGripfire,
  LiaHandHoldingHeartSolid,
  LiaSeedlingSolid,
  LiaShippingFastSolid,
} from "react-icons/lia";
import styled from "styled-components";
const H2 = styled.div`
  margin-top: 1rem;
  font-weight: 400;
  font-size: 2rem;
  color: #ffffff;
  text-shadow: 7px 3px 4px black;
`;
const Div = styled.div`
  width: 100%;
  /* height: 10rem; */
  margin-top: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  /* flex-wrap: wrap; */
  gap: 3rem;
  @media (min-width: 480px) {
    flex-direction: row;
    align-items: none;
  }
`;
const HCom = styled.h2`
  display: block;
  text-align: center;
  margin-top: 2rem;
  padding-left: 10px;
  @media (min-width: 480px) {
    text-align: left;
  }
`;
const SingleBox = styled.div`
  padding-top: 0.5rem;
  height: 21rem;
  width: 19rem;
  background-color: #642e27;
  border-radius: 1rem;
  box-shadow: 7px 7px 5px black;
  transition: all infinite ease-in;
  &:hover {
    transform: translateY(-6px);
    transform: scaleY(10px);
    border: 2px solid lightblue;
    box-shadow: 3px 7px 5px lightblue;
  }
`;
const P = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 1rem;
  padding: 0 1rem;
  text-align: justify;
  color: #edf2eaa8;
`;
const ComponentHandler = ({ Logo, text, paragraph }) => {
  return (
    <SingleBox>
      <div style={{ marginTop: "1rem" }}>
        {" "}
        <Logo
          size="2.5rem"
          color="lightblue"
          style={{
            borderRadius: "50%",
            backgroundColor: "hsla(0, 0%, 100%, .08)",
            width: "fit-content",
            height: "fit-content",
            padding: "0.8rem",
            textAlign: "center",
            placeItems: "center",
          }}
        />
      </div>
      <H2>{text}</H2>
      <P>{paragraph}</P>
    </SingleBox>
  );
};

export default function BoxContainer() {
  return (
    <motion.div
      initial={{ opacity: 0, marginLeft: "20rem", y: -60 }}
      whileInView={{ opacity: 1, y: 0, marginLeft: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <HCom>Our Service</HCom>
      <Div>
        <ComponentHandler
          text={"Organic"}
          Logo={LiaHandHoldingHeartSolid}
          paragraph={
            "We provide fresh fruits and vegetables with a focus on quality assurance"
          }
        ></ComponentHandler>
        <ComponentHandler
          text={"Fast"}
          Logo={LiaSeedlingSolid}
          paragraph={
            "Choose from same-day delivery or schedule a time that works best for you, ensuring quick and convenient service."
          }
        ></ComponentHandler>
        <ComponentHandler
          text={"Fresh"}
          Logo={LiaGripfire}
          paragraph={
            "Our delivery service covers a broader range of areas, making it easier for you to receive your groceries."
          }
        ></ComponentHandler>
        <ComponentHandler
          text={"24/7 orderings"}
          paragraph={
            "Our website and app are available 24/7, allowing you to shop whenever it's most convenient for you."
          }
          Logo={LiaShippingFastSolid}
        ></ComponentHandler>
      </Div>
    </motion.div>
  );
}
