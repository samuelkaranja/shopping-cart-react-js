import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

const ShoppingCartProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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

  const handleAddToCart = (getProductDetails) => {
    console.log(getProductDetails);

    let copyExistingCartItems = [...cartItems];

    const findIndexOfCurrentItem = copyExistingCartItems.findIndex(
      (cartItem) => cartItem.id === getProductDetails.id
    );

    console.log(findIndexOfCurrentItem);

    if (findIndexOfCurrentItem === -1) {
      copyExistingCartItems.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails?.price,
      });
    } else {
      copyExistingCartItems[findIndexOfCurrentItem] = {
        ...copyExistingCartItems[findIndexOfCurrentItem],
        quantity: copyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (copyExistingCartItems[findIndexOfCurrentItem].quantity + 1) *
          copyExistingCartItems[findIndexOfCurrentItem].price,
      };
    }

    console.log(copyExistingCartItems, "copyItems");
    setCartItems(copyExistingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(copyExistingCartItems));

    navigate("/cart");
  };

  const handleRemoveFromCart = (getProductDetails, isFullyRemovedFromCart) => {
    let copyExistingCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = copyExistingCartItems.findIndex(
      (item) => item.id === getProductDetails.id
    );
    if (isFullyRemovedFromCart) {
      copyExistingCartItems.splice(findIndexOfCurrentCartItem, 1);
    } else {
      copyExistingCartItems[findIndexOfCurrentCartItem] = {
        ...copyExistingCartItems[findIndexOfCurrentCartItem],
        quantity:
          copyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1,
        totalPrice:
          (copyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1) *
          copyExistingCartItems[findIndexOfCurrentCartItem].price,
      };
    }

    localStorage.setItem("cartItems", JSON.stringify(copyExistingCartItems));
    setCartItems(copyExistingCartItems);
  };

  useEffect(() => {
    fetchListOfProducts();
    setCartItems(JSON.parse(localStorage.getItem("cartItems") || []));
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
        handleAddToCart,
        cartItems,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
