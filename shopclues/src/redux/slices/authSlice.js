import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { clearCart } from '../slices/cartSlice';
// import { clearWishlist } from '../slices/wishlistSlice';
import { fetchCart } from './cartSlice';
import { fetchWishlist } from './wishlistSlice';

const API_URL = 'https://shopclues-clone.onrender.com/api/auth';

// Load user from localStorage (if exists)
const storedUser = JSON.parse(localStorage.getItem('user')) || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: storedUser, status: 'idle', error: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

//  Helper function to get auth headers
export const authHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('⚠️ No token found in localStorage');
    return {}; // Return empty headers if no token found
  }
  return { Authorization: `Bearer ${token}` };
};

//  LOGIN ACTION (JWT AUTH)
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password }
    );

    const { user, token } = response.data;

    if (!token) {
      throw new Error('Token not received from server');
    }

    // Save token and user info to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    console.log ( "t0ken is" ,localStorage.getItem('token'));

    dispatch(setUser(user));
    dispatch(fetchCart());
    dispatch(fetchWishlist());
    toast.success('Login successful');
  } catch (error) {
    console.error('Login Error:', error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || 'Login failed');
  }
};

// ✅ SIGNUP ACTION (JWT AUTH)
export const signup = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });

    // Save user info to localStorage
    const { user, token } = response.data;

    if (token) {
      localStorage.setItem('token', token);
    }
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(setUser(user));
    toast.success('Signup successful');
  } catch (error) {
    console.error('Signup Error:', error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || 'Signup failed');
  }
};

// ✅ LOGOUT ACTION (JWT AUTH)
export const logout = () => async (dispatch) => {
  try {
    // Optional: Call API for server-side logout
    await axios.get(`${API_URL}/logout`);

    // Remove user and token from localStorage
     localStorage.removeItem('token');
     localStorage.removeItem('user');

    // Dispatch Redux actions
    dispatch(clearUser());
    // dispatch(clearCart()); // Clear cart state
    // dispatch(clearWishlist()); // Clear wishlist state

    toast.success('Logout successful');
  } catch (error) {
    console.error('Logout Error:', error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || 'Logout failed');
  }
};

export default authSlice.reducer;
