import Layout from "../components/Layout";
import Products from "../components/Products/Products";
import { ProductsProvider } from "../contexts/products";
import { useEffect } from 'react';

import { getCookie } from './../utilies/cookies';
import { useState } from 'react';

function HomePage() {
  const [isAuth,setIsAuth] = useState(false);

  useEffect(()=>{
    let authToken = getCookie("authToken");
    if (authToken == "") {
      setIsAuth(true);
    }
  },[]);

  return (
    <Layout isAuth={isAuth}>
      <ProductsProvider>
        <Products />
      </ProductsProvider>
    </Layout>
  );
}

export default HomePage;
