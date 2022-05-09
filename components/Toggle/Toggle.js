//component showing toggle

import React, { useState } from "react";

import styles from "./toggle.module.scss";

function Toggle({ value, onChange }) {
  const [toggleOn, setToggleOn] = useState(value);

  return (
    <div
      className={`${styles.holder} ${toggleOn ? styles.on : styles.off}`}
      onClick={() => {
        setToggleOn((prev) => !prev);
        onChange({ target: { name: "isOfferable", value: !toggleOn } });
      }}
      role="none"
      name="isOfferable"
    >
      <div className={styles.toggle} />
    </div>
  );
}

export default Toggle;
