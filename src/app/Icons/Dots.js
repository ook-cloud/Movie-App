import * as React from "react";
export const Dots = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={3}
    fill="none"
    {...props}
  >
    <path
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.833 1.833a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333ZM10.5 1.833A.667.667 0 1 0 10.5.5a.667.667 0 0 0 0 1.333ZM1.167 1.833a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333Z"
    />
  </svg>
);
