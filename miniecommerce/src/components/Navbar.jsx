import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";


import CartModal from "../pages/CartModal";

const Navbar = () => {
  //addtocart product
  const products = useSelector((state)=> state.cart.products)
  //console.log(products)
  //cartpage open
  const [isCartOpen, setIsCartOpen] = useState(false)


  //console.log(user)
  //logout dispatch/navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //dropdown state
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropDownToogle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  //handle cart toggle
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen)
}

  //user navigation dropdown menu
  const userDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  //admin navigation dropdown menu
  const adminDropdownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add Product", path: "/dashboard/add-product" },
  ];
  //role based dropdown show

    // logout
 
   
  return (
    <>
      <header className="fixed-nav-bar w-nav ">
        <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center ">
          <ul className="nav__links">
            <li className="link">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="link">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/shop"
              >
                Shop
              </NavLink>
            </li>
            <li className="link">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/pages"
              >
                Pages
              </NavLink>
            </li>
            <li className="link">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="nav__logo">
            <Link to="/">
              Lebaba<span>.</span>
            </Link>
          </div>
          <div className="nav__icons relative">
            <span>
              <Link to="/search">
                <i className="ri-search-line"></i>
              </Link>
            </span>
            <span className="flex items-center justify-between gap-2">
              {/* cart button */}
              <button 
              onClick={handleCartToggle}
              className="hover:text-[#ed3849] flex items-center">
                <i className="ri-shopping-bag-line"></i>
                <sup className="text-sm inline-block w-4 px-1.5 text-white rounded-full bg-[#ed3849] text-center">
                  {products.length}
                </sup>
              </button>
              
             
            </span>
          </div>
        </nav>

        {/* cart modal */}
        {
          isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>
        }
      </header>
    </>
  );
};

export default Navbar;