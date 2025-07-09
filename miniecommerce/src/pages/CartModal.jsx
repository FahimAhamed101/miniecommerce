import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/features/cart/cartSlice";
import CheckoutModal from './CheckoutModal';

const CartModal = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Get total price from Redux store instead of calculating it locally
  const { totalPrice } = useSelector(state => state.cart);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleUpdateQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };

  const handleRemoveFromCart = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ id }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden">
      {/* Backdrop with fade animation */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar with slide-in animation */}
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Cart Items - Scrollable area */}
          <div className="flex-1 overflow-y-auto p-4">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="mt-4 text-gray-500">Your cart is empty</p>
                <button 
                  onClick={onClose}
                  className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product._id} className="flex items-center p-3 border rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleUpdateQuantity("decrement", product._id)}
                        className="w-8 h-8 flex items-center justify-center border rounded-l hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center border-t border-b">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity("increment", product._id)}
                        className="w-8 h-8 flex items-center justify-center border rounded-r hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={(e) => handleRemoveFromCart(e, product._id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer - Only shown when there are items */}
          {products.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span className="font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button 
                onClick={() => setShowCheckout(true)}
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={onClose}
                className="w-full mt-2 border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Checkout Modal */}
      <CheckoutModal
      isOpen={showCheckout}
      onClose={() => setShowCheckout(false)}
      onCheckoutComplete={() => {
        setShowCheckout(false);
        onClose(); // Close the cart modal
        onCheckoutComplete?.(); // Optional: callback for additional actions
      }}
      cartItems={products}
      total={totalPrice}
    />
    </div>
  );
};

export default CartModal;