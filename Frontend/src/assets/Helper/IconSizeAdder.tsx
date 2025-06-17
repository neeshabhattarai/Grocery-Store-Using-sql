// import { JSX } from "react"

import { JSX } from "react";

const IconSizeAdder = ({
  Component,
  onclick,
}: {
  Component: JSX.ElementType;
  onclick?: void;
}) => {
  return <Component size={"2rem"} color={"var(--Icon)"} onClick={onclick} />;
};
export default IconSizeAdder;
