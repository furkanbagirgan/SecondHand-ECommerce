//main page showing home page

import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

import Layout from "../components/Layout";
import { ProductProvider } from "../contexts/product";
import Loading from "../components/Loading/Loading";
import Categories from "../components/Categories/Categories";
import Error from "../components/Error/Error";
import indexBanner from "../public/indexBanner.png";
import Products from "../components/Products/Products";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <>
      <Head>
        <title>İkinci El Project | Anasayfa</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ProductProvider>
        <Layout>
          {showError ? (
            <Error />
          ) : (
            <>
              <div className="banner">
                <div className="bannerContent">
                  <Image
                    className="bannerImg"
                    src={indexBanner}
                    alt="Tarzını yansıtan ürünleri keşfet"
                  />
                </div>
              </div>
              <Categories loading={setLoading} showError={setShowError} />
              {loading ? <Loading size={75} color="#4b9ce2" /> : <Products />}
            </>
          )}
        </Layout>
      </ProductProvider>
    </>
  );
}

export default HomePage;
