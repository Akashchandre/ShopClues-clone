import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get('https://shopclues-clone.onrender.com/api/products');
  return response.data.data;
});

// Fetch categories
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('https://shopclues-clone.onrender.com/api/products/category');
  return response.data.data;
});
// Fetch sub-categories for a selected category
export const fetchSubCategories = createAsyncThunk('products/fetchSubCategories', async (category) => {
  const response = await axios.get(`https://shopclues-clone.onrender.com/api/products/category/${category}/subcategory`);
  return response.data.data;
});


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    subCategories: [],
    selectedCategory: 'all',    // Default category
    selectedSubCategory: 'all', 
    status: 'idle',
  },
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload; // Update selected category
    },
    setSelectedSubCategory(state, action) {
      state.selectedSubCategory = action.payload;
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
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.subCategories = ['all', ...action.payload];
      });
  },
});

export const { setSelectedCategory , setSelectedSubCategory} = productsSlice.actions;
export default productsSlice.reducer;