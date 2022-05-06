import React, { useEffect, useState } from "react";
import Head from "next/head";

import Error from "../../components/Error/Error";
import Layout from "../../components/Layout";
import { ProductProvider } from "../../contexts/product";
import { UserProvider } from "../../contexts/user";
import Detail from "../../components/Detail/Detail";

function ProductDetail() {
  const [showError, setShowError] = useState(false);

  //Here, the components of the first opened page are printed on the screen.
  return (
    <>
      <Head>
        <title>İkinci El Project | Ürün Detayı</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ProductProvider>
        <Layout>
          {showError ? (
            <Error />
          ) : (
            <UserProvider>
              <Detail showError={setShowError}/>
            </UserProvider>
          )}
        </Layout>
      </ProductProvider>
    </>
  );
}

export default ProductDetail;
