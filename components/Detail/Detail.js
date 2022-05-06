import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "./detail.module.scss";
import { getCookie } from "../../utilies/cookies";
import { useProduct } from "../../contexts/product";
import { useAuth } from "../../contexts/user";
import Loading from "../Loading/Loading";
import OfferDialog from "../OfferDialog/OfferDialog";

function Detail({ showError }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [hasOffer, setHasOffer] = useState(false);
  const [offerDialog, setOfferDialog] = useState(false);
  const [buyDialog, setBuyDialog] = useState(false);
  const { getProduct } = useProduct();
  const { user } = useAuth();
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    let authToken = getCookie("authToken");
    if (authToken != "") {
      setIsAuth(true);
    }
    if (router.isReady) {
      setDetail();
    }
  }, [router.isReady]);

  const setDetail = async () => {
    setLoading(true);
    const productDetail = await getProduct(id);
    if (productDetail.status !== 1) {
      showError(true);
    } else {
      showError(false);
      setProduct(productDetail.detail);
    }
    setLoading(false);
    productDetail.detail.offers.forEach((offer) => {
      if (offer.users_permissions_user === user.id) {
        setHasOffer(true);
        return;
      }
    });
  };

  const buy = () => {
    
  };

  const offer = (offerPrice) => {
    
  };

  const backOffer = () => {

  };

  return (
    <>
      <div className={styles.detail}>
        <div className={styles.detailContent}>
          {loading ? (
            <Loading size={75} color="#4b9ce2" />
          ) : (
            <>
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
                <div className={styles.productName}>
                  {product.name ? product.name : "Adlandırılmamış"}
                </div>
                <div className={styles.changeReverse}>
                  <ul className={styles.productFeature}>
                    <li className={`${styles.productFeature} ${styles.title}`}>
                      Marka:
                    </li>
                    <li>{product.brand ? product.brand : "Belirtilmemiş"}</li>
                    <li className={`${styles.productFeature} ${styles.title}`}>
                      Renk:
                    </li>
                    <li>{product.color ? product.color : "Belirtilmemiş"}</li>
                    <li className={`${styles.productFeature} ${styles.title}`}>
                      Kullanım Durumu:
                    </li>
                    <li>{product.status ? product.status : "Belirtilmemiş"}</li>
                  </ul>
                  <div className={styles.productPrice}>
                    {product.price ? product.price + ",00 TL" : "Belirtilmemiş"}
                  </div>
                </div>
                <div className={styles.productSelling}>
                  {!isAuth || (product.isSold ? product.isSold : false) ? (
                    <button className={styles.warningButton}>
                      {(product.isSold ? product.isSold : false)
                        ? "Bu Ürün Satışta Değil"
                        : "Lütfen Giriş Yapın"}
                    </button>
                  ) : (
                    <>
                      <button
                        className={styles.buyButton}
                        onClick={() => setBuyDialog(true)}
                      >
                        Satın Al
                      </button>
                      {((product.isOfferable? product.isOfferable : false) &&
                      hasOffer) ? (
                        <button
                          className={styles.offerButton}
                          onClick={() => backOffer()}
                        >
                          Teklifi Geri Çek
                        </button>
                      ) : (
                        <button
                          className={styles.offerButton}
                          onClick={() => setOfferDialog(true)}
                        >
                          Teklif Ver
                        </button>
                      )}
                    </>
                  )}
                </div>
                <div className={styles.productDescription}>
                  <span className={styles.desTitle}>Açıklama</span>
                  <span>
                    {product.description ? product.description : "Açıklanmamış"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.bottomButtons}>
        {!isAuth || (product.isSold ? product.isSold : false) ? (
          <button className={styles.warningButton}>
            {(product.isSold ? product.isSold : false)
              ? "Bu Ürün Satışta Değil"
              : "Lütfen Giriş Yapın"}
          </button>
        ) : (
          <>
            <button className={styles.buyButton} onClick={() => buy()}>
              Satın Al
            </button>
            {(product.isOfferable ? product.isOfferable : false) && hasOffer ? (
              <button className={styles.offerButton} onClick={() => offer()}>
                Teklifi Geri Çek
              </button>
            ) : (
              <button className={styles.offerButton} onClick={() => offer()}>
                Teklif Ver
              </button>
            )}
          </>
        )}
      </div>
      <OfferDialog callback={()=>offer()} product={product} showDialog={offerDialog} closeDialog={()=>setOfferDialog(false)}/>
    </>
  );
}

export default Detail;
