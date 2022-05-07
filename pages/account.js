import React, { useState,useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Error from "../components/Error/Error";
import Layout from "../components/Layout";
import { ProductProvider } from "../contexts/product";
import { OfferProvider } from "../contexts/offer";
import UserInfo from "../components/UserInfo/UserInfo";
import UserOffers from "../components/UserOffers/UserOffers";
import { getCookie } from "../utilies/cookies";

function Account() {
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let authToken = getCookie("authToken");
    if (authToken == "") {
      router.replace("/login");
    }
  }, []);

  //Here, the components of the first opened page are printed on the screen.
  return (
    <>
      <Head>
        <title>İkinci El Project | Hesabım</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ProductProvider>
        <Layout>
          {showError ? (
            <Error />
          ) : (
            <>
              <UserInfo />
              <OfferProvider>
                <UserOffers showError={setShowError}/>
              </OfferProvider>
            </>
          )}
        </Layout>
      </ProductProvider>
    </>
  );
}

export default Account;
