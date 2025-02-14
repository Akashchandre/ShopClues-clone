import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function authHeader() {
  
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return {}; 
  }
  return { Authorization: `Bearer ${token}` };
}
// Async thunks for API calls
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => {
  const { data } = await axios.get('https://shopclues-clone.onrender.com/api/wishlist', {
    headers: authHeader() ,
  });
  return data;
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (product) => {
  //console.log(productId)
  const { data } = await axios.post('https://shopclues-clone.onrender.com/api/wishlist/add', {productId:product._id} , {
    headers: authHeader() ,
  });
  return data;
});

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async (productId) => {
  await axios.delete(`https://shopclues-clone.onrender.com/api/wishlist/remove/${productId}`, {
    headers: authHeader() ,
  });
  return productId;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        return state.filter((item) => item._id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;