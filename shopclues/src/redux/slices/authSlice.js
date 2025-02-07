import { createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify'; 
import { clearCart } from '../slices/cartSlice'; 
import { clearWishlist } from '../slices/wishlistSlice'

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

export const login = (email, password) => async (dispatch) => {    // Login
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(userCredential.user));
     toast.success('Login successful');
  } catch (error) {
    console.error('Login Error:', error.message);
    toast.error(error.message); // Show error message to the user
  }
};

export const signup = (email, password) => async (dispatch) => {          // Signup
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(setUser(userCredential.user));
   toast.success('Signup successful');
  } catch (error) {
    console.error('Signup Error:', error.message);
    toast.error(error.message); 
  }
};

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUser());
    dispatch(clearCart()); // Clear the cart
    dispatch(clearWishlist()); // Clear the wishlist
    toast.success('Logout successful');
  } catch (error) {
    console.error('Logout Error:', error.message);
    toast.error(error.message); 
  }
};

export default authSlice.reducer;