import React, { useState, useEffect } from "react";

import styles from "./userInfo.module.scss";
import AccountIcon from "../../constants/icons/AccountIcon";
import Loading from "../../components/Loading/Loading";
import {getCookie,deleteCookie} from "../../utilies/cookies";
import { useRouter } from "next/router";

function UserInfo() {
    const [mail,setMail] = useState("");
    const [loading,setLoading] = useState(false);
    const router=useRouter();
  
  useEffect(()=>{
    let authMail = getCookie("authMail");
    if (authMail != "") {
      setMail(authMail);
    }
  },[]);

  const logOut = async ()=>{
    setLoading(true);
    deleteCookie("authToken");
    deleteCookie("authMail");
    deleteCookie("authId");
    router.replace("/");
    setLoading(false);
  }

  return (
    <div className={styles.info}>
      <div className={styles.infoContent}>
          <div className={styles.userInfo}>
            <AccountIcon size="38"/>
            <span>{mail}</span>
          </div>
          <button
              className={styles.logoutButton}
              onClick={() => logOut()}
              disabled={loading}
            >
              {loading ? <Loading size={30} color="white" /> : "Çıkış Yap"}
            </button>
      </div>
    </div>
  );
}

export default UserInfo;
