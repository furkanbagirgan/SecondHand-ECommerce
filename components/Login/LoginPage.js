import React from "react";
import Image from "next/image";

import styles from "./login.module.scss";
import Logo from "../../constants/icons/Logo";
import LoginForm from "./LoginForm";
import loginBanner from "../../assets/loginBanner.png";

function LoginPage() {
  return (
    <div className={styles.main}>
      <div className={styles.banner}>
        <Image
          className={styles.bannerImg}
          src={loginBanner}
          alt="Login to ikinciel"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo style={styles.logoImg} />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
