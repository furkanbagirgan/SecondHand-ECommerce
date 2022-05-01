import React, { useContext, useState } from "react";
import { setCategoryService,setProductService } from "../services/authService";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Hepsi");

  const getAllCategories = async (categoryName) => {
    const res = await setCategoryService();
    if(isNaN(res)){
      if(categoryName){
        setCategories(res);
        setActiveCategory(categoryName);
        const categoryId=0;
        res.forEach(element => {
          if(element.name===categoryName){
            categoryId=element.id;
          }
        });
        await changeCategory(categoryName,categoryId);
        return 1;
      }
      else{
        setCategories(res);
        setActiveCategory("Hepsi");
        await changeCategory("Hepsi",0);
        return 1;
      }
    }
    else{
      return res;
    }
  };

  const changeCategory = async(categoryName,categoryId) => {
    setActiveCategory(categoryName);
    if(categoryName !=="Hepsi"){
      const filtered=await setProductService(categoryId);
      if(Array.isArray(filtered)){
        setFilteredProducts(filtered);
        return 1;
      }
      else{
        return filtered;
      }
    }
    else{
      const allProducts=await setProductService();
      if(Array.isArray(allProducts)){
        setFilteredProducts(allProducts);
        return 1;
      }
      else{
        return allProducts;
      }
    }
  }

  return (
    <ProductContext.Provider
      value={{
        filteredProducts,
        categories,
        activeCategory,
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
