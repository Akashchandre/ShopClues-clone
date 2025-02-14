import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import PrivateRoute from './components/PrivateRoute';
import SearchResults from './pages/SearchResult';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/slices/authSlice';
// import { setCart } from './redux/slices/cartSlice';
//import { setWishlist } from './redux/slices/wishlistSlice';
import  Footer  from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import AboutUs from './pages/About';
import ContactUs from './pages/Contactus';
import FAQs from './pages/Faqs';
import Terms from './pages/Terms';


function App() {
  const dispatch = useDispatch();
 

  useEffect(() => {
    
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }

  
  }, [dispatch]);
  
  return (
    <div className="app">
     
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path='/about' element={<AboutUs/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/faqs' element={<FAQs/>} />
        <Route path='/terms' element={<Terms/>} />
        
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;