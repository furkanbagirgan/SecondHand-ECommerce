import React, { useContext, useState } from "react";
import { setCategoryService,setProductService } from "../services/authService";

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({id:0,name:"Hepsi"});

  const getProducts = async (categoryId,start) => {
    return await setProductService(categoryId,start).then(res=>{
      if(Array.isArray(res)){
        if(res.length===0){
          return 0;
        }
        else{
          if(start===0){
            setFilteredProducts([...res]);
            return 1;
          }
          else{
            setFilteredProducts(prev=> {return [...prev, ...res]});
            return 1;
          }
        }
      }
      else{
        return res;
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
        await changeCategory(categoryName,categoryId);
        return 1;
    }
    else{
      return res;
    }
  }

  const changeCategory = async(categoryName,categoryId) => {
    setActiveCategory(prev=>{return {...prev,name:categoryName,id:categoryId}});
    return await getProducts(categoryId,0);
  }

  return (
    <ProductContext.Provider
      value={{
        getProducts,
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
