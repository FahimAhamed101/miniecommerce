import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/features/cart/cartSlice';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const orderData = localStorage.getItem('currentOrder');
    if (orderData) {
      setOrder(JSON.parse(orderData));
      dispatch(clearCart());
      localStorage.removeItem('currentOrder');
 
    } else {
      navigate('/');
    }
  }, [navigate, dispatch]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-2xl font-bold mt-4">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase</p>
        </div>
        
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Order Details</h3>
              <p><span className="text-gray-600">Order ID:</span> {order.orderId}</p>
              <p><span className="text-gray-600">Date:</span> {new Date(order.date).toLocaleString()}</p>
              <p><span className="text-gray-600">Total:</span> ${order.total.toFixed(2)}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Shipping Information</h3>
              <p>{order.name}</p>
              <p>{order.email}</p>
              <p className="whitespace-pre-line">{order.address}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium mb-2">Items Ordered</h3>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item._id} className="flex items-center border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4">
                    <p className="font-medium">{item.name}</p>
                    <p>${item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;