import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { Link } from 'react-router-dom';

const Wishlist = () => {          
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch]);

  return (
    <div className="p-8 min-h-[70vh]">
     <Link to="/" className="absolute top-10 left-4 text-blue-500 text-lg">Home</Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>
      
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="border p-4 rounded hover:shadow-lg">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain" />
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => dispatch(removeFromWishlist(product._id))}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;