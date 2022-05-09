//component showing error

import React from "react";
import Image from "next/image";

import styles from "./error.module.scss";
import errorImg from "../../public/errorImg.png";

function Error() {
  return (
    <div className={styles.error}>
      <div className={styles.errorContent}>
        <Image className={styles.errorImg} src={errorImg} alt="Hata" />
      </div>
      <div className={styles.errorMessage}>
        Lütfen bağlantınızı kontrol ediniz!
      </div>
    </div>
  );
}

export default Error;
