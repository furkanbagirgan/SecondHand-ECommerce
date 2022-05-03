import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "./navbar.module.scss";
import LogoIcon from "../../constants/icons/LogoIcon";
import UserIcon from "./../../constants/icons/UserIcon";
import AddIcon from "./../../constants/icons/AddIcon";
import { getCookie } from "../../utilies/cookies";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let authToken = getCookie("authToken");
    if (authToken != "") {
      setIsAuth(true);
    }
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logo}>
          <LogoIcon style={styles.logoImg} />
        </div>
        {isAuth ? (
          <div className={styles.navbarButtons}>
            <button
              className={styles.addButton}
              onClick={() => {
                router.push("/addProduct");
              }}
            >
              <AddIcon style="icon" size="12.9" color="#4b9ce2" />
            </button>
            <button
              onClick={() => {
                router.push("/addProduct");
              }}
            >
              <AddIcon style="icon" size="12.9" color="#4b9ce2" />
              Ürün Ekle
            </button>
            <button
              onClick={() => {
                router.push("/account");
              }}
            >
              <UserIcon
                style="icon"
                width="12.4"
                height="13.1"
                color="#4b9ce2"
              />
              Hesabım
            </button>
          </div>
        ) : (
          <div className={styles.navbarButtons}>
            <button
              onClick={() => {
                router.push("/login");
              }}
            >
              <UserIcon
                style="icon"
                width="12.4"
                height="13.1"
                color="#4b9ce2"
              />
              Giriş Yap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
