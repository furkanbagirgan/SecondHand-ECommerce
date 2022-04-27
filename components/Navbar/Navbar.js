import React from "react";
import { useRouter } from 'next/router'

import styles from "./header.module.scss";
import Logo from "../../constants/icons/Logo";

function Header() {
  const router = useRouter();

  return (
    <div className={styles.main}>
        <Logo style={styles.logoImg} />
        <span onClick={()=>{router.push("/login")}}>Giriş Yap</span>
    </div>
  );
}

export default Header;
