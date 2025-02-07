import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  
  const isInWishlist = wishlist.some((item) => item.id === Number(id));
  const isInCart = cart.some((item) => item.id === Number(id));

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`); // Fetch product by id
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);
  
  if (!product) return <p className="text-center text-gray-500">Loading...</p>; 

  const handleCartAction = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isInCart) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
    
  };

  const handleWishlist = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(Number(id)));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-xl font-bold mb-4 text-center text-gray-800">{product.title}</h1>
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-4 space-y-4 md:space-y-0 md:space-x-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/3 h-48 object-contain rounded-md"
        />
        <div className="flex flex-col space-y-3 text-center md:text-left">
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold text-gray-800">${product.price}</p>
          <div className="flex justify-center md:justify-start space-x-2">
            <button
              onClick={handleCartAction}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md transition-all duration-200"
            >
              {isInCart ? 'Go to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={handleWishlist}
              className={`text-sm px-4 py-2 rounded-md transition-all duration-200 ${
                isInWishlist
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-black'
              }`}
            >
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;