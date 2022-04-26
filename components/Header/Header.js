import React from "react";

import styles from "./header.module.scss";
import Logo from "../../constants/icons/Logo";

function Header() {
  return (
    <div className={styles.main}>
        <Logo style={styles.logoImg} />
    </div>
  );
}

export default Header;
