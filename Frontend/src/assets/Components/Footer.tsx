import React from "react";
import Logo, { LogoFooter } from "../Style/Logo";
import { motion } from "framer-motion";
import styled from "styled-components";
const DivDivider = styled.div`
  border-top: 2px solid black;
`;
const Divs = styled.div`
  width: 100;
  justify-content: center;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: justify;
  gap: 2rem;

  padding-bottom: 0.6rem;
  @media (min-width: 480px) {
    flex-direction: row;
    gap: 7rem;
    align-items: flex-start;
    justify-content: center;
  }
`;
const Footers = styled.div`
  margin-top: 2rem;
`;
const Div = styled.h2`
  padding-bottom: 0.6rem;
  font-size: 1.8rem;
  margin: 0;
  color: blue;
`;
const DivChildren = styled.div`
  color: black;
  font-size: 1.3rem;
  font-weight: 500;
  text-align: left;
`;
const Pa = styled.p`
  margin: 0;
  padding: 0.5rem 0;
`;
export default function Footer() {
  return (
    <Footers>
      <DivDivider>
        <Divs>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ marginRight: "0", opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <LogoFooter />
          </motion.div>
          <Div>
            <DivChildren>
              <Div>About</Div>
              <Pa>Fresh Produce</Pa>
              <Pa>Daily essential</Pa>
              <Pa>Local sourcing</Pa>
              <Pa>Fast Delievery</Pa>
            </DivChildren>
          </Div>
          <Div>
            <DivChildren>
              <Div>Customer Support:</Div>
              <Pa>nepGrocy.com</Pa>
              <Pa>
                <b>Phone:</b>9746450070
              </Pa>
              <Pa>
                <b>Email:</b>nepgrocy@gmail.com
              </Pa>
              <Pa>
                <b>open:</b> 24/7 hour
              </Pa>
            </DivChildren>
          </Div>
          <Div>
            <DivChildren>
              <Div>Store Location:</Div>
              <Pa>
                <b>Address:</b>Tillotama-5,Manigram
              </Pa>
            </DivChildren>
          </Div>
        </Divs>
        <Divs
          style={{ flexDirection: "column", gap: "10px", alignItems: "center" }}
        >
          <div style={{ color: "black", fontSize: "1.3rem" }}>
            Terms of Service | Privacy Policy
          </div>
          <div style={{ color: "black", fontSize: "1.3rem" }}>
            © 2025 FreshBasket. All rights reserved.
          </div>
        </Divs>
      </DivDivider>
    </Footers>
  );
}
