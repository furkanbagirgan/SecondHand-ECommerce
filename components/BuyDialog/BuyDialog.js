import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "./buyDialog.module.scss";
import Loading from "../Loading/Loading";
import CloseIcon from "./../../constants/icons/CloseIcon";
import { useOffer } from "../../contexts/offer";
import toastMessage from "../../constants/toastify";

function BuyDialog({ product, showDialog, closeDialog }) {
  const [loading, setLoading] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const { buyProduct } = useOffer();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const buy = async () => {
    setLoading(true);
    let res=await buyProduct(product.id);
    setLoading(false);
    if(res===200){
      toastMessage(
        "success",
        "Satın Alındı"
      );
    }
    else{
      toastMessage("error", "Bir hata ile karşılaşıldı!");
    }
    closeDialog();
  };

  if (isBrowser) {
    return ReactDOM.createPortal(
      <div
        className={
          showDialog
            ? `${styles.buyDialog}`
            : `${styles.buyDialog} ${styles.closeDialog}`
        }
      >
        <div className={styles.buyContent}>
          <div className={styles.header}>
            Satın Al
          </div>
          <div className={styles.description}>
            Satın Almak istiyor musunuz?
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.cancelButton}
              onClick={() => closeDialog()}
              disabled={loading}
            >
              Vazgeç
            </button>
            <button
              className={styles.confirmButton}
              onClick={() => buy()}
              disabled={loading}
            >
              {loading ? <Loading size={30} color="white" /> : "Satın Al"}
            </button>
          </div>
        </div>
      </div>,
      document.querySelector(".main")
    );
  } else {
    return null;
  }
}

export default BuyDialog;
