import { createSlice } from '@reduxjs/toolkit';

const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: storedCart,
  reducers: {
    setCart(state, action) {  
      return action.payload;
    },
    addToCart(state, action) {              // Add to cart
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart(state, action) {                       // Remove from cart
      const updatedCart = state.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // save Updated cart to local storage
     return updatedCart;
    },
    incrementQuantity(state, action) {              // Increment quantity
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
     }
     localStorage.setItem('cart', JSON.stringify(state));
    },
    decrementQuantity(state, action) {           // Decrement quantity
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
     }
     localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart() {   
      localStorage.removeItem('cart');                      // Clear cart
      return [];
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart,setCart } =
  cartSlice.actions;
export default cartSlice.reducer;