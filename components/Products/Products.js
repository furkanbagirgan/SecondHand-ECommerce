import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "./products.module.scss";
import { useProduct } from "../../contexts/product";
import { useScroll } from './../../hooks/useScroll';
import Loading from "../Loading/Loading";

function Products() {
  const [loading,setLoading]= useState(false);
  const [stopLoading,setStopLoading]= useState(false);
  const { filteredProducts, getProducts, activeCategory } = useProduct();
  const router = useRouter();
  const scroll = useScroll();

  useEffect(() => {
		getProductsNow();
	}, [scroll.scrolling]);

  const getProductsNow=async()=>{
    if(scroll.scrolling && !stopLoading){
        setLoading(true);
        const res=await getProducts(activeCategory.id);
        if(res!==1 && res!==2){
          setStopLoading(true);
        }
        setLoading(false);
    }
  }

  return (
    <div className={styles.product}>
      {filteredProducts?.length > 0 ? (
        <>
        <ul className={styles.productContainer}>
          {
            /* Here the characters are printed on the screen. */
            filteredProducts?.map((product,index) => (
              <li
                key={product.id? product.id : index}
                className={styles.productItem}
                onClick={() => router.push("/productDetail/" + product.id)}
              >
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
                <div className={styles.productContent}>
                  <div className={styles.productDetail}>
                    <span className={styles.productBrand}>
                      {product.brand ? product.brand : "Belirsiz"}
                    </span>
                    <span className={styles.productColor}>
                      {product.color
                        ? "Renk: " + product.color
                        : "Renk: Belirsiz"}
                    </span>
                  </div>
                  <div className={styles.productPrice}>
                    {product.price ? product.price.toLocaleString("tr-TR", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + " TL" : "Belirsiz"}
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
        {
          loading &&
          <Loading size={75} color="#4b9ce2" />
        }
        </>
      ) : (
        <div className={styles.productNotFound}>
          Bu kategoride hiçbir ürün bulunmamaktadır.
        </div>
      )}
    </div>
  );
}

export default Products;
