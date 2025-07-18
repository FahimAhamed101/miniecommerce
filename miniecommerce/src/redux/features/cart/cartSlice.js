import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0
}

// Calculate cart totals
const calculateCartTotals = (products) => {
    const selectedItems = products.reduce((total, product) => total + product.quantity, 0);
    const totalPrice = products.reduce((total, product) => total + product.quantity * product.price, 0)

    return { selectedItems, totalPrice };
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find(product => product._id === action.payload._id);
            
            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 })
                Swal.fire({
                    text: "Product added successfully!",
                    confirmButtonText: "It's Ok"
                })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Product already Added to Cart',
                    icon: 'error',
                    confirmButtonText: "It's Ok"
                })
            }
            const totals = calculateCartTotals(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
        },
        updateQuantity: (state, action) => {
            const product = state.products.find((item) => item._id === action.payload.id);

            if (product) {
                if (action.payload.type === "increment") { // Fixed typo: "increament" -> "increment"
                    product.quantity += 1;
                } else if (action.payload.type === "decrement" && product.quantity > 1) {
                    product.quantity -= 1;
                }
            }
            const totals = calculateCartTotals(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload.id)
            const totals = calculateCartTotals(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
        },
        
        clearCart: (state) => {
            Object.assign(state, initialState)
        }
    }
})

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer