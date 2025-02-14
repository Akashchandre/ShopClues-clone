import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify"; 
import { fetchWishlist } from "../redux/slices/wishlistSlice";
import { fetchCart } from "../redux/slices/cartSlice";
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const isInWishlist = wishlist.some((item) => item._id === product?._id);

  const isInCart = cart.products && cart.products.some((item) => item.productId?._id === product?._id);


  function authHeader() {
  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return {}; 
    }
    return { Authorization: `Bearer ${token}` };
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data.data); 
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    dispatch(fetchWishlist());
    dispatch(fetchCart());
  }, [id,wishlist,cart]);

  const handleCartAction = async () => {
    if (!user) {
      navigate("/login");
      toast.info("Please login to add items to your cart.");
      return;
    }
    
    if (!isInCart) {
      console.log(product)
      try {
        await dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap();
        toast.success("Product added to cart!");
        
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add product to cart. Please try again.");
      }
    } else {
      navigate("/cart");
    }
  };
  const handleWishlist = async () => {
    if (!user) {
      navigate("/login");
      toast.info("Please login to manage your wishlist.");
      return;
    }
  console.log(user)
    try {
      if (isInWishlist) {
        await axios.delete(`http://localhost:5000/api/wishlist/remove/${product.id}`, {
          headers: authHeader(),
        });
        dispatch(removeFromWishlist(product._id));
        toast.success("Product removed from wishlist!");
      } else {
        dispatch(addToWishlist(product));
        toast.success("Product added to wishlist!");
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
      toast.error("Failed to update wishlist. Please try again.");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

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
          <p className="text-lg font-semibold text-gray-800">₹{product.price}</p>
          <div className="flex justify-center md:justify-start space-x-2">
            <button
              onClick={handleCartAction}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md transition-all duration-200"
            >
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={handleWishlist}
              className={`text-sm px-4 py-2 rounded-md transition-all duration-200 ${
                isInWishlist
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;