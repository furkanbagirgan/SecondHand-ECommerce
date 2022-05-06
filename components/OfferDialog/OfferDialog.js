import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "./offerDialog.module.scss";
import Loading from "../Loading/Loading";
import CloseIcon from "./../../constants/icons/CloseIcon";

function OfferDialog({ callback, product, showDialog, closeDialog }) {
  const [loading, setLoading] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(0);
  const [customPrice, setCustomPrice] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [offerPrice, setOfferPrice] = useState(0);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(()=>{
    setIsValid(!Number.isNaN(customPrice - parseFloat(customPrice)));
  },[customPrice]);

  useEffect(() => {
    switch (selectedOffer) {
      case 0:
        setOfferPrice(product.price * 0.2);
        setCustomPrice("");
        break;
      case 1:
        setOfferPrice(product.price * 0.3);
        setCustomPrice("");
        break;
      case 2:
        setOfferPrice(product.price * 0.4);
        setCustomPrice("");
        break;
      default:
        setOfferBody(parseFloat(customPrice));
        break;
    }

    return () => {};
  }, [customPrice, product.price, selectedOffer]);

  const offer = async () => {
    setLoading(true);
    if (selectedOption === 3 && isValid && customPrice !== "") {
      await callback(offerPrice);
    }
    if (selectedOption !== 3) {
      await callback(offerBody);
    }
    setLoading(false);
    closeDialog();
  };

  if (isBrowser) {
    return ReactDOM.createPortal(
      <div
        className={
          showDialog
            ? `${styles.offerDialog}`
            : `${styles.offerDialog} ${styles.closeDialog}`
        }
      >
        <div className={styles.offerContent}>
          <div className={styles.header}>
            <span>Teklif Ver</span>
            <div onClick={()=>closeDialog()}>
              <CloseIcon style={styles.closeIcon} color="#525252" />
            </div>
          </div>
          <div className={styles.product}>
            <div className={styles.productDetail}>
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
              <div className={styles.productName}>
                {product.name ? product.name : "Belirtilmemiş"}
              </div>
            </div>
            <div className={styles.productPrice}>
              {product.price ? product.price + ",00 TL" : "Belirtilmemiş"}
            </div>
          </div>
          <div className={styles.offers}>
            <div
              role="none"
              onClick={() => setSelectedOffer(0)}
              className={`${styles.offer} ${selectedOffer === 0 ? styles.selected : ""}`}
            >
              <span className={styles.checkbox}/>
              <span>%20&apos;si Kadar Teklif Ver</span>
            </div>
            <div
              role="none"
              onClick={() => setSelectedOffer(1)}
              className={`${styles.offer} ${selectedOffer === 1 ? styles.selected : ""}`}
            >
              <span className={styles.checkbox} />
              <span className={styles.offerTitle}>%30&apos;u Kadar Teklif Ver</span>
            </div>
            <div
              role="none"
              onClick={() => setSelectedOffer(2)}
              className={`${styles.offer} ${selectedOffer === 2 ? styles.selected : ""}`}
            >
              <span className={styles.checkbox} />
              <span>%40&apos;ı Kadar Teklif Ver</span>
            </div>
            <div
              role="none"
              onClick={() => setSelectedOffer(3)}
              className={`${styles.offer} ${styles.customOffer} ${
                selectedOffer === 3 && isValid ? styles.selected : ""
              } ${
                selectedOffer === 3 && customPrice && !isValid
                  ? styles.selectedNotValid
                  : ""
              }`}
            >
              <div className={styles.customOffer}>
                <input
                  type="text"
                  name="offeredPrice"
                  placeholder="Teklif Belirle"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  autoComplete="off"
                />
                <p>TL</p>
              </div>
            </div>
            {selectedOffer === 3 && customPrice && !isValid && (
              <span className={styles.validaError}>
                Geçerli bir tutar giriniz! (Örnek: 1234.56)
              </span>
            )}
          </div>
          <button
            className={styles.confirmButton}
            onClick={() => offer()}
            disabled={loading}
          >
            {loading ? <Loading size={30} color="white" /> : "Onayla"}
          </button>
        </div>
      </div>,
      document.querySelector(".main")
    );
  } else {
    return null;
  }
}

export default OfferDialog;
