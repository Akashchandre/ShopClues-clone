import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";
function authHeader() {
  
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}

// Thunks for async API calls
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_URL, { headers: authHeader() });
    console.log(data)
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API_URL}/add`, { productId, quantity }, { headers: authHeader() });
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/remove/${productId}`, { headers: authHeader() });
    return productId;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const incrementQuantity = createAsyncThunk("cart/incrementQuantity", async ({productId, quantity}, { rejectWithValue }) => {
  try {
    await axios.put(`${API_URL}/update`, { productId, quantity }, { headers: authHeader() });
    const { data: products } = await axios.get(API_URL, { headers: authHeader() });
    return products;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const decrementQuantity = createAsyncThunk("cart/decrementQuantity", async ({ productId, currentQuantity }, { rejectWithValue }) => {
  try {
    const quantity = currentQuantity > 1 ? currentQuantity - 1 : 0;
    await axios.put(`${API_URL}/update`, { productId, quantity }, { headers: authHeader() });
    const { data: products } = await axios.get(API_URL, { headers: authHeader() });
    return products;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const clearCart = createAsyncThunk("cart/clearCart", async (_, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/clear`, { headers: authHeader() });
    return [];
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => action.payload)
      .addCase(addToCart.fulfilled, (state, action) => action.payload)
      .addCase(removeFromCart.fulfilled, (state, action) => state.filter(item => item.productId._id !== action.payload))
      .addCase(incrementQuantity.fulfilled, (state, action) => action.payload)
      .addCase(decrementQuantity.fulfilled, (state, action) => action.payload)
      .addCase(clearCart.fulfilled, () => []);
  },
});

export default cartSlice.reducer;



