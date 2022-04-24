import React, { useContext, useState } from "react";

const ProductsContext = React.createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({});

  const getAllProducts = async () => {
    
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        getAllProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

function useProducts() {
  return useContext(ProductsContext);
}

export { ProductsProvider, ProductsContext, useProducts };