import { createContext, useEffect, useState } from "react";

export const ShoppingCartContext = createContext(null);

const ShoppingCartProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  const fetchListOfProducts = async () => {
    setLoading(true);
    try {
      const data = await fetch("https://dummyjson.com/products");
      const result = await data.json();
      if (result && result?.products) {
        setListOfProducts(result?.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchListOfProducts();
  }, []);

  console.log(listOfProducts);

  return (
    <ShoppingCartContext.Provider
      value={{
        loading,
        listOfProducts,
        setLoading,
        productDetails,
        setProductDetails,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
