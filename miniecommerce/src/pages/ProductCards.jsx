import React from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";

const ProductCards = ({ products, onCartOpen }) => {
  const dispatch = useDispatch();
  
  // Get cart data from Redux store
  const { products: cartProducts, selectedItems } = useSelector(state => state.cart);

  // Handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    onCartOpen(); // Open the cart sidebar
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product__card">
              <div className="relative">
                <Link to={`/shop/${product._id}`}>
                  <img
                    src={product?.image}
                    alt="Men Casual tShirt"
                    className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
                  />
                </Link>
                <div className="hover:block absolute top-3 right-3">
                  <button onClick={() => handleAddToCart(product)}>
                    <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
                  </button>
                </div>
              </div>
              <div className="product__card__content">
                <h4>{product?.name}</h4>
                <p>
                  ${product?.price}
                  {product?.oldPrice ? <s>${product?.oldPrice}</s> : null}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>

      {/* Cart Icon/Button to open cart */}
      {cartProducts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={onCartOpen}
            className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
          >
            <i className="ri-shopping-cart-2-line text-xl"></i>
            {selectedItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {selectedItems}
              </span>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default ProductCards;