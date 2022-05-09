//The svg structure that creates the add icon

import React from "react";

const AddIcon = (props) => (
  <svg
    className={props.style}
    width={props?.size || "12.945"}
    height={props?.size || "12.945"}
    viewBox="0 0 12.945 12.945"
  >
    <g id="Group_6861" data-name="Group 6861" transform="translate(-4.1 -4.1)">
      <path
        fill={props?.color || "#4b9ce2"}
        id="Line_74"
        data-name="Line 74"
        d="M0,12.045a.9.9,0,0,1-.9-.9V0A.9.9,0,0,1,0-.9.9.9,0,0,1,.9,0V11.145A.9.9,0,0,1,0,12.045Z"
        transform="translate(10.572 5)"
      />
      <path
        fill={props?.color || "#4b9ce2"}
        id="Line_75"
        data-name="Line 75"
        d="M11.145.9H0A.9.9,0,0,1-.9,0,.9.9,0,0,1,0-.9H11.145a.9.9,0,0,1,.9.9A.9.9,0,0,1,11.145.9Z"
        transform="translate(5 10.572)"
      />
    </g>
  </svg>
);

export default AddIcon;
