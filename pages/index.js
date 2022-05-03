import Layout from "../components/Layout";
import { useState } from "react";
import Image from "next/image";

import { ProductProvider } from "../contexts/product";
import LoadingIcon from "../constants/icons/LoadingIcon";
import Categories from "../components/Categories/Categories";
import Error from "../components/Error/Error";
import indexBanner from "../public/indexBanner.png";
import Products from "../components/Products/Products";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
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
            {loading ? (
              <div className="loading">
                <LoadingIcon size={75} color="#4b9ce2" />
              </div>
            ) : (
              <Products/>
            )}
          </>
        )}
      </Layout>
    </ProductProvider>
  );
}

export default HomePage;
