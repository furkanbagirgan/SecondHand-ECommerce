import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { useProduct } from "../../contexts/product";
import styles from "./categories.module.scss";

function Categories({ loading, showError }) {
  const { categories, activeCategory, getAllCategories, changeCategory } =
    useProduct();
  const router = useRouter();
  const categoryContent = useRef();

  useEffect(() => {
    categoryContent.current.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      categoryContent.current.scrollLeft += evt.deltaY;
    });
    getCategories();
  }, []);

  const getCategories = async () => {
    if (router.asPath !== "/") {
      const ctName = router.asPath.split("=");
      const res = await getAllCategories(decodeURI(ctName[1]));
      if (res !== 1) {
        showError(true);
      } else {
        showError(false);
      }
    } else {
      const res = await getAllCategories("Hepsi");
      if (res !== 1) {
        showError(true);
      } else {
        showError(false);
      }
    }
  };

  const categoryClick = async (categoryName, categoryId) => {
    loading(true);
    const res = await changeCategory(categoryName, categoryId);
    if (res !== 1) {
      showError(true);
    } else {
      showError(false);
    }
    router.push("/?category=" + categoryName, undefined, { shallow: true });
    loading(false);
  };

  return (
    <div className={styles.category}>
      <div ref={categoryContent} className={styles.categoryContent}>
        {categories?.map((category) => (
          <span
            key={category.id}
            className={activeCategory.name === category.name ? styles.active : ""}
            onClick={() => {
              categoryClick(category.name, category.id);
            }}
          >
            {category.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Categories;
