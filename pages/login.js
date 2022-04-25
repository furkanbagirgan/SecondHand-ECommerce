import React, { useEffect } from "react";
import Head from "next/head";

import LoginPage from "../components/Login/LoginPage";

function Login() {
  useEffect(() => {}, []);

  //Here, the components of the first opened page are printed on the screen.
  return (
    <>
      <Head>
        <title>İkinci El Project | Giriş Yap</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <LoginPage />
    </>
  );
}

export default Login;
