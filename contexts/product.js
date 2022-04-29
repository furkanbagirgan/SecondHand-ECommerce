import React, { useContext, useState } from "react";
import { setCategoryService,setProductService } from "../services/authService";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Hepsi");

  const getAllProducts = async () => {
    const res = await setProductService();
    setProducts(res);
  };

  const getAllCategories = async () => {
    const res = await setCategoryService();
    setCategories(res);
    setActiveCategory("Hepsi");
  };

  const changeCategory = (category) => {
    setActiveCategory(category);
    if(category !=="Hepsi"){
      const filtered=products.filter((product) => product.category.name === category);
      setFilteredProducts(filtered);
    }
    else{
      setFilteredProducts(products);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        filteredProducts,
        categories,
        activeCategory,
        getAllProducts,
        getAllCategories,
        changeCategory
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
