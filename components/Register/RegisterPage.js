//component showing register page components

import React from "react";
import Image from "next/image";

import styles from "./register.module.scss";
import LogoIcon from "../../constants/icons/LogoIcon";
import RegisterForm from "./RegisterForm";
import loginBanner from "../../public/loginBanner.png";

function RegisterPage() {
  return (
    <div className={styles.main}>
      <div className={styles.banner}>
        <Image
          className={styles.bannerImg}
          src={loginBanner}
          alt="Register to ikinciel"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.logo}>
          <LogoIcon style={styles.logoImg} />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
