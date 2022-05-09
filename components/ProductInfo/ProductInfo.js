//component showing product info

import React, { useState, useEffect } from "react";

import styles from "./productInfo.module.scss";
import { useProduct } from "../../contexts/product";
import toastMessage from "../../constants/toastify";
import { ProductSchema } from "../../constants/YupSchema";
import Loading from "../Loading/Loading";
import ImageUploader from "../ImageUploader/ImageUploader";
import Combobox from "../Combobox/Combobox";
import Toggle from "../Toggle/Toggle";
import { useFormik } from "formik";

function ProductInfo({ showError }) {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errorImg, setErrorImg] = useState(false);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [usingStatus, setUsingStatus] = useState([]);
  const [image, setImage] = useState(null);
  const { getColors, getBrands, getUsingStatus, getCategories, createProduct } =
    useProduct();

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    setLoading(true);
    const colorsData = await getColors();
    if (colorsData.status != 200) {
      showError(true);
    } else {
      showError(false);
      setColors(colorsData.colors);
    }
    const brandsData = await getBrands();
    if (brandsData.status != 200) {
      showError(true);
    } else {
      showError(false);
      setBrands(brandsData.brands);
    }
    const usingStatusData = await getUsingStatus();
    if (usingStatusData.status != 200) {
      showError(true);
    } else {
      showError(false);
      setUsingStatus(usingStatusData.usingStatus);
    }
    const categoriesData = await getCategories();
    if (categoriesData.status != 200) {
      showError(true);
    } else {
      showError(false);
      setCategories(categoriesData.categories);
    }
    setLoading(false);
  };

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        brand: null,
        color: null,
        status: null,
        category: null,
        isOfferable: false,
        price: "",
      },
      validationSchema: ProductSchema,
      onSubmit: async (values) => {
        if (image != null) {
          setButtonLoading(true);
          const catId = 0;
          for (let cat of categories) {
            if (values.category == cat.name) {
              catId = cat.id;
              break;
            }
          }
          const data = { ...values, category: catId, isSold: false };
          const res = await createProduct(data, image);
          if (res == 200) {
            toastMessage("success", "Ürün Eklendi");
            resetForm();
          } else {
            toastMessage("error", "Bir hata ile karşılaşıldı!");
          }
          setButtonLoading(false);
        } else {
          setErrorImg(true);
        }
      },
    });

  const saveProduct = async (product) => {};

  const resetForm = () => {};

  return (
    <>
      {loading ? (
        <Loading size={75} color="#4b9ce2" />
      ) : (
        <>
          <div className={styles.info}>
            <div className={styles.detailTitle}>Ürün Detayı</div>
            <div className={styles.formRow}>
              <label htmlFor="urunAd">Ürün Adı</label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Örnek: Iphone 12 Pro Max"
                maxLength="100"
                className={errors?.name && touched.name ? styles.notValid : ""}
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="description">Açıklama</label>
              <textarea
                name="description"
                id="description"
                placeholder="Ürün açıklaması giriniz"
                value={values.description}
                maxLength="500"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors?.description && touched.description
                    ? styles.notValid
                    : ""
                }
              />
            </div>

            <div className={styles.formRowMulti}>
              <div className={styles.inputGroupLeft}>
                <label htmlFor="category">Kategori</label>
                <Combobox
                  setSelect={handleChange}
                  setBlur={handleBlur}
                  style={
                    errors?.category && touched.category
                      ? styles.comboError
                      : styles.combo
                  }
                  name="category"
                  value={values.category}
                  list={categories}
                />
              </div>
              <div className={styles.inputGroupRight}>
                <label htmlFor="brand">Marka</label>
                <Combobox
                  setSelect={handleChange}
                  setBlur={handleBlur}
                  style={
                    errors?.brand && touched.brand
                      ? styles.comboError
                      : styles.combo
                  }
                  name="brand"
                  value={values.brand}
                  list={brands}
                />
              </div>
            </div>
            <div className={styles.formRowMulti}>
              <div className={styles.inputGroupLeft}>
                <label htmlFor="color">Renk</label>
                <Combobox
                  setSelect={handleChange}
                  setBlur={handleBlur}
                  style={
                    errors?.color && touched.color
                      ? styles.comboError
                      : styles.combo
                  }
                  name="color"
                  value={values.color}
                  list={colors}
                />
              </div>
              <div className={styles.inputGroupRight}>
                <label htmlFor="status">Kullanım Durumu</label>
                <Combobox
                  setSelect={handleChange}
                  setBlur={handleBlur}
                  style={
                    errors?.status && touched.status
                      ? styles.comboError
                      : styles.combo
                  }
                  name="status"
                  value={values.status}
                  list={usingStatus}
                />
              </div>
            </div>

            <div className={`${styles.formRow} ${styles.priceRow}`}>
              <label htmlFor="price">Fiyat</label>
              <input
                type="text"
                name="price"
                id="price"
                className={
                  errors?.price && touched.price
                    ? styles.notValid
                    : styles.price
                }
                placeholder="Bir fiyat girin"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p
                className={
                  errors?.price && touched.price ? styles.notValidIcon : ""
                }
              >
                TL
              </p>
              {errors?.price && touched.price && (
                <span>0-9 Arasında Bir Rakam Girin</span>
              )}
            </div>
            <div className={`${styles.formRow} ${styles.offerRow}`}>
              {values.isOfferable ? (
                <label htmlFor="offeropt" className={styles.offeroptActive}>
                  Fiyat ve teklif opsiyonu
                </label>
              ) : (
                <label htmlFor="offeropt" className={styles.offeropt}>
                  Teklif Opsiyonu
                </label>
              )}
              <Toggle value={values.isOfferable} onChange={handleChange} />
            </div>
          </div>
          <div className={styles.image}>
            <div className={styles.imageTitle}>Ürün Görseli</div>
            <div className={styles.imageUploading}>
              <ImageUploader error={errorImg} onChange={setImage} />
              <button
                className={styles.saveButton}
                type="button"
                onClick={handleSubmit}
              >
                {buttonLoading ? <Loading size={30} color="#fff" /> : "Kaydet"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductInfo;
