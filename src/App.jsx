import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/productList/ProductList";
import ProductDetails from "./pages/productDetails/ProductDetails";
import CartList from "./pages/cartList/CartList";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartList />} />
      </Routes>
    </Fragment>
  );
}

export default App;
