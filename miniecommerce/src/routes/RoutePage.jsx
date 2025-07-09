import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import SingleProduct from "../pages/SingleProduct";
import OrderConfirmation from '../pages/OrderConfirmation';
const RoutePage = () => {
    return (
      <div>
        <Routes>
          {/* Main App Routes */}
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop/:id" element={<SingleProduct />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Route>
      </Routes>
    </div>
  );
};
export default RoutePage;