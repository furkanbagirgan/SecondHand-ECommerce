import Layout from "../components/Layout";
import { ProductProvider } from "../contexts/product";
import { useEffect } from "react";

import { getCookie } from "./../utilies/cookies";
import { useState } from "react";

function HomePage() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let authToken = getCookie("authToken");
    if (authToken != "") {
      setIsAuth(true);
    }
  }, []);

  return (
    <ProductProvider>
      <Layout isAuth={isAuth} />
    </ProductProvider>
  );
}

export default HomePage;
