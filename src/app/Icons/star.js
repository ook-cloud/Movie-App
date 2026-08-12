import * as React from "react";
export const Star = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#FDE047"
      stroke="#FDE047"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m7.167.5 2.06 4.173 4.606.674L10.5 8.593l.787 4.587-4.12-2.167-4.12 2.167.786-4.587L.5 5.347l4.607-.674L7.167.5Z"
    />
  </svg>
);
