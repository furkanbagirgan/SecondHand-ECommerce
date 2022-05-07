import React, { useState,useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Error from "../components/Error/Error";
import Layout from "../components/Layout";
import { getCookie } from "../utilies/cookies";
import { ProductProvider } from "../contexts/product";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import ProductImg from "../components/ProductImg/ProductImg";

function AddProduct() {
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
        <title>İkinci El Project | Ürün Ekle</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ProductProvider>
        <Layout>
          {showError ? (
            <Error />
          ) : (
            <div className="addProduct">
              <div className="addProductContent">
                <ProductInfo showError={setShowError}/>
                <ProductImg showError={setShowError}/>
              </div>
            </div>
          )}
        </Layout>
      </ProductProvider>
    </>
  );
}

export default AddProduct;
