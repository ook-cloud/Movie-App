import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={11}
    fill="none"
    {...props}
  >
    <path
      stroke="#18181B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M.5 5.167h9.333M5.167 9.833l4.666-4.666L5.167.5"
    />
  </svg>
);
export default SvgComponent;
