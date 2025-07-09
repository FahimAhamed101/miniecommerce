import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import SingleProduct from "../pages/SingleProduct";

const RoutePage = () => {
    return (
      <div>
        <Routes>
          {/* Main App Routes */}
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop/:id" element={<SingleProduct />} />
            </Route>
      </Routes>
    </div>
  );
};
export default RoutePage;