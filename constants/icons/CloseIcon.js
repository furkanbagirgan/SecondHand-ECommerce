//The svg structure that creates the close icon

import React from "react";

const CloseIcon = (props) => (
  <svg className={props.style} viewBox="0 0 17.678 17.678">
    <g
      id="Group_6618"
      data-name="Group 6618"
      transform="translate(-1163.737 -189.161)"
    >
      <path
        fill={props?.color || "#525252"}
        id="Line_61"
        data-name="Line 61"
        d="M0,22a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V21A1,1,0,0,1,0,22Z"
        transform="translate(1180 190.575) rotate(45)"
      />
      <path
        fill={props?.color || "#525252"}
        id="Line_62"
        data-name="Line 62"
        d="M0,22a1,1,0,0,1-1-1V0A1,1,0,0,1,0-1,1,1,0,0,1,1,0V21A1,1,0,0,1,0,22Z"
        transform="translate(1180 205.425) rotate(135)"
      />
    </g>
  </svg>
);

export default CloseIcon;
