import React from "react";
import { useRouter } from 'next/router'

import styles from "./navbar.module.scss";
import Logo from "../../constants/icons/Logo";

function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.main}>
        <Logo style={styles.logoImg} />
        <span onClick={()=>{router.push("/login")}}>Giriş Yap</span>
    </div>
  );
}

export default Navbar;
