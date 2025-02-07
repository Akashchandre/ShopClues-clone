import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

// Fetch categories
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    selectedCategory: 'all', // Default category
    status: 'idle',
  },
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload; // Update selected category
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {   
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => { 
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = ['all', ...action.payload]; // Include "all" as default
      });
  },
});

export const { setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;