import React, { useContext, useState } from "react";
import { setProductsService,setCategoryService,setProductService } from "../services/productService";

const ProductContext = React.createContext();
let skip=-3;

const ProductProvider = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({id:0,name:"Hepsi"});

  const getProducts = async (categoryId) => {
    if(skip >= -1){
      return await setProductsService(categoryId,((skip*15)+15)).then(res=>{
        if(Array.isArray(res)){
            if(skip=== -1){
              skip=skip+1;
              setFilteredProducts([...res]);
              if(res.length<15){
                return 3;
              }
              else{
                return 1;
              }
            }
            else{
              skip=skip+1;
              setFilteredProducts(prev=> {return [...prev, ...res]});
              if(res.length<15){
                return 3;
              }
              else{
                return 1;
              }
            }
        }
        else{
          return res;
        }
      });
    }
    else{
      skip=skip+1;
      return 2;
    }
  }

  const getProduct = async (productId) => {
    return await setProductService(productId).then(res=>{
      skip=-3;
      if(res != null && res.constructor.name === "Object"){
        return {detail:{...res},status:1};
      }
      else{
        return {detail:{},status:0};
      }
    });
  }

  const getAllCategories = async (categoryName) => {
    const res = await setCategoryService();
    if(isNaN(res)){
      res.unshift({id:0,name:"Hepsi"});
        setCategories(res);
        setActiveCategory(categoryName);
        const categoryId=0;
        res.forEach(element => {
          if(element.name===categoryName){
            categoryId=element.id;
          }
        });
        await changeCategory(categoryName,categoryId,false);
        return 1;
    }
    else{
      return res;
    }
  }

  const changeCategory = async(categoryName,categoryId,getAll) => {
    setActiveCategory(prev=>{return {...prev,name:categoryName,id:categoryId}});
    if(getAll){
      skip=-1;
    }
    return await getProducts(categoryId);
  }

  const resetSkip = ()=>{
    skip=-3;
  }

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
        resetSkip
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
