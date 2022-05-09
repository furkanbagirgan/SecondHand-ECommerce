//context structure that stores product data and transactions

import React, { useContext, useState } from "react";
import {
  setProductsService,
  setCategoryService,
  setProductService,
  setCreateProductService,
  setColorService,
  setBrandService,
  setUsingStatusService,
} from "../services/productService";

const ProductContext = React.createContext();
let skip = -3;

const ProductProvider = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({
    id: 0,
    name: "Hepsi",
  });

  const getProducts = async (categoryId) => {
    if (skip >= -1) {
      return await setProductsService(categoryId, skip * 15 + 15).then(
        (res) => {
          if (Array.isArray(res)) {
            if (skip === -1) {
              skip = skip + 1;
              setFilteredProducts([...res]);
              if (res.length < 15) {
                return 3;
              } else {
                return 1;
              }
            } else {
              skip = skip + 1;
              setFilteredProducts((prev) => {
                return [...prev, ...res];
              });
              if (res.length < 15) {
                return 3;
              } else {
                return 1;
              }
            }
          } else {
            return res;
          }
        }
      );
    } else {
      skip = skip + 1;
      return 2;
    }
  };

  const getProduct = async (productId) => {
    return await setProductService(productId).then((res) => {
      skip = -3;
      if (res != null && res.constructor.name === "Object") {
        return { detail: { ...res }, status: 1 };
      } else {
        return { detail: {}, status: 0 };
      }
    });
  };

  const getAllCategories = async (categoryName) => {
    const res = await setCategoryService();
    if (isNaN(res)) {
      res.unshift({ id: 0, name: "Hepsi" });
      setCategories(res);
      setActiveCategory(categoryName);
      const categoryId = 0;
      res.forEach((element) => {
        if (element.name === categoryName) {
          categoryId = element.id;
        }
      });
      await changeCategory(categoryName, categoryId, false);
      return 1;
    } else {
      return res;
    }
  };

  const changeCategory = async (categoryName, categoryId, getAll) => {
    setActiveCategory((prev) => {
      return { ...prev, name: categoryName, id: categoryId };
    });
    if (getAll) {
      skip = -1;
    }
    return await getProducts(categoryId);
  };

  const resetSkip = () => {
    skip = -3;
  };

  const createProduct = async (product, image) => {
    const res = await setCreateProductService(product, image);
    return res;
  };

  const getColors = async () => {
    const res = await setColorService();
    return res;
  };

  const getBrands = async () => {
    const res = await setBrandService();
    return res;
  };

  const getUsingStatus = async () => {
    const res = await setUsingStatusService();
    return res;
  };

  const getCategories = async () => {
    const res = await setCategoryService();
    if (isNaN(res)) {
      return { categories: res, status: 200 };
    } else {
      return { categories: [], status: res };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        getProducts,
        getProduct,
        filteredProducts,
        categories,
        activeCategory,
        getAllCategories,
        changeCategory,
        resetSkip,
        createProduct,
        getColors,
        getBrands,
        getUsingStatus,
        getCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

function useProduct() {
  return useContext(ProductContext);
}

export { ProductProvider, ProductContext, useProduct };
