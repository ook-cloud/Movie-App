import * as React from "react";
export const Sun = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#18181B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.167.5v1.333m0 10.667v1.333M2.453 2.453l.94.94m7.547 7.547.94.94M.5 7.167h1.333m10.667 0h1.333M3.393 10.94l-.94.94m9.427-9.427-.94.94M9.833 7.167a2.667 2.667 0 1 1-5.333 0 2.667 2.667 0 0 1 5.333 0Z"
    />
  </svg>
);
