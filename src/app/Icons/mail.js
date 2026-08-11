import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m13.833 2.5-5.98 3.8a1.293 1.293 0 0 1-1.373 0L.5 2.5m1.333-2H12.5c.736 0 1.333.597 1.333 1.333v8c0 .737-.597 1.334-1.333 1.334H1.833A1.333 1.333 0 0 1 .5 9.833v-8C.5 1.097 1.097.5 1.833.5Z"
    />
  </svg>
);
export default SvgComponent;
