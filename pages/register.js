//main page showing register

import React, { useEffect } from "react";
import Head from "next/head";

import { UserProvider } from "../contexts/user";
import RegisterPage from "../components/Register/RegisterPage";

function Register() {
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>İkinci El Project | Kayıt Ol</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserProvider>
        <RegisterPage />
      </UserProvider>
    </>
  );
}

export default Register;
