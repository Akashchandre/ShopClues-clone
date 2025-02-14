import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } from "../redux/slices/cartSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);



  const handleIncrement = (id, quantity) => {
    dispatch(incrementQuantity({productId: id, quantity}));
  };

  const handleDecrement = (id, quantity) => {
    dispatch(decrementQuantity({ productId: id, currentQuantity: quantity }));
  };
  const cartData =  cart?.length ? cart : cart.products;
  const totalAmount =  cartData?.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const options = {
      key: "rzp_test_sn6rVYKPsHIp4c", 
      amount: totalAmount * 100, // Razorpay requires amount in paise (multiply by 100)
      currency: "INR",
      name: "ShopClues",
      description: "Checkout Payment",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        dispatch(clearCart()); // Clear cart after successful payment
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };


  console.log(cartData)
  return (
    <div className="p-4 flex-grow min-h-[70vh]">
      <Link to="/" className="absolute top-11 left-4 text-blue-500 text-lg">Home</Link>
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
      {cartData?.length === 0 ? (
        <p className="text-gray-600 text-center">
          Your cart is empty. <Link to="/" className="text-blue-500">Continue Shopping</Link>
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartData?.map((item) => {
              const {id, image, title, price, _id } = item.productId;
              const { quantity } = item;
              if(quantity > 0) {
                return ((
                  <div key={id} className="border p-4 rounded-lg shadow-md bg-white">
                    <img src={image} alt={title} className="h-32 w-full object-contain mb-2" />
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-gray-600">₹{price}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleDecrement(_id, quantity)} className="bg-gray-300 px-2 py-1 rounded">-</button>
                        <span className="text-lg font-semibold">{quantity}</span>
                        <button onClick={() => handleIncrement(_id, quantity + 1)} className="bg-gray-300 px-2 py-1 rounded">+</button>
                      </div>
                      <button onClick={() => dispatch(removeFromCart(_id))} className="text-red-500">Remove</button>
                    </div>
                  </div>
                ))
              }
            })}
          </div>
          <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-semibold">Total: ₹{totalAmount?.toFixed(2)}</h2>
            <button onClick={() => dispatch(clearCart())} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              Clear Cart
            </button>
            <button onClick={handleCheckout} className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
