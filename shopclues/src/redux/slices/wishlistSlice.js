import { createSlice } from '@reduxjs/toolkit';

const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: storedWishlist,
  reducers: {
    setWishlist(state, action) {  
      return action.payload;
    },
    addToWishlist(state, action) {            // Add to wishlist
      state.push(action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state));
      
    },
    removeFromWishlist(state, action) {                             // Remove from wishlist
      const updatedWishlist = state.filter((item) => item.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); 
      return updatedWishlist;
    },
    clearWishlist: () => {   
      localStorage.removeItem('wishlist');              // Clear wishlist
      return [];
    }
  },
});

export const { setWishlist,addToWishlist, removeFromWishlist , clearWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;