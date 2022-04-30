import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function ProductDetail() {
    const [productId,setProductId]=useState();
  const router = useRouter();

  useEffect(() => {
    const {id}=router.query;
    setProductId(id);
  }, []);

  //Here, the components of the first opened page are printed on the screen.
  return (
    <>
      <Head>
        <title>İkinci El Project | Ürün Detayı</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>Mehaba {productId}</div>
    </>
  );
}

export default ProductDetail;
