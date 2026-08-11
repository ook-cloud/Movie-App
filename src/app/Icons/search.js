import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="#09090B"
      stroke="#09090B"
      d="M4.8.5a4.3 4.3 0 0 1 3.36 6.983l-.28.35 3.344 3.344c.006.006.01.015.01.023l-.01.024a.033.033 0 0 1-.047 0L7.833 7.88l-.35.28A4.3 4.3 0 1 1 4.8.5Zm0 .066a4.234 4.234 0 1 0 0 8.468 4.234 4.234 0 0 0 0-8.468Z"
    />
  </svg>
);
export default SvgComponent;
