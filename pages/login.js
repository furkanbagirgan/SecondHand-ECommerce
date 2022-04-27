import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'

import { AuthProvider } from "../contexts/auth";
import LoginPage from "../components/Login/LoginPage";

function Login() {
  const router = useRouter();

  useEffect(() => {
    let authToken = getCookie("authToken");
    if (authToken != "") {
      router.replace("/");
    }
  }, []);

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  //Here, the components of the first opened page are printed on the screen.
  return (
    <>
      <Head>
        <title>İkinci El Project | Giriş Yap</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </>
  );
}

export default Login;
