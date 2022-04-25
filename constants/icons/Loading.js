import React from "react"

//Here, the loading icon in which the register button will be located is set.
const LoadingIcon = props => (
    <svg width={props?.size || "200"} height={props?.size || "200"} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle stroke={props?.color || "#ffffff"} cx="50" cy="50" fill="none" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
    </svg>
)

export default LoadingIcon;