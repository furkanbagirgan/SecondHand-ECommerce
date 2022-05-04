import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "./detail.module.scss";
import { getCookie } from "../../utilies/cookies";
import { useProduct } from "../../contexts/product";
import Loading from "../Loading/Loading";

function Detail({ showError }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { getProduct } = useProduct();
  const router = useRouter();

  useEffect(() => {
    let authToken = getCookie("authToken");
    if (authToken != "") {
      setIsAuth(true);
    }
    setDetail();
  }, []);

  const setDetail = async () => {
    setLoading(true);
    const { id } = router.query;
    const product = await getProduct(id);
    if (product.status !== 1) {
      showError(true);
    } else {
      showError(false);
      setProduct(product.detail);
    }
    setLoading(false);
  };

  return (
    <div className={styles.detail}>
      <div className={styles.detailContent}>
        { loading? <Loading size={75} color="#4b9ce2" /> :
        (<>
          <div className={styles.productImg}>
            {product.image?.url ? (
              <img
                className={styles.productPhoto}
                src={
                  product.image?.url
                    ? "https://bootcamp.akbolat.net" + product.image.url
                    : "noPhoto.png"
                }
                alt={product.name ? product.name : "Adlandırılmamış"}
              />
            ) : (
              <img
                className={styles.noPhoto}
                src="noPhoto.png"
                alt="Fotoğraf Yok"
              />
            )}
          </div>
          <div className={styles.productDetail}>
            <div className={styles.productName}>{product.name? product.name : "Adlandırılmamış"}</div>
            <div className={styles.productFeature}>{product.brand? product.brand+","+product.color+","+product.status : "Adlandırılmamış"}</div>
            <div className={styles.productPrice}>{product.price? product.price+",00 TL" : "Adlandırılmamış"}</div>
            <div className={styles.productSelling}>Satın Al Teklif Ver</div>
            <div className={styles.productDescription}>{product.description? product.description : "Adlandırılmamış"}</div>
          </div>
        </>)}
      </div>
    </div>
  );
}

export default Detail;
